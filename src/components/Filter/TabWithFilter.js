// TabsWithFilters.js
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { COUNTRY_LIST } from "../Helper/countryHellper";
import Image from "next/image";

const imageUrls = [
  { src: "/new-assets/banner2.webp", alt: "Ad 1" },
  { src: "/new-assets/banner3.webp", alt: "Ad 2" },
  { src: "/new-assets/banner4.webp", alt: "Ad 3" },
  { src: "/new-assets/banner5.webp", alt: "Ad 4" },
];

// Unique networks
const getUniqueNetworks = (offers) => {
  const networks = [...new Set(offers.map((o) => o.network_name))];
  if (!networks.includes("MaxBounty")) {
    networks.push("MaxBounty");
  }
  return networks;
};

// Unique countries
const getUniqueCountries = (offers = []) => {
  const geoCodes = [...new Set(offers.map((o) => o.geo))];
  return geoCodes
    .map((geo) => {
      const c = COUNTRY_LIST.find((x) => x.code === geo);
      return c ? { label: c.name, value: c.code } : null;
    })
    .filter(Boolean);
};

export default function TabsWithFilters({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  selectedNetwork,
  setSelectedNetwork,
  selectedCountry,
  setSelectedCountry,
  offers,
  selectedFilter, // We'll let index.js store this
  setSelectedFilter, // We'll let index.js store this
}) {
  return (
    <>
      {/* Tabs */}
      <div
        className="flex flex-wrap justify-center py-3 items-center bg-[#0a64bc] text-white py-4 shadow-md sm:py-0"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
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

      {/* Filter UI & Banners */}
      <div className="p-4 bg-white rounded-md">
        <div className="flex flex-col md:flex-col lg:flex-row items-center lg:items-start gap-4 mt-4 sm:mt-5">
          <div className="flex flex-col w-full">
            {/* Search, Network, Country */}
            <div className="flex flex-wrap items-center gap-4 w-full">
              {/* Search Box */}
              <div className="relative w-full sm:w-80">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search By Name"
                  className="border rounded-lg px-4 pl-10 w-full sm:w-80 h-[48px] text-sm shadow-sm focus:ring-2 focus:ring-blue-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Only show these filters on the 'offers' tab */}
              {activeTab === "offers" && (
                <>
                  {/* Networks */}
                  <select
                    className="border rounded-lg px-4 w-full sm:w-80 h-[48px] text-sm shadow-sm focus:ring-2 focus:ring-blue-400 appearance-none"
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                  >
                    <option value="">Select Networks</option>
                    {getUniqueNetworks(offers).map((net, idx) => (
                      <option key={idx} value={net}>
                        {net}
                      </option>
                    ))}
                  </select>

                  {/* If user picks MaxBounty, show special filter */}
                  {/* {selectedNetwork === "MaxBounty" && (
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
                  )} */}

                  {/* Country Filter */}
                  <select
                    className="border rounded-lg px-4 w-full sm:w-80 h-[48px] text-sm shadow-sm focus:ring-2 focus:ring-blue-400 appearance-none"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {getUniqueCountries(offers).map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>

            {/* Buttons to Clear Search/Filters */}
            <div className="flex flex-wrap gap-4 mt-4">
              <button
                className="bg-[#0a64bc] text-white px-4 py-2 rounded-lg h-[48px] text-sm shadow-md"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </button>

              {activeTab === "offers" && (
                <button
                  className="bg-[#0a64bc] text-white px-4 py-2 rounded-lg h-[48px] text-sm shadow-md"
                  onClick={() => {
                    setSelectedNetwork("");
                    setSelectedCountry("");
                    setSelectedFilter("new");
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Example Banner (Right Side) */}
          <div className="w-full lg:w-auto flex justify-start lg:justify-end">
            <Image
              src="/new-assets/banner1.webp"
              alt="Offer 1"
              width={350}
              height={200}
              className="w-full md:w-[350px] sm:w-[280px] h-auto rounded-md shadow-lg"
              loading="lazy"
              priority={false}
            />
          </div>
        </div>

        {/* Additional Banners */}
        <div className="flex flex-wrap justify-start gap-4 mt-6">
          {imageUrls.map((img, idx) => (
            <div key={idx} className="w-full sm:w-72">
              <Image
                src={img.src}
                alt={img.alt}
                width={288}
                height={88}
                className="w-full sm:w-72 h-auto object-cover cursor-pointer rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* 
          NOTE: We no longer render a table here. 
          That happens only in DataTable. 
        */}
      </div>
    </>
  );
}
