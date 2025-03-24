import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import {
  FaAngleLeft,
  FaAngleRight,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function MaxBountyOfferDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [offer, setOffer] = useState(null);
  const [relatedOffers, setRelatedOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchOffer = async () => {
      try {
        const res = await fetch(
          `http://localhost:3008/user/get/max/offerBy/${slug}`
        );
        if (!res.ok) {
          setNotFound(true);
          return;
        }

        const data = await res.json();
        setOffer(data.offer);
        setRelatedOffers(data.relatedOffers || []);
      } catch (error) {
        console.error("Error fetching offer:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [slug]);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (notFound) {
    return <div className="p-4 text-center">Offer not found.</div>;
  }

  return (
    <>
      <Head>
        <title>{offer?.name || "MaxBounty Offer Detail"}</title>
        <meta
          name="description"
          content={offer?.description || "MaxBounty offer details"}
        />
      </Head>

      <div className="min-h-screen p-6">
        {/* BREADCRUMB */}
        <div className="text-gray-600 text-sm mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/?tab=offers" className="hover:underline">
            MaxBounty Offers
          </Link>{" "}
          / <span className="font-semibold">{offer.name}</span>
        </div>

        {/* OFFER HEADER */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            {offer?.img && (
              <Image
                src={
                  offer.img.startsWith("https://")
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

        {/* MAIN INFO */}
        <div className="mt-6 bg-white p-6 rounded-md shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
        </div>

        {/* RELATED OFFERS */}
        {relatedOffers.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-md shadow-md">
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
                    <th className="p-3 text-left border border-gray-200">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {relatedOffers.map((rel) => (
                    <tr key={rel.id} className="hover:bg-gray-50">
                      <td className="p-3 border border-gray-200">
                        <Link
                          href={`/maxbounty/${rel.slug}`}
                          className="text-blue-600 hover:underline"
                        >
                          {rel.name}
                        </Link>
                      </td>
                      <td className="p-3 border border-gray-200">
                        ${rel.payout || 0}
                      </td>
                      <td className="p-3 border border-gray-200">
                        {rel.geo || "-"}
                      </td>
                      <td className="p-3 border border-gray-200">
                        {rel.offer_link ? (
                          <a
                            href={rel.offer_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline break-all"
                          >
                            Offer Link
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FOOTER AREA */}
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
      </div>
    </>
  );
}

// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import Head from "next/head";

// export default function OfferDetailPage() {
//   const router = useRouter();
//   const { slug } = router.query;
//   const [offer, setOffer] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     if (!slug) return;

//     const fetchOffer = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:3008/user/get/max/offerBy/${slug}`
//         );
//         if (!res.ok) {
//           setNotFound(true);
//           return;
//         }

//         const data = await res.json();
//         setOffer(data.offer);
//       } catch (error) {
//         console.error("Error fetching offer:", error);
//         setNotFound(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOffer();
//   }, [slug]);

//   if (loading) return <p>Loading...</p>;
//   if (notFound) return <p>404 - Offer Not Found</p>;

//   return (
//     <>
//       <Head>
//         <title>{offer?.name || "Offer Detail"}</title>
//         <meta
//           name="description"
//           content={offer?.description || "Offer details"}
//         />
//       </Head>
//       <div>
//         <h1>{offer.name}</h1>
//         <p>{offer.description}</p>
//       </div>
//     </>
//   );
// }
