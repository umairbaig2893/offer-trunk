import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import {
  FaAngleLeft,
  FaAngleRight,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Footer from "@/components/Footer/Footer";

const OfferDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [offer, setOffer] = useState(null);
  const [relatedOffers, setRelatedOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const res = await fetch("https://api.offertrunk.com/api/getOffers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const { data: offers = [] } = await res.json();

      const matchedOffer = offers.find((o) => o.slug === slug);
      if (!matchedOffer) {
        console.error("Offer slug not found:", slug);
        setLoading(false);
        return;
      }

      setOffer(matchedOffer);
      setRelatedOffers(
        offers.filter(
          (o) => o.network_name === matchedOffer.network_name && o.slug !== slug
        )
      );
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  const totalPages = Math.ceil(relatedOffers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOffers = relatedOffers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage > 3) pages.push(1, "...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      )
        pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...", totalPages);
    }
    return pages;
  };

  if (loading) return <p className="text-center py-10">Loading offer...</p>;
  if (!offer) return <p className="text-center py-10">Offer not found.</p>;

  return (
    <>
      <Head>
        <title>{offer.name || "Offer Details"}</title>
        <meta
          name="description"
          content={offer.description || "Offer details"}
        />
      </Head>

      <div className="min-h-screen p-6">
        {/* Breadcrumb */}
        <div className="text-gray-600 text-sm mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/?tab=offers" className="hover:underline">
            Offers
          </Link>{" "}
          / <span className="font-semibold">{offer.name}</span>
        </div>

        {/* Offer Header */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            {offer.img && (
              <Image
                src={
                  offer.img.startsWith("http")
                    ? offer.img
                    : `https://api.offertrunk.com/images/offers/${offer.img}`
                }
                alt={offer.name}
                width={80}
                height={80}
                className="rounded-md"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{offer.name}</h1>
              {offer.offer_link && (
                <a
                  href={offer.offer_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {offer.offer_link}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main Info */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-semibold text-gray-700">Payout</p>
            <p className="text-green-600">${offer.payout || 0}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Tracking Type</p>
            <p>{offer.tracking_type || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Countries</p>
            <p>{offer.geo || "Global"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Network</p>
            <p>{offer.network_name || "-"}</p>
          </div>
        </div>

        {/* Related Offers */}
        {relatedOffers.length > 0 && (
          <div className="mt-10 bg-white p-6 rounded-lg shadow-md max-w-4xl  text-lg">
            <h2 className="text-xl font-semibold mb-4">Related Offers</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-[#0a64bc] text-white">
                  <tr>
                    <th className="p-3 text-left border border-gray-200">
                      Name
                    </th>
                    <th className="p-3 text-left border border-gray-200">
                      Payout
                    </th>
                    <th className="p-3 text-left border border-gray-200">
                      Geo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOffers.map((item, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="p-3 border border-gray-200 flex items-center space-x-2">
                        {item.img && (
                          <Image
                            src={
                              item.img.startsWith("http")
                                ? item.img
                                : `https://api.offertrunk.com/images/offers/${item.img}`
                            }
                            alt={item.name}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                        )}
                        <Link
                          href={`/offer/${item.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^\w-]+/g, "")}`}
                          className="hover:underline text-blue-600"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-3 border border-gray-200">
                        ${item.payout}
                      </td>
                      <td className="p-3 border border-gray-200">
                        {item.geo || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex gap-2 mt-4 justify-center items-center">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    <FaAngleLeft />
                  </button>
                  {renderPageNumbers().map((page, i) => (
                    <button
                      key={i}
                      onClick={() => typeof page === "number" && goToPage(page)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      disabled={page === "..."}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    <FaAngleRight />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Area */}
        <div className="text-center py-6 mt-12">
          <div className="flex justify-center">
            <Image
              src="/assets/offer-trunk-logo-1.png"
              alt="Offer Trunk Logo"
              width={175}
              height={120}
              className="h-auto"
              loading="lazy"
            />
          </div>

          <div className="flex justify-center space-x-4 mt-4 text-blue-600">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram size={24} />
            </a>
          </div>

          <div className="flex justify-center space-x-6 mt-3">
            <Link
              href="/login"
              className="text-black hover:text-blue-600 font-semibold"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-black hover:text-blue-600 font-semibold"
            >
              Register
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default OfferDetails;
