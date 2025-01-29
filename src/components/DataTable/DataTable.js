// const DataTable = ({ activeTab, filteredData }) => {
//   return (
//     <table className="w-full border-collapse border border-gray-300 mt-4">
//       <thead className="bg-blue-600 text-white">
//         <tr>
//           <th className="border p-2">NAME</th>
//           {activeTab === "offers" && <th className="border p-2">PAYOUT</th>}
//           {activeTab !== "traffic" && <th className="border p-2">NETWORK</th>}
//           {activeTab !== "networks" && (
//             <th className="border p-2">COUNTRIES</th>
//           )}
//         </tr>
//       </thead>
//       <tbody>
//         {filteredData.length > 0 ? (
//           filteredData.map((item, index) => (
//             <tr key={index} className="border">
//               <td className="border p-2 flex items-center">
//                 {item.img && (
//                   <img
//                     src={`https://api.offertrunk.com/uploads/${item?.img}`}
//                     className="w-10 h-10 mr-2"
//                     alt="Offer"
//                   />
//                 )}
//                 {item.name}
//               </td>
//               {activeTab === "offers" && (
//                 <td className="border p-2">${item.payout}</td>
//               )}
//               {activeTab !== "traffic" && (
//                 <td className="border p-2">{item.network_name || "-"}</td>
//               )}
//               {activeTab !== "networks" && (
//                 <td className="border p-2">{item.geo || "-"}</td>
//               )}
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="4" className="text-center p-4">
//               No data available
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// };

// export default DataTable;

import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const DataTable = ({ activeTab, filteredData }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 3) pages.push(1, "...");

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...", totalPages);
    }
    return pages;
  };

  return (
    <div className="p-4">
      <table className="w-full border-collapse mt-4 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-[#295F98] to-[#E1D7C6] text-white">
          <tr>
            <th className="border-b-2 p-4 text-lg font-semibold">NAME</th>
            {activeTab === "offers" && (
              <th className="border-b-2 p-4 text-lg font-semibold">PAYOUT</th>
            )}
            {activeTab !== "traffic" && (
              <th className="border-b-2 p-4 text-lg font-semibold">NETWORK</th>
            )}
            {activeTab !== "networks" && (
              <th className="border-b-2 p-4 text-lg font-semibold">
                COUNTRIES
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <tr
                key={index}
                className={`border-b transition-all duration-300 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-[#E1D7C6]`}
              >
                <td className="p-4 flex items-center space-x-2">
                  {item.img && (
                    <img
                      src={`https://api.offertrunk.com/uploads/${item?.img}`}
                      className="w-10 h-10 rounded-full"
                      alt="Offer"
                    />
                  )}
                  <span>{item.name}</span>
                </td>
                {activeTab === "offers" && (
                  <td className="p-4 text-center">${item.payout}</td>
                )}
                {activeTab !== "traffic" && (
                  <td className="p-4 text-center">
                    {item.network_name || "-"}
                  </td>
                )}
                {activeTab !== "networks" && (
                  <td className="p-4 text-center">{item.geo || "-"}</td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="text-center p-4 text-xl font-semibold text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            className={`px-4 py-2 border rounded-lg transition ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed bg-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaAngleLeft />
          </button>

          {renderPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-4 py-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={index}
                className={`px-4 py-2 border rounded-lg transition ${
                  currentPage === page
                    ? "bg-gradient-to-r from-[#E1D7C6] to-[#295F98] text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            )
          )}

          <button
            className={`px-4 py-2 border rounded-lg transition ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed bg-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaAngleRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
