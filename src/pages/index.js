// pages/index.js
import { useRouter } from "next/router";
import DataTable from "@/components/DataTable/DataTable";
import Navbar from "@/components/Navbar/Navbar";
import Loader from "@/components/Loader/Loader"; // Import Loader
import { useState } from "react";
import Head from "next/head";
import TabsWithFilters from "@/components/Filter/TabWithFilter";

const API_URLS = {
  offers: "https://api.offertrunk.com/api/getOffers",
  networks: "https://api.offertrunk.com/api/getNetworks",
  trafficSources: "https://api.offertrunk.com/api/getTrafficSources",
};

// Server-side data fetching with pagination support
export async function getServerSideProps(context) {
  const { query } = context;
  const recentPage = parseInt(query.page) || 1;
  const itemsPerPage = 10;

  try {
    const fetchData = async (url) => {
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
    };

    // Fetch all data concurrently
    const [offers, networks, trafficSources] = await Promise.all([
      fetchData(API_URLS.offers),
      fetchData(API_URLS.networks),
      fetchData(API_URLS.trafficSources),
    ]);

    // Paginate data
    const paginate = (data) => {
      const totalItems = data.length;
      const overallPages = Math.ceil(totalItems / itemsPerPage);
      const indexOfLastItem = recentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      return {
        paginatedData: data.slice(indexOfFirstItem, indexOfLastItem),
        overallPages,
      };
    };

    return {
      props: {
        offers: paginate(offers),
        networks: paginate(networks),
        trafficSources: paginate(trafficSources),
        recentPage,
      },
    };
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    return {
      props: {
        offers: { paginatedData: [], overallPages: 1 },
        networks: { paginatedData: [], overallPages: 1 },
        trafficSources: { paginatedData: [], overallPages: 1 },
        recentPage: 1,
      },
    };
  }
}

export default function Home({ offers, networks, trafficSources, recentPage }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [activeTab, setActiveTab] = useState("offers");

  const router = useRouter();

  const handleTabChange = (tab) => {
    setLoading(true);
    setActiveTab(tab);
    setTimeout(() => setLoading(false), 500);
  };

  const getFilteredData = () => {
    let data = [];
    if (activeTab === "offers") data = offers.paginatedData;
    else if (activeTab === "networks") data = networks.paginatedData;
    else if (activeTab === "traffic") data = trafficSources.paginatedData;

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

  const goToNextPage = (page) => {
    router.push(`/?page=${page}`);
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

      <TabsWithFilters
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedNetwork={selectedNetwork}
        setSelectedNetwork={setSelectedNetwork}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        offers={offers.paginatedData}
      />

      {loading ? (
        <Loader />
      ) : (
        <>
          <DataTable
            activeTab={activeTab}
            filteredData={getFilteredData()}
            recentPage={recentPage}
            overallPages={
              activeTab === "offers"
                ? offers.overallPages
                : activeTab === "networks"
                ? networks.overallPages
                : trafficSources.overallPages
            }
            goToNextPage={goToNextPage}
          />
        </>
      )}
    </div>
  );
}
