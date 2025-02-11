// pages/offers.js
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { query } = context;
  const currentPage = parseInt(query.page) || 1;
  const itemsPerPage = 10;

  // Fetch all data (or fetch paginated data from your API)
  const res = await fetch("https://api.offertrunk.com/api/getOffers");
  const allData = await res.json();

  // Calculate pagination
  const totalItems = allData.data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = allData.data.slice(indexOfFirstItem, indexOfLastItem);

  return {
    props: {
      offers: paginatedData,
      totalPages,
      currentPage,
    },
  };
}

export default function OffersPage({ offers, totalPages, currentPage }) {
  const router = useRouter();

  const goToPage = (page) => {
    router.push(`/offers?page=${page}`);
  };

  return (
    <div>
      <h1>Offers</h1>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>{offer.name}</li>
        ))}
      </ul>
      {/* Render pagination buttons */}
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
