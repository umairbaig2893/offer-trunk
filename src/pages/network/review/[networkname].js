import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Footer from "@/components/Footer/Footer";

export async function getServerSideProps(context) {
  const { networkname } = context.params;

  try {
    const res = await fetch(`https://api.offertrunk.com/api/getNetworks`);
    const result = await res.json();

    const network = result.data.find(
      (item) => item.name.toLowerCase() === networkname.toLowerCase()
    );

    if (!network) return { notFound: true };

    return { props: { network } };
  } catch (error) {
    console.error("Error fetching review:", error);
    return { notFound: true };
  }
}

const ReviewPage = ({ network }) => {
  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-6">
            <h1 className="text-3xl font-bold mb-4">{network.review_title}</h1>

            {network.img && (
              <Image
                src={`https://api.offertrunk.com/images/${network.img}`}
                alt={network.name}
                width={150}
                height={150}
                className="rounded-lg"
              />
            )}

            <div
              className="prose mt-4"
              dangerouslySetInnerHTML={{ __html: network.review_content }}
            ></div>
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
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
