// import Banner from "@/components/Banner/Banner";
// import DataTable from "@/components/DataTable/DataTable";
// import SearchFilters from "@/components/Filter/SearchFilter";
// import Navbar from "@/components/Navbar/Navbar";
// import Tabs from "@/components/Tab/Tab";
// import { useState, useEffect } from "react";

// export default function Home() {
//   const [activeTab, setActiveTab] = useState("offers"); // Default tab
//   const [data, setData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     let apiUrl = "https://api.offertrunk.com/api/getOffers";

//     if (activeTab === "offers") {
//       apiUrl = "https://api.offertrunk.com/api/getOffers";
//     } else if (activeTab === "networks") {
//       apiUrl = "https://api.offertrunk.com/api/getNetworks";
//     } else if (activeTab === "traffic") {
//       apiUrl = "https://api.offertrunk.com/api/getTrafficSources";
//     }

//     fetch(apiUrl)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((jsonData) => {
//         if (jsonData && Array.isArray(jsonData.data)) {
//           setData(jsonData.data);
//         } else {
//           console.error("Invalid JSON structure:", jsonData);
//           setData([]);
//         }
//       })
//       .catch((err) => console.error("Error fetching data:", err));
//   }, [activeTab]);

//   const filteredData = data.filter((item) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="bg-white min-h-screen">
//       <Navbar />
//       <Banner />
//       <SearchFilters
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//       />
//       <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
//       <DataTable activeTab={activeTab} filteredData={filteredData} />
//     </div>
//   );
// }

import Banner from "@/components/Banner/Banner";
import DataTable from "@/components/DataTable/DataTable";
import SearchFilters from "@/components/Filter/SearchFilter";
import Navbar from "@/components/Navbar/Navbar";
import Tabs from "@/components/Tab/Tab";
import Loader from "@/components/Loader/Loader"; // Import Loader
import { useState } from "react";
import Head from "next/head";

const API_URLS = {
  offers: "https://api.offertrunk.com/api/getOffers",
  networks: "https://api.offertrunk.com/api/getNetworks",
  trafficSources: "https://api.offertrunk.com/api/getTrafficSources",
};

// Server-side data fetching
export async function getServerSideProps() {
  try {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const result = await response.json();
        return result?.data || [];
      } catch (error) {
        console.error(`❌ Error fetching data from ${url}:`, error);
        return [];
      }
    };

    // Fetch all data concurrently
    const [offers, networks, trafficSources] = await Promise.all([
      fetchData(API_URLS.offers),
      fetchData(API_URLS.networks),
      fetchData(API_URLS.trafficSources),
    ]);

    return {
      props: { offers, networks, trafficSources },
    };
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    return {
      props: {
        offers: [],
        networks: [],
        trafficSources: [],
        error: error.message,
      },
    };
  }
}

export default function Home({ offers, networks, trafficSources, error }) {
  const [activeTab, setActiveTab] = useState("offers"); // Default tab
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const handleTabChange = (tab) => {
    setLoading(true); // Show loader when switching tabs
    setActiveTab(tab);
    setTimeout(() => setLoading(false), 500); // Simulate API loading delay
  };

  // Get filtered data based on active tab
  const getFilteredData = () => {
    let data = [];
    if (activeTab === "offers") data = offers;
    else if (activeTab === "networks") data = networks;
    else if (activeTab === "traffic") data = trafficSources;

    return data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Offer Trunk - Offers, Networks & Traffic Sources</title>
        <meta
          name="description"
          content="Find the best offers, networks, and traffic sources with real-time data."
        />
      </Head>

      <Navbar />
      <Banner />
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Tabs activeTab={activeTab} setActiveTab={handleTabChange} />

      {loading ? (
        <Loader />
      ) : (
        <DataTable activeTab={activeTab} filteredData={getFilteredData()} />
      )}
    </div>
  );
}
