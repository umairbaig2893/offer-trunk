import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar/Navbar";

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

  return (
    <>
      <Head>
        <title>Register | Offer Trunk</title>
        <meta
          name="description"
          content="Register for Offer Trunk and explore the best affiliate offers."
        />
      </Head>

      <div>
        <Navbar />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          {/* Message */}
          {message && (
            <div
              className={`p-3 mb-6 text-center rounded-lg text-sm ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg  hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          {/* Google Sign-Up */}
          {/* <div>
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center border py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <FcGoogle className="text-2xl mr-2" />
              <span className="text-gray-700 font-semibold">
                Sign in with Google
              </span>
            </button>
          </div> */}

          {/* Register Link */}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register">
              <span className="text-blue-500 font-semibold hover:underline cursor-pointer">
                Register
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
