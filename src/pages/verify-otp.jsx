"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function VerifyOtp() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("verifyEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        router.push("/register");
      }
    }
  }, [router]);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (otp.trim() === "") {
      setMessage({
        type: "error",
        text: "Please enter the OTP.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://api.offertrunk.com/api/verifyUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, email }),
        }
      );

      const data = await response.json();

      if (data.errorCode === 0) {
        setMessage({
          type: "success",
          text: "OTP verified successfully! Redirecting to login...",
        });

        if (typeof window !== "undefined") {
          sessionStorage.removeItem("verifyEmail");
        }

        setTimeout(() => {
          router.push("panel.offertrunk.com");
        }, 2000);
      } else {
        setMessage({
          type: "error",
          text: data.message || "OTP verification failed. Please try again.",
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

  const handleResendOtp = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("https://api.offertrunk.com/api/resendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.errorCode === 0) {
        setMessage({
          type: "success",
          text: "OTP has been resent to your email.",
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to resend OTP. Please try again.",
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
        <title>Verify OTP | Offer Trunk</title>
        <meta
          name="description"
          content="Verify your account using the OTP sent to your email."
        />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            OTP Verification
          </h2>

          <p className="mt-2 text-center text-gray-600">
            Enter the OTP sent to <strong>{email}</strong>
          </p>

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
            {/* OTP Input */}
            <div>
              <label className="block text-gray-700 font-semibold">
                One-Time Password (OTP)
              </label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
              disabled={loading}
            >
              {loading ? "Verifying..." : "VERIFY OTP"}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-4 text-center">
            <button
              onClick={handleResendOtp}
              className="text-blue-600 hover:underline"
              disabled={loading}
            >
              Resend OTP
            </button>
          </div>

          {/* Back to Registration (Optional) */}
          <p className="mt-4 text-center text-gray-600">
            Didn't receive the OTP?{" "}
            <Link href="/register">
              <span className="text-blue-600 font-semibold cursor-pointer">
                Register Again
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
