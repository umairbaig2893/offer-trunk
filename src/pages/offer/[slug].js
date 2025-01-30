import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const response = await fetch(`https://api.offertrunk.com/api/getOffers`);

    if (!response.ok) {
      return { notFound: true };
    }

    const result = await response.json();

    const offer = result.data.find((item) => {
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

    return { props: { offer } };
  } catch (error) {
    return { notFound: true };
  }
}

const OfferDetails = ({ offer }) => {
  const router = useRouter();
  if (router.isFallback)
    return <p className="text-center text-lg">Loading...</p>;

  return (
    <>
      <Head>
        <title>{offer?.name || "Offer Details"}</title>
        <meta
          name="description"
          content={offer?.description || "Offer details"}
        />
      </Head>

      {/* Background Gradient */}
      <div className="min-h-screen bg-gradient-to-r from-[#FAF0E6] to-[#D4E4F7] p-6">
        {/* Breadcrumb Navigation */}
        <div className="text-gray-600 text-sm mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          /
          <Link href="/" className="hover:underline">
            {" "}
            Offer
          </Link>{" "}
          /<span className="font-semibold">{offer?.name}</span>
        </div>

        {/* Offer Header Section */}
        <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md">
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

        {/* Offer Description Section (New Row) */}
        {/* <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 text-sm">
            <div>
              <p className="font-semibold text-gray-600">Offer Description</p>
              <p className="text-gray-800">
                {offer?.description || "No description available."}
              </p>
            </div>
          </div>
        </div> */}

        {/* Offer Information Section */}
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

        {/* Network Description Section */}
        {offer?.network_description && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-lg font-semibold text-gray-700">
              {offer?.network_description}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default OfferDetails;
