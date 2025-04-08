import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { COUNTRY_LIST } from "../Helper/countryHellper";
import Image from "next/image";

const API_URLS = {
  generalOffers: "https://api.offertrunk.com/api/getOffers", // General Offers API
  maxbountyOffers: "https://api.offertrunk.com/user/maxbountyOffers", // MaxBounty API
};

const imageUrls = [
  { src: "https://www.offertrunk.com/images/banners/13.png", alt: "Ad 1" },
  { src: "https://www.offertrunk.com/images/banners/16.jpg", alt: "Ad 2" },
  { src: "https://www.offertrunk.com/images/banners/13.png", alt: "Ad 3" },
  { src: "https://www.offertrunk.com/images/banners/16.jpg", alt: "Ad 4" },
];

const getUniqueNetworks = (offers, selectedCountry) => {
  const filteredOffers = selectedCountry
    ? offers.filter((offer) => offer.country_code === selectedCountry)
    : offers;

  const networks = [
    ...new Set(filteredOffers.map((offer) => offer.network_name)),
  ];

  if (!networks.includes("MaxBounty")) {
    networks.push("MaxBounty");
  }

  return networks;
};

const getUniqueCountries = (offers = []) => {
  const uniqueGeoCodes = [...new Set(offers.map((offer) => offer.geo))];

  return uniqueGeoCodes
    .map((geoCode) => {
      const country = COUNTRY_LIST.find((c) => c.code === geoCode);
      return country ? { label: country.name, value: country.code } : null;
    })
    .filter(Boolean);
};

const TabsWithFilters = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  selectedNetwork,
  setSelectedNetwork,
  selectedCountry,
  setSelectedCountry,
  offers,
}) => {
  const [filteredOffers, setFilteredOffers] = useState(offers);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("new"); // Filter for MaxBounty

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        let url = API_URLS.generalOffers; // Default to general offers API

        if (selectedNetwork === "MaxBounty") {
          url = `${API_URLS.maxbountyOffers}?filter=${selectedFilter}`;
        }

        console.log("Fetching from:", url); // ✅ Debugging log

        const response = await fetch(url);

        // ✅ Check if response is OK (status 200-299)
        if (!response.ok) {
          throw new Error(
            `API request failed: ${response.status} ${response.statusText}`
          );
        }

        // ✅ Check if response is actually JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const textResponse = await response.text(); // Get raw response
          console.error("API returned non-JSON response:", textResponse);
          throw new Error(
            "API response is not JSON. Possible HTML error page."
          );
        }

        const data = await response.json();
        console.log("API Response:", data); // ✅ Debugging log

        // ✅ Ensure MaxBounty offers are mapped correctly
        if (data.data && data.data.offers && Array.isArray(data.data.offers)) {
          setFilteredOffers(data.data.offers);
        } else {
          console.warn("Invalid API response format:", data);
          setFilteredOffers([]);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
        setFilteredOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [selectedNetwork, selectedFilter]); // ✅ Fetch again when network or filter changes

  return (
    <>
      <div className="flex flex-wrap justify-center py-3 items-center bg-[#0a64bc] text-white py-4 shadow-md sm:py-0">
        {[
          { key: "offers", label: "OFFERS" },
          { key: "networks", label: "AFFILIATE NETWORKS" },
          { key: "traffic", label: "TRAFFIC SOURCES" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-lg font-bold relative ${
              activeTab === tab.key
                ? "border-b-4 border-white"
                : "opacity-80 hover:opacity-100"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 bg-white rounded-md">
        <div className="flex flex-col md:flex-col lg:flex-row items-center lg:items-start gap-4 mt-4 sm:mt-5">
          <div className="flex flex-col w-full">
            <div className="flex flex-wrap items-center gap-4 justify-start sm:justify-start w-full">
              <div className="relative w-full sm:w-80">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search By Name"
                  className="border rounded-lg px-4 pl-10 w-full sm:w-80 h-[48px] text-sm shadow-sm focus:ring-2 focus:ring-blue-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {activeTab === "offers" && (
                <>
                  <select
                    className="border rounded-lg px-4 w-full sm:w-80 h-[48px] text-sm shadow-sm focus:ring-2 focus:ring-blue-400 appearance-none"
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                  >
                    <option value="">Select Networks</option>
                    {getUniqueNetworks(offers).map((network, index) => (
                      <option key={index} value={network}>
                        {network}
                      </option>
                    ))}
                  </select>

                  {selectedNetwork === "MaxBounty" && (
                    <select
                      className="border rounded-lg px-4 w-full sm:w-80 h-[48px] text-sm shadow-sm focus:ring-2 focus:ring-blue-400 appearance-none"
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                    >
                      <option value="new">New</option>
                      <option value="popular">Popular</option>
                      <option value="suggested">Suggested</option>
                      <option value="top">Top</option>
                      <option value="trending">Trending</option>
                    </select>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Display Offers List Here */}
        <div className="flex flex-wrap justify-start gap-4 mt-6">
          {loading ? (
            <p>Loading offers...</p>
          ) : filteredOffers.length > 0 ? (
            filteredOffers.map((offer, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md w-full sm:w-72"
              >
                <h3 className="font-bold">{offer.name}</h3>
                <p className="text-sm">{offer.description}</p>
                <p className="text-blue-500">Payout: ${offer.payout}</p>
                <a
                  href={offer.offer_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline block mt-2"
                >
                  View Offer
                </a>
              </div>
            ))
          ) : (
            <p>No offers found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TabsWithFilters;
