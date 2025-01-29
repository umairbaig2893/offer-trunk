import { useRouter } from "next/router";
import Image from "next/image";

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(
      `https://api.offertrunk.com/api/getOffers/${params.slug}`
    );

    if (!res.ok) return { notFound: true };

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return { notFound: true };
    }

    const data = await res.json();

    // Find the specific offer by slugified name
    const offer = data.data.find(
      (item) => item.name.toLowerCase().replace(/ /g, "") === params.slug
    );

    if (!offer) return { notFound: true };

    return {
      props: { offer },
    };
  } catch (error) {
    return { notFound: true };
  }
}

const OfferDetails = ({ offer }) => {
  const router = useRouter();
  if (router.isFallback) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{offer?.name}</h1>
      <Image
        src={`https://api.offertrunk.com/images/${offer?.img}`}
        alt={offer?.name || "Offer image"}
        width={300}
        height={200}
        className="rounded-lg my-4"
      />
      <p className="text-lg">
        {offer?.description || "No description available."}
      </p>
      <div className="mt-4">
        <span className="font-semibold">Payout:</span> ${offer?.payout}
      </div>
      <div className="mt-2">
        <span className="font-semibold">Network:</span> {offer?.network_name}
      </div>
      <div className="mt-2">
        <span className="font-semibold">Countries:</span> {offer?.geo || "-"}
      </div>
    </div>
  );
};

export default OfferDetails;
