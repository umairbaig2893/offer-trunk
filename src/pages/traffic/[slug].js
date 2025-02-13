import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Footer from "@/components/Footer/Footer";

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const page = context.query.page ? parseInt(context.query.page, 10) : 1;
  const itemsPerPage = 5;

  try {
    const response = await fetch(
      `https://api.offertrunk.com/api/getTrafficSources`
    );
    if (!response.ok) {
      return { notFound: true };
    }

    const result = await response.json();

    if (!result?.data || !Array.isArray(result.data)) {
      return { notFound: true };
    }

    const traffic = result.data.find((item) => {
      const itemSlug = item.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
      return itemSlug === slug;
    });

    if (!traffic) {
      return { notFound: true };
    }

    const totalTrafficSources = result.data.length;
    const totalPages = Math.ceil(totalTrafficSources / itemsPerPage);
    const paginatedTrafficSources = result.data.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    return {
      props: {
        traffic,
        paginatedTrafficSources,
        totalPages,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("❌ Error fetching traffic source details:", error);
    return { notFound: true };
  }
}

const TrafficDetails = ({
  traffic,
  paginatedTrafficSources,
  totalPages,
  currentPage,
}) => {
  const router = useRouter();

  const goToPage = (page) => {
    router.push(
      `/traffic/${traffic.name.toLowerCase().replace(/\s+/g, "-")}?page=${page}`
    );
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <Head>
        <title>{traffic?.name || "Traffic Details"}</title>
        <meta
          name="description"
          content={traffic?.description || "Traffic details page"}
        />
      </Head>

      {/* Background Gradient */}
      <div className="min-h-screen  p-6">
        {/* Breadcrumb Navigation */}
        <div className="text-gray-600 text-sm mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          /
          <Link href="/" className="hover:underline">
            {" "}
            Traffic Sources
          </Link>{" "}
          /<span className="font-semibold">{traffic?.name || "Unknown"}</span>
        </div>

        {/* Traffic Header Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            {/* Traffic Image */}
            {traffic?.img ? (
              <Image
                src={`https://api.offertrunk.com/images/traffic/${traffic.img}`}
                alt={traffic?.name || "Traffic Image"}
                width={100}
                height={100}
                className="rounded-lg"
              />
            ) : (
              <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-600">No Image</span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {traffic?.name || "Unknown Traffic Source"}
              </h1>
              {traffic?.url ? (
                <a
                  href={traffic.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  {traffic.url}
                </a>
              ) : (
                <p className="text-gray-500">No website available</p>
              )}
            </div>
          </div>
        </div>

        {/* Traffic Information Section */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-semibold text-gray-600">Description</p>
              <p className="text-gray-800">
                {traffic?.description || "No description available"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Type</p>
              <p className="text-gray-800">{traffic?.type || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Mobile</p>
              <p className="text-gray-800">
                {traffic?.mobile === 1 ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Desktop</p>
              <p className="text-gray-800">
                {traffic?.desktop === 1 ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Retargeting</p>
              <p className="text-gray-800">
                {traffic?.retargeting === 1 ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        {/* Traffic Sources Table */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Other Traffic Sources
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl border-collapse border border-gray-300 sm:w-full">
              <thead>
                <tr className="bg-[#0a64bc] text-white">
                  <th className="border border-gray-300 p-2 text-left">NAME</th>
                  <th className="border border-gray-300 p-2 text-left">TYPE</th>
                  <th className="border border-gray-300 p-2 text-left">
                    WEBSITE
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedTrafficSources.map((trafficSource, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-blue-100"
                    } text-gray-900`}
                  >
                    <td className="border border-gray-300 p-2 flex items-center space-x-2">
                      {trafficSource.img && (
                        <Image
                          src={`https://api.offertrunk.com/images/traffic/${trafficSource.img}`}
                          alt={trafficSource.name}
                          width={50}
                          height={50}
                          className="rounded-lg"
                        />
                      )}
                      <Link
                        href={`/traffic/${trafficSource.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/[^\w-]+/g, "")}`}
                        legacyBehavior
                      >
                        <a className="hover:underline">{trafficSource.name}</a>
                      </Link>
                    </td>
                    <td className="border border-gray-300 p-2">
                      {trafficSource.type || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {trafficSource.url ? (
                        <a
                          href={trafficSource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Visit
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
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
        </div>
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
        {/* <div>
          <Footer />
        </div> */}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default TrafficDetails;
