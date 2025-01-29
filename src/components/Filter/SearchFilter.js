import { FaSearch } from "react-icons/fa";

const SearchFilters = ({ searchQuery, setSearchQuery }) => {
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
        <select className="border rounded p-2 flex-1 min-w-[150px] h-[42px]">
          <option>Select Networks</option>
        </select>

        <select className="border rounded p-2 flex-1 min-w-[150px] h-[42px]">
          <option>Select Countries</option>
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
