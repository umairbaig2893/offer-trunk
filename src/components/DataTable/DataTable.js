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
const DataTable = ({
  activeTab,
  filteredData,
  // selectedNetwork,
  // setSelectedNetwork,
  // selectedCountry,
  // setSelectedCountry,
  // getUniqueNetworks,
  // getUniqueCountries,
  // offers,
}) => {
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

  // const slugify = (text) =>
  //   text
  //     .toString()
  //     .toLowerCase()
  //     .trim()
  //     .replace(/\s+/g, "-")
  //     .replace(/[^\w-]+/g, "")
  //     .replace(/--+/g, "-");

  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

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
                    const slug = item.name
                      ? slugify(item.name)
                      : "default-slug";
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
                              }/${slugify(item.name)}`}
                              className="flex items-center w-full hover:underline"
                            >
                              <Image
                                src={
                                  item.img
                                    ? `https://api.offertrunk.com/images/${
                                        activeTab === "offers"
                                          ? "offers"
                                          : activeTab === "networks"
                                          ? "networks"
                                          : "traffic"
                                      }/${item.img}`
                                    : "https://mir-s3-cdn-cf.behance.net/projects/404/ca3899120572411.Y3JvcCwxNDAwLDEwOTUsMCwxNTI.png"
                                }
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

                        {activeTab === "offers" && (
                          <>
                            <td className="p-4 text-center">${item.payout}</td>
                            <td
                              className="p-4 text-center"
                              href={`https://${
                                item.network_name
                                  ? item.network_name
                                      .toLowerCase()
                                      .replace(/\s+/g, "") + ".com"
                                  : ""
                              }`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.network_name || "-"}
                            </td>
                            {/* <td className="p-4 text-center">

                            </td> */}

                            <td className="p-4 text-center">
                              <a
                                href={`#${
                                  item.geo
                                    ? item.geo
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")
                                    : ""
                                }`}
                              >
                                {item.geo || "-"}
                              </a>
                            </td>
                          </>
                        )}

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

          {/* <div className="flex justify-start items-start w-full mt-10">
            <Image
              src="https://www.offertrunk.com/images/banners/11.png"
              alt="Offer 1"
              width={500} 
              height={250} 
              className="w-[50%] h-auto"
              loading="lazy" 
            />
          </div> */}

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

        <div className="w-full lg:w-1/4 flex flex-col items-center gap-4">
          <Image
            src="/assets/2.jpg" // Leading slash for the path to the public folder
            alt="Offer Trunk Logo"
            className="rounded-md object-cover"
            width={200}
            height={150}
            loading="lazy"
          />

          <Image
            src="/assets/3.gif"
            alt="Offer Trunk Logo"
            className="rounded-md object-cover"
            width={200}
            height={150}
            loading="lazy"
          />
          <Image
            src="/assets/4.jpg"
            alt="Offer Trunk Logo"
            className="rounded-md object-cover"
            width={200}
            height={150}
            loading="lazy"
          />
          <Image
            src="/assets/5.jpg"
            alt="Offer Trunk Logo"
            className="rounded-md object-cover"
            width={200}
            height={150}
            loading="lazy"
          />
        </div>
      </div>
      <div className="text-center py-6 mt-10">
        {/* Logo Image Optimization */}
        <div className="flex justify-center">
          <Image
            src="/assets/offer-trunk-logo-1.png"
            alt="Offer Trunk Logo"
            className="h-auto"
            // loading="lazy"
            priority
            width={175}
            height={120}
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

      <Footer />
    </>
  );
};

export default DataTable;
