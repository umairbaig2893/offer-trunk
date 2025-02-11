// import { FaSearch } from "react-icons/fa";
// import { COUNTRY_LIST } from "../Helper/countryHellper";

// const getUniqueNetworks = (offers, selectedCountry) => {
//   const filteredOffers = selectedCountry
//     ? offers.filter((offer) => offer.country_code === selectedCountry)
//     : offers;

//   return [...new Set(filteredOffers.map((offer) => offer.network_name))];
// };

// const getUniqueCountries = (offers = []) => {
//   const uniqueGeoCodes = [...new Set(offers.map((offer) => offer.geo))];

//   return uniqueGeoCodes
//     .map((geoCode) => {
//       const country = COUNTRY_LIST.find((c) => c.code === geoCode);
//       return country ? { label: country.name, value: country.code } : null;
//     })
//     .filter(Boolean);
// };

// const SearchFilters = ({
//   searchQuery,
//   setSearchQuery,
//   selectedNetwork,
//   setSelectedNetwork,
//   selectedCountry,
//   setSelectedCountry,
//   offers,
// }) => {
//   return (
//     <div className="p-4">
//       <div className="flex flex-wrap items-center gap-2 md:gap-4">
//         {/* Search Input */}
//         <div className="relative flex-1 min-w-[250px]">
//           <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search By Name"
//             className="border rounded p-2 pl-10 w-full h-[42px]"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {/* Dropdown Filters */}
//         <select
//           className="border rounded p-2 flex-1 min-w-[150px] h-[42px]"
//           value={selectedNetwork}
//           onChange={(e) => setSelectedNetwork(e.target.value)}
//         >
//           <option value="">Select Networks</option>
//           {getUniqueNetworks(offers).map((network, index) => (
//             <option key={index} value={network}>
//               {network}
//             </option>
//           ))}
//         </select>

//         <select
//           className="border rounded p-2 flex-1 min-w-[150px] h-[42px]"
//           value={selectedCountry}
//           onChange={(e) => setSelectedCountry(e.target.value)}
//         >
//           <option value="">Select Country</option>
//           {getUniqueCountries(offers).map((country) => (
//             <option key={country.value} value={country.value}>
//               {country.label}
//             </option>
//           ))}
//         </select>

//         {/* Clear Button */}
//         <button
//           className="bg-gradient-to-r from-[#E1D7C6] to-[#295F98] text-white px-4 py-2 rounded h-[42px] flex items-center justify-center"
//           onClick={() => setSearchQuery("")}
//         >
//           Clear Search
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchFilters;

// import { FaSearch } from "react-icons/fa";
// import { COUNTRY_LIST } from "../Helper/countryHellper";

// const imageUrls = [
//   { src: "https://www.offertrunk.com/images/banners/13.png", alt: "Ad 1" },
//   { src: "https://www.offertrunk.com/images/banners/16.jpg", alt: "Ad 2" },
//   { src: "https://www.offertrunk.com/images/banners/13.png", alt: "Ad 3" },
//   { src: "https://www.offertrunk.com/images/banners/16.jpg", alt: "Ad 3" },
//   // Add up to 34 image URLs here
// ];

// const getUniqueNetworks = (offers, selectedCountry) => {
//   const filteredOffers = selectedCountry
//     ? offers.filter((offer) => offer.country_code === selectedCountry)
//     : offers;

//   return [...new Set(filteredOffers.map((offer) => offer.network_name))];
// };

// const getUniqueCountries = (offers = []) => {
//   const uniqueGeoCodes = [...new Set(offers.map((offer) => offer.geo))];

//   return uniqueGeoCodes
//     .map((geoCode) => {
//       const country = COUNTRY_LIST.find((c) => c.code === geoCode);
//       return country ? { label: country.name, value: country.code } : null;
//     })
//     .filter(Boolean);
// };

// const SearchFilters = ({
//   searchQuery,
//   setSearchQuery,
//   selectedNetwork,
//   setSelectedNetwork,
//   selectedCountry,
//   setSelectedCountry,
//   offers,
//   activeTab,
// }) => {
//   return (
//     <>
//       <div className="p-4 flex justify-center">
//         <div
//           className={`flex flex-wrap p-4 items-center gap-2 md:gap-4 ${
//             activeTab !== "offers" ? "max-w-md mx-auto" : "w-full"
//           } ${["networks", "traffic"].includes(activeTab) ? "" : "shadow-lg"}`}
//         >
//           {/* Search Input */}
//           <div className="relative flex-1 min-w-[250px]">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search By Name"
//               className="border rounded p-2 pl-10 w-full h-[42px]"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           {/* Dropdown Filters for Offers Tab Only */}
//           {activeTab === "offers" && (
//             <>
//               <select
//                 className="border rounded p-2 flex-1 min-w-[150px] h-[42px]"
//                 value={selectedNetwork}
//                 onChange={(e) => setSelectedNetwork(e.target.value)}
//               >
//                 <option value="">Select Networks</option>
//                 {getUniqueNetworks(offers).map((network, index) => (
//                   <option key={index} value={network}>
//                     {network}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 className="border rounded p-2 flex-1 min-w-[150px] h-[42px]"
//                 value={selectedCountry}
//                 onChange={(e) => setSelectedCountry(e.target.value)}
//               >
//                 <option value="">Select Country</option>
//                 {getUniqueCountries(offers).map((country) => (
//                   <option key={country.value} value={country.value}>
//                     {country.label}
//                   </option>
//                 ))}
//               </select>
//             </>
//           )}

//           {/* Clear Button */}
//           <button
//             className="bg-gradient-to-r from-[#E1D7C6] to-[#295F98] text-white px-4 py-2 rounded h-[42px] flex items-center justify-center"
//             onClick={() => {
//               setSearchQuery("");
//               setSelectedNetwork("");
//               setSelectedCountry("");
//             }}
//           >
//             Clear Search
//           </button>
//           {activeTab === "offers" && (
//             <button
//               className="bg-gradient-to-r from-[#E1D7C6] to-[#FF5733] text-white px-4 py-2 rounded h-[42px] flex items-center justify-center"
//               onClick={() => {
//                 setSelectedNetwork("");
//                 setSelectedCountry("");
//               }}
//             >
//               Clear Filters
//             </button>
//           )}
//         </div>
//       </div>
//       <div className="flex flex-wrap justify-start gap-4 mt-4 px-4">
//         {imageUrls.map((image, index) => (
//           <img
//             key={index}
//             src={image.src}
//             alt={image.alt}
//             className="w-100 h-20 object-cover rounded shadow-md"
//           />
//         ))}
//       </div>
//     </>
//   );
// };

// export default SearchFilters;
import { FaSearch } from "react-icons/fa";
import { COUNTRY_LIST } from "../Helper/countryHellper";

// Sample image URLs
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

  return [...new Set(filteredOffers.map((offer) => offer.network_name))];
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
  return (
    <>
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

      <div className="p-4 bg-white rounded-md">
        {/* Tabs */}

        {/* Wrapper - Responsive Layout */}
        <div className="flex flex-col md:flex-col lg:flex-row items-center lg:items-start gap-4 mt-4 sm:mt-5">
          {/* Left Side - Inputs & Image on Desktop */}
          {/* Wrapper - Responsive Layout */}
          <div className="flex flex-col w-full">
            {/* Search & Filters (Same Row on lg, Column on md) */}
            <div className="flex flex-wrap items-center gap-4 justify-start sm:justify-start w-full">
              {/* Search Input */}
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

              {/* Filters (only for Offers Tab) */}
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

            {/* Buttons First on md, Below Everything on lg */}
            <div className="flex flex-wrap gap-4 mt-4 md:order-1 lg:order-2">
              <button
                className="bg-gradient-to-r from-[#E1D7C6] to-[#295F98] text-white px-4 py-2 rounded-lg h-[48px] text-sm shadow-md w-full sm:w-auto"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </button>

              {activeTab === "offers" && (
                <button
                  className="bg-gradient-to-r from-[#E1D7C6] to-[#FF5733] text-white px-4 py-2 rounded-lg h-[48px] text-sm shadow-md w-full sm:w-auto"
                  onClick={() => {
                    setSelectedNetwork("");
                    setSelectedCountry("");
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Right Side - Image (Moves Below on md, Right on lg) */}
          <div className="w-full lg:w-auto flex justify-start lg:justify-end md:order-2 lg:order-1">
            <img
              src="https://www.offertrunk.com/images/banners/12.png"
              alt="Offer 1"
              className="w-full md:w-[350px] sm:w-[280px] h-auto rounded-md shadow-lg"
            />
          </div>
        </div>

        {/* Image Section Positioned Below Buttons */}
        <div className="flex flex-wrap justify-start gap-4 mt-6">
          {imageUrls.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="w-full sm:w-72 h-22 object-cover cursor-pointer rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TabsWithFilters;
