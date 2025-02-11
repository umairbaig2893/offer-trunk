import DataTable from "@/components/DataTable/DataTable";
import Navbar from "@/components/Navbar/Navbar";
// import Tabs from "@/components/Tab/Tab";
import Loader from "@/components/Loader/Loader"; // Import Loader
import { useState } from "react";
import Head from "next/head";
import TabsWithFilters from "@/components/Filter/TabWithFilter";

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
  // Default tab
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [activeTab, setActiveTab] = useState("offers");
  const handleTabChange = (tab) => {
    setLoading(true);
    setActiveTab(tab);
    setTimeout(() => setLoading(false), 500);
  };

  const getFilteredData = () => {
    let data = [];
    if (activeTab === "offers") data = offers;
    else if (activeTab === "networks") data = networks;
    else if (activeTab === "traffic") data = trafficSources;

    data = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedNetwork) {
      data = data.filter((item) => item.network_name === selectedNetwork);
    }

    if (selectedCountry) {
      data = data.filter((item) => item.geo === selectedCountry);
    }

    return data;
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
      {/* <Banner /> */}

      {/* <Tabs activeTab={activeTab} setActiveTab={handleTabChange} /> */}

      <TabsWithFilters
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedNetwork={selectedNetwork}
        setSelectedNetwork={setSelectedNetwork}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        offers={offers}
      />

      {loading ? (
        <Loader />
      ) : (
        <>
          <DataTable activeTab={activeTab} filteredData={getFilteredData()} />
        </>
      )}
    </div>
  );
}
