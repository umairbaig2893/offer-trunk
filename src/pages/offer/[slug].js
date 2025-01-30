import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { slug } = context.params;
  console.log("Fetching offers for slug:", slug);

  try {
    const response = await fetch(`https://api.offertrunk.com/api/getOffers`);

    if (!response.ok) {
      console.error("API response not OK");
      return { notFound: true };
    }

    const result = await response.json();
    console.log("API result:", result);

    // Find offer by slug in the array
    const offer = result.data.find((item) => {
      const itemSlug = item.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
      return itemSlug === slug;
    });

    if (!offer) {
      console.error("No offer found with matching slug");
      return { notFound: true };
    }

    return { props: { offer } };
  } catch (error) {
    console.error("Error fetching offers:", error);
    return { notFound: true };
  }
}

const OfferDetails = ({ offer }) => {
  const router = useRouter();

  if (router.isFallback) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>{offer?.name || "Offer Details"}</title>
        <meta
          name="description"
          content={offer?.description || "Offer details"}
        />
      </Head>

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">{offer?.name}</h1>

        {offer?.img && (
          <Image
            src={`https://api.offertrunk.com/images/${offer?.img}`}
            alt={offer?.name || "Offer image"}
            width={300}
            height={200}
            className="rounded-lg my-4"
            priority
          />
        )}

        <p className="text-lg">
          {offer?.description || "No description available."}
        </p>

        <div className="mt-4">
          <span className="font-semibold">Payout:</span> ${offer?.payout}
        </div>
        <div className="mt-2">
          <span className="font-semibold">Network:</span>{" "}
          {offer?.network_name || "-"}
        </div>
        <div className="mt-2">
          <span className="font-semibold">Countries:</span> {offer?.geo || "-"}
        </div>

        <div className="mt-6">
          <a
            href={offer?.offer_link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Visit Offer
          </a>
        </div>
      </div>
    </>
  );
};

export default OfferDetails;
