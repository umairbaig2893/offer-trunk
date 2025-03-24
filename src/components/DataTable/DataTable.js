import Link from "next/link";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Image from "next/image";
import Head from "next/head";
import Footer from "../Footer/Footer";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

// Helper function to check if a URL is absolute (http or https).
function isAbsoluteUrl(url = "") {
  const trimmed = url.trim().toLowerCase();
  return trimmed.startsWith("http://") || trimmed.startsWith("https://");
}

// Helper function to slugify text.
function slugify(text = "") {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
    <>
      <Head>
        <title>
          {activeTab === "offers"
            ? "Best Affiliate Offers"
            : activeTab === "networks"
            ? "Affiliate Networks"
            : "Traffic Sources"}{" "}
          - Website
        </title>
        <meta
          name="description"
          content={`Browse ${
            activeTab === "offers"
              ? "the best affiliate offers"
              : activeTab === "networks"
              ? "top affiliate networks"
              : "trusted traffic sources"
          } with detailed insights and data.`}
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Affiliate Offers, Networks & Traffic Sources - Your Website"
        />
        <meta
          property="og:description"
          content="Find the best offers, networks, and traffic sources in the affiliate industry."
        />
      </Head>

      <div className="p-4 flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-3/4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-4 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-[#0a64bc] text-white">
                <tr>
                  <th className="border-b-2 p-4 text-lg font-semibold text-start">
                    NAME
                  </th>
                  {activeTab === "offers" && (
                    <>
                      <th className="border-b-2 p-4 text-lg font-semibold">
                        PAYOUT
                      </th>
                      <th className="border-b-2 p-4 text-lg font-semibold">
                        NETWORK
                      </th>
                      <th className="border-b-2 p-4 text-lg font-semibold">
                        COUNTRY
                      </th>
                    </>
                  )}
                  {activeTab === "networks" && (
                    <>
                      <th className="border-b-2 p-4 text-lg font-semibold">
                        DESCRIPTION
                      </th>
                      <th className="border-b-2 p-4 text-lg font-semibold">
                        OFFER COUNT
                      </th>
                    </>
                  )}
                  {activeTab === "traffic" && (
                    <>
                      <th className="border-b-2 p-4 text-lg font-semibold">
                        TYPE
                      </th>
                      <th className="border-b-2 p-4 text-lg font-semibold">
                        MOBILE
                      </th>
                      <th className="border-b-2 p-4 text-lg font-semibold">
                        DESKTOP
                      </th>
                      <th className="border-b-2 p-4 text-lg font-semibold">
                        RETARGETING
                      </th>
                      <th className="border-b-2 p-4 text-lg font-semibold">
                        SELF-SERVE
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((item, index) => {
                    const slug =
                      item.slug ||
                      (item.name && slugify(item.name)) ||
                      "default-slug";

                    // Construct the final image URL
                    let finalImageUrl = "/placeholder.png"; // fallback if missing
                    if (item.img) {
                      if (isAbsoluteUrl(item.img)) {
                        // If item.img is already an absolute URL (http/https)
                        finalImageUrl = item.img.trim();
                      } else {
                        // Otherwise prepend your custom path
                        const folder =
                          activeTab === "offers"
                            ? "offers"
                            : activeTab === "networks"
                            ? "networks"
                            : "traffic";
                        finalImageUrl = `https://api.offertrunk.com/images/${folder}/${item.img.trim()}`;
                      }
                    }

                    return (
                      <tr
                        key={index}
                        className="border-b transition-all duration-300 hover:bg-[#E1D7C6] text-black-500"
                      >
                        <td className="p-4 flex items-center space-x-2 text-black-500">
                          {item.name ? (
                            <Link
                              href={`/${
                                activeTab === "offers"
                                  ? "offer"
                                  : activeTab === "networks"
                                  ? "network"
                                  : "traffic"
                              }/${slug}`}
                              className="flex items-center w-full hover:underline"
                            >
                              <Image
                                src={finalImageUrl}
                                alt={item.name}
                                width={50}
                                height={30}
                                className="mr-2 rounded-lg"
                                loading="lazy"
                              />
                              <span className="truncate">{item.name}</span>
                            </Link>
                          ) : (
                            <span className="text-black-500">No Name</span>
                          )}
                        </td>

                        {/* OFFERS COLUMNS */}
                        {activeTab === "offers" && (
                          <>
                            <td className="p-4 text-center">${item.payout}</td>
                            <td className="p-4 text-center">
                              {item.network_name || ""}
                            </td>
                            <td className="p-4 text-center">
                              {item.geo || "-"}
                            </td>
                          </>
                        )}

                        {/* NETWORKS COLUMNS */}
                        {activeTab === "networks" && (
                          <>
                            <td className="p-4 text-center">
                              {item.description || "-"}
                            </td>
                            <td className="p-4 text-center">
                              {item.offer_count || "0"}
                            </td>
                          </>
                        )}

                        {/* TRAFFIC COLUMNS */}
                        {activeTab === "traffic" && (
                          <>
                            <td className="p-4 text-center">
                              {item.type || "-"}
                            </td>
                            <td className="p-4 text-center">
                              {item.mobile === 1 ? "Yes" : "No"}
                            </td>
                            <td className="p-4 text-center">
                              {item.desktop === 1 ? "Yes" : "No"}
                            </td>
                            <td className="p-4 text-center">
                              {item.retargeting === 1 ? "Yes" : "No"}
                            </td>
                            <td className="p-4 text-center">
                              {item.self_serve === 1 ? "Yes" : "No"}
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center p-4 text-xl font-semibold text-black-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
                  disabled={page === "..."}
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

          {/* Example banner images */}
          <div className="flex justify-center items-center gap-6 mt-8 flex-wrap">
            {[
              {
                src: "https://www.offertrunk.com/images/banners/8.png",
                alt: "Offer 2",
              },
              {
                src: "https://www.offertrunk.com/images/banners/9.png",
                alt: "Offer 3",
              },
              {
                src: "https://www.offertrunk.com/images/banners/9.png",
                alt: "Offer 3",
              },
            ].map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                width={150}
                height={90}
                className="rounded-md shadow-lg object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Right sidebar banners */}
        <div className="w-full lg:w-1/4 flex flex-col items-center gap-4">
          <Image
            src="/assets/side-banner-1.webp"
            alt="Ad Banner"
            width={200}
            height={300}
            className="object-cover rounded-md"
          />
          <Image
            src="/assets/side-banner-2.gif"
            alt="Ad Banner"
            width={200}
            height={300}
            className="object-cover rounded-md"
          />
          <Image
            src="/assets/side-banner-3.webp"
            alt="Ad Banner"
            width={200}
            height={300}
            className="object-cover rounded-md"
          />
          <Image
            src="/assets/side-banner-4.webp"
            alt="Ad Banner"
            width={200}
            height={300}
            className="object-cover rounded-md"
          />
        </div>
      </div>

      {/* Footer area */}
      <div className="text-center py-6 mt-10">
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

      <Footer />
    </>
  );
};

export default DataTable;
