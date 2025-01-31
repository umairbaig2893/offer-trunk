import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    country: "",
    skype: "",
    telegram: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("https://api.offertrunk.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.errorCode === 0) {
        setMessage({
          type: "success",
          text: "Registration successful! Redirecting to OTP verification...",
        });

        // Store email in sessionStorage for OTP verification
        if (typeof window !== "undefined") {
          sessionStorage.setItem("verifyEmail", formData.email);
        }

        setTimeout(() => {
          router.push("/verify-otp"); // Redirect to OTP verification page
        }, 2000);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    }

    setLoading(false);
  };

  const handleGoogleSignUp = () => {
    window.location.href = "https://api.offertrunk.com/api/google-auth";
  };

  return (
    <>
      <Head>
        <title>Register | Offer Trunk</title>
        <meta
          name="description"
          content="Register for Offer Trunk and explore the best affiliate offers."
        />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create an Account
          </h2>

          {message && (
            <div
              className={`mt-4 p-3 text-center rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Email & Password */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Country & Skype */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Skype
                </label>
                <input
                  type="text"
                  name="skype"
                  value={formData.skype}
                  onChange={handleChange}
                  placeholder="Enter Skype ID"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Telegram */}
            <div>
              <label className="block text-gray-700 font-semibold">
                Telegram
              </label>
              <input
                type="text"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                placeholder="Enter Telegram ID"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "REGISTER"}
            </button>
          </form>

          {/* Google Sign-Up */}
          <div className="mt-4">
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center border py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <FcGoogle className="text-2xl mr-2" />
              <span className="text-gray-700 font-semibold">
                Sign up with Google
              </span>
            </button>
          </div>

          {/* Login Redirect */}
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login">
              <span className="text-blue-600 font-semibold cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
