import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const response = await fetch(`https://api.offertrunk.com/api/getOffers`);
    if (!response.ok) {
      return { notFound: true };
    }

    const result = await response.json();
    const offers = result.data || [];

    // Find the current offer
    const offer = offers.find((item) => {
      const itemSlug = item.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
      return itemSlug === slug;
    });

    if (!offer) {
      return { notFound: true };
    }

    // Get offers from the same network
    const relatedOffers = offers.filter(
      (item) =>
        item.network_name === offer.network_name && item.name !== offer.name
    );

    return { props: { offer, relatedOffers } };
  } catch (error) {
    console.error("❌ Error fetching offer details:", error);
    return { notFound: true };
  }
}

const OfferDetails = ({ offer, relatedOffers }) => {
  const router = useRouter();
  if (router.isFallback)
    return <p className="text-center text-lg">Loading...</p>;

  // Pagination State
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(relatedOffers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOffers = relatedOffers.slice(startIndex, endIndex);

  // Function to generate dynamic page numbers
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

  // Page navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Head>
        <title>{offer?.name || "Offer Details"}</title>
        <meta
          name="description"
          content={offer?.description || "Offer details"}
        />
      </Head>

      {/* Background */}
      <div className="min-h-screen bg-gradient-to-r from-[#FAF0E6] to-[#D4E4F7] p-6">
        {/* Breadcrumb Navigation */}
        <div className="text-gray-600 text-sm mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          /
          <Link href="/offers" className="hover:underline">
            {" "}
            Offers
          </Link>{" "}
          /<span className="font-semibold">{offer?.name}</span>
        </div>

        {/* Offer Header */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            {offer?.img && (
              <Image
                src={`https://api.offertrunk.com/images/${offer.img}`}
                alt={offer?.name || "Offer Image"}
                width={80}
                height={80}
                className="rounded-lg"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {offer?.name}
              </h1>
              {offer?.offer_link && (
                <a
                  href={offer.offer_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {offer.offer_link}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Offer Information */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-600">Platform</p>
              <p className="text-gray-800">
                {offer?.tracking_type || "Unknown"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Category</p>
              <p className="text-gray-800">{offer?.category_names || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Countries</p>
              <p className="text-gray-800">{offer?.geo || "-"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Payout</p>
              <p className="text-gray-800 text-green-600">${offer?.payout}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Network</p>
              <p className="text-gray-800">{offer?.network_name || "-"}</p>
            </div>
          </div>
        </div>

        {/* Other Offers from This Network */}
        {relatedOffers.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Other Offers from this Network
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gradient-to-r from-[#295F98] to-[#E1D7C6] text-white">
                    <th className="border border-gray-300 p-2 text-left">
                      NAME
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      PAYOUT
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      COUNTRIES
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOffers.map((relatedOffer, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-blue-100"
                      } text-gray-900`}
                    >
                      <td className="border border-gray-300 p-2 flex items-center space-x-2">
                        {relatedOffer.img && (
                          <Image
                            src={`https://api.offertrunk.com/images/${relatedOffer.img}`}
                            alt={relatedOffer.name}
                            width={50}
                            height={50}
                            className="rounded-lg"
                          />
                        )}
                        <Link
                          href={`/offer/${relatedOffer.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^\w-]+/g, "")}`}
                          legacyBehavior
                        >
                          <a className="hover:underline">{relatedOffer.name}</a>
                        </Link>
                      </td>
                      <td className="border border-gray-300 p-2">
                        ${relatedOffer.payout}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {relatedOffer.geo || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Advanced Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-4">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <FaAngleLeft />
                </button>
                {renderPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === "number" && goToPage(page)}
                    className={`px-4 py-2 border rounded-lg ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    disabled={page === "..."} // Disable button if it's an ellipsis
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <FaAngleRight />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="text-center py-6 mt-10">
          <div className="flex justify-center">
            <img
              src="https://www.offertrunk.com/images/logo.png"
              alt="Offer Trunk Logo"
              width={150}
              height={100}
            />
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-4 mt-4 text-blue-600">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} />
            </a>
          </div>

          {/* Login & Register Links */}
          <div className="flex justify-center space-x-6 mt-3">
            <Link href="/login" legacyBehavior>
              <a className="text-black hover:text-blue-600 font-semibold">
                Login
              </a>
            </Link>
            <Link href="/register" legacyBehavior>
              <a className="text-black hover:text-blue-600 font-semibold">
                Register
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferDetails;
