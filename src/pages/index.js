import Link from "next/link";
import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { LRUCache } from "lru-cache";
import Navbar from "@/components/Navbar/Navbar";
const TabsWithFilters = dynamic(
  () => import("@/components/Filter/TabWithFilter"),
  { ssr: false }
);
const DataTable = dynamic(() => import("@/components/DataTable/DataTable"), {
  ssr: false,
});
import Loader from "@/components/Loader/Loader";

const API_URLS = {
  offers: "https://api.offertrunk.com/api/getOffers",
  networks: "https://api.offertrunk.com/api/getNetworks",
  trafficSources: "https://api.offertrunk.com/api/getTrafficSources",
};

const cache = new LRUCache({
  max: 100, // Maximum number of items in the cache
  ttl: 1000 * 60 * 10, // Time to live in milliseconds (10 minutes)
});

// Server-side data fetching
// export async function getServerSideProps() {
//   try {
//     const fetchData = async (url) => {
//       try {
//         // const response = await fetch(url, {
//         //   method: "GET",
//         //   headers: { "Content-Type": "application/json" },
//         //   cache: "no-store",
//         // });
//         const response = await fetch(url, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Cache-Control": "s-maxage=3600, stale-while-revalidate=600",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`API request failed with status: ${response.status}`);
//         }

//         const result = await response.json();
//         return result?.data || [];
//       } catch (error) {
//         console.error(`❌ Error fetching data from ${url}:`, error);
//         return [];
//       }
//     };

//     // Fetch all data concurrently
//     const [offers, networks, trafficSources] = await Promise.all([
//       fetchData(API_URLS.offers),
//       fetchData(API_URLS.networks),
//       fetchData(API_URLS.trafficSources),
//     ]);

//     return {
//       props: { offers, networks, trafficSources },
//     };
//   } catch (error) {
//     console.error("❌ Error fetching data:", error);
//     return {
//       props: {
//         offers: [],
//         networks: [],
//         trafficSources: [],
//         error: error.message,
//       },
//     };
//   }
// }
export async function getServerSideProps() {
  const cacheKey = "offers-data";

  // Check if cached data exists
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return { props: cachedData };
  }

  try {
    const fetchData = async (url) => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=600",
        },
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

    const fetchedData = { offers, networks, trafficSources };

    // Store data in cache
    cache.set(cacheKey, fetchedData);

    return {
      props: fetchedData,
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
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://offer-trunk.vercel.app/" />
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

          {/* SECTION: Generate All Links for SEO */}
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
              <div className="flex flex-wrap gap-3 ">
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
