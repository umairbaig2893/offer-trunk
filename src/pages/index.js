import Link from "next/link";
import { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import DataTable from "@/components/DataTable/DataTable";
import TabsWithFilters from "@/components/Filter/TabWithFilter";
import Loader from "@/components/Loader/Loader";

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
        console.error(`Error fetching data from ${url}:`, error);
        return [];
      }
    };

    const [offers, networks, trafficSources] = await Promise.all([
      fetchData(API_URLS.offers),
      fetchData(API_URLS.networks),
      fetchData(API_URLS.trafficSources),
    ]);

    return {
      props: { offers, networks, trafficSources },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
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
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
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

    if (activeTab === "offers") {
      data = offers;
    } else if (activeTab === "networks") {
      data = networks;
    } else if (activeTab === "traffic") {
      data = trafficSources;
    }

    // Filter by search (safe & flexible)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(q)) ||
          (item.geo && item.geo.toLowerCase().includes(q)) ||
          (item.network_name && item.network_name.toLowerCase().includes(q))
      );
    }

    // Filter by selected network
    if (selectedNetwork) {
      data = data.filter((item) => item.network_name === selectedNetwork);
    }

    // Filter by selected country
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
        <meta name="robots" content="index, follow" />
        {/* <link rel="canonical" href="https://offer-trunk.vercel.app/" /> */}


         {/* SEO for Home */}
        <title>
          Maximize Your Revenue with Offertrunk Affiliate Marketing and Affiliate Programs
        </title>
        <meta
          name="description"
          content="Affiliate Marketing and Affiliate Network. Explore top-performing affiliate programs, trusted networks, and valuable resources to accelerate your growth and earnings."
        />
        <meta name="keywords" content="affiliate marketing, affiliate programs, affiliate networks, earn money online, digital marketing" />
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
        offers={offers}
      />

      {loading ? (
        
        <Loader />
      ) : (
        <>
          <DataTable activeTab={activeTab} filteredData={getFilteredData()} />

          {/* SEO Links */}
          <div className="mt-10 px-4 seo-hidden-links">
            <h2 className="text-2xl font-bold mb-4">All Links for SEO</h2>

            {/* Offers Links */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Affiliate Offers</h3>
              <div className="flex flex-wrap gap-3">
                {offers.map((offer) => (
                  <Link
                    key={offer.id}
                    href={`/offer/${offer.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {offer.name}
                  </Link>
                ))}
              </div>
            </section>

            {/* Networks Links */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Affiliate Networks</h3>
              <div className="flex flex-wrap gap-3">
                {networks.map((network) => (
                  <Link
                    key={network.id}
                    href={`/network/${network.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {network.name}
                  </Link>
                ))}
              </div>
            </section>

            {/* Traffic Sources Links */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Traffic Sources</h3>
              <div className="flex flex-wrap gap-3">
                {trafficSources.map((traffic) => (
                  <Link
                    key={traffic.id}
                    href={`/traffic/${traffic.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {traffic.name}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
