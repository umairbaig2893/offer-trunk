import { FaSearch } from "react-icons/fa";
import { COUNTRY_LIST } from "../Helper/countryHellper";

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

const SearchFilters = ({
  searchQuery,
  setSearchQuery,
  selectedNetwork,
  setSelectedNetwork,
  selectedCountry,
  setSelectedCountry,
  offers,
}) => {
  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[250px]">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search By Name"
            className="border rounded p-2 pl-10 w-full h-[42px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dropdown Filters */}
        <select
          className="border rounded p-2 flex-1 min-w-[150px] h-[42px]"
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
          className="border rounded p-2 flex-1 min-w-[150px] h-[42px]"
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

        {/* Clear Button */}
        <button
          className="bg-gradient-to-r from-[#E1D7C6] to-[#295F98] text-white px-4 py-2 rounded h-[42px] flex items-center justify-center"
          onClick={() => setSearchQuery("")}
        >
          Clear Search
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
