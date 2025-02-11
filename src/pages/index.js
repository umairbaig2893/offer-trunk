// pages/index.js
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import DataTable from "@/components/DataTable/DataTable";
import Navbar from "@/components/Navbar/Navbar";
import Loader from "@/components/Loader/Loader";
import TabsWithFilters from "@/components/Filter/TabWithFilter";

const API_URLS = {
  offers: "https://api.offertrunk.com/api/getOffers",
  networks: "https://api.offertrunk.com/api/getNetworks",
  trafficSources: "https://api.offertrunk.com/api/getTrafficSources",
};

const ITEMS_PER_PAGE = 10;

export async function getServerSideProps(context) {
  const { query } = context;
  const recentPage = parseInt(query.page) || 1;

  try {
    // Helper function to fetch data from an API URL
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

    // Fetch all datasets concurrently
    const [offers, networks, trafficSources] = await Promise.all([
      fetchData(API_URLS.offers),
      fetchData(API_URLS.networks),
      fetchData(API_URLS.trafficSources),
    ]);

    // Return the full datasets so we can filter them on the client side.
    return {
      props: {
        offers: { fullData: offers },
        networks: { fullData: networks },
        trafficSources: { fullData: trafficSources },
        recentPage,
      },
    };
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    return {
      props: {
        offers: { fullData: [] },
        networks: { fullData: [] },
        trafficSources: { fullData: [] },
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

  // When the tab changes, we simulate a short loader.
  const handleTabChange = (tab) => {
    setLoading(true);
    setActiveTab(tab);
    setTimeout(() => setLoading(false), 500);
  };

  // This function filters the full data based on search and selected filters,
  // then paginates the result.
  const getFilteredData = () => {
    let data = [];
    if (activeTab === "offers") data = offers.fullData;
    else if (activeTab === "networks") data = networks.fullData;
    else if (activeTab === "traffic") data = trafficSources.fullData;

    // Filter by search query (assuming every item has a "name" field)
    data = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Optionally filter by network and country if provided
    if (selectedNetwork) {
      data = data.filter((item) => item.network_name === selectedNetwork);
    }
    if (selectedCountry) {
      data = data.filter((item) => item.geo === selectedCountry);
    }

    const totalItems = data.length;
    const overallPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const indexOfLastItem = recentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const paginatedData = data.slice(indexOfFirstItem, indexOfLastItem);

    return { paginatedData, overallPages };
  };

  // Navigate by updating the page query parameter
  const goToNextPage = (page) => {
    router.push(`/?page=${page}`);
  };

  // Destructure the result of filtering and pagination
  const { paginatedData, overallPages } = getFilteredData();

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

      {/* TabsWithFilters should render your site navigation (e.g. switching between offers, networks, and traffic sources) */}
      <TabsWithFilters
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedNetwork={selectedNetwork}
        setSelectedNetwork={setSelectedNetwork}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        offers={offers.fullData}
      />

      {loading ? (
        <Loader />
      ) : (
        <DataTable
          activeTab={activeTab}
          filteredData={paginatedData}
          recentPage={recentPage}
          overallPages={overallPages}
          goToNextPage={goToNextPage}
        />
      )}
    </div>
  );
}
