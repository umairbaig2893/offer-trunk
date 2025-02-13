import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Footer from "@/components/Footer/Footer";

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const response = await fetch(`https://api.offertrunk.com/api/getNetworks`);

    if (!response.ok) {
      return { notFound: true };
    }

    const result = await response.json();

    if (!result?.data || !Array.isArray(result.data)) {
      return { notFound: true };
    }

    const networks = result.data;
    const network = networks.find((item) => {
      const itemSlug = item.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
      return itemSlug === slug;
    });

    if (!network) {
      return { notFound: true };
    }

    const otherNetworks = networks.filter((item) => item.name !== network.name);

    return { props: { network, otherNetworks } };
  } catch (error) {
    console.error("❌ Error fetching network details:", error);
    return { notFound: true };
  }
}

const NetworkDetails = ({ network, otherNetworks }) => {
  const router = useRouter();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  if (router.isFallback) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (!network) {
    return (
      <div className="text-center text-lg p-6">
        <h2 className="text-red-600 font-bold">Network Not Found</h2>
        <p className="text-gray-600">
          The requested network could not be found.
        </p>
        <Link href="/" className="text-blue-600 underline">
          Go Back to Networks
        </Link>
      </div>
    );
  }
  const totalPages = Math.ceil(otherNetworks.length / itemsPerPage);
  const paginatedNetworks = otherNetworks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const handleReadReview = () => {
    router.push(`/network/review/${encodeURIComponent(network.name)}`);
  };

  return (
    <>
      <Head>
        <title>{network?.name || "Network Details"}</title>
        <meta
          name="description"
          content={network?.description || "Network details page"}
        />
      </Head>

      <div className="min-h-screen  p-6">
        {/* Breadcrumb Navigation */}
        <div className="text-gray-600 text-sm mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          /
          <Link href="/" className="hover:underline">
            {" "}
            Networks
          </Link>{" "}
          /<span className="font-semibold">{network?.name || "Unknown"}</span>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            {network?.img ? (
              <Image
                src={`https://api.offertrunk.com/images/networks/${network.img}`}
                alt={network?.name || "Network Image"}
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
                {network?.name || "Unknown Network"}
              </h1>
              {network?.url ? (
                <a
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  {network.url}
                </a>
              ) : (
                <p className="text-gray-500">No website available</p>
              )}
            </div>
          </div>
          <div className="review-section">
            <button
              onClick={handleReadReview}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Read Review
            </button>
          </div>
        </div>

        {/* Network Information Section */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-semibold text-gray-600">Description</p>
              <p className="text-gray-800">
                {network?.description || "No description available"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Offer Count</p>
              <p className="text-gray-800">{network?.offer_count || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Website</p>
              {network?.url ? (
                <a
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {network.url}
                </a>
              ) : (
                <p className="text-gray-500">No website available</p>
              )}
            </div>
          </div>
        </div>

        {/* Other Networks Table */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Other Networks
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl border-collapse border border-gray-300 sm:w-full">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Offer Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedNetworks.map((item, index) => (
                  <tr
                    key={index}
                    className="border border-gray-300 text-center"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      <Link
                        href={`/network/${item.name
                          .toLowerCase()
                          .trim()
                          .replace(/\s+/g, "-")
                          .replace(/[^\w-]+/g, "")}`}
                      >
                        <div className="flex items-center space-x-2">
                          {item.img && (
                            <Image
                              src={`https://api.offertrunk.com/images/networks/${item.img}`}
                              alt={item.name}
                              width={50}
                              height={50}
                              className="rounded-md"
                            />
                          )}
                          <span className="text-blue-600 hover:underline">
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.description || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.offer_count || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className="flex justify-start items-center space-x-2 mt-4">
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
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default NetworkDetails;
