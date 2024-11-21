'use client';
import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("content");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            CMS Dashboard
          </h1>
          <Link
            href="/login"
            className="text-indigo-400 hover:underline text-lg"
          >
            Logout
          </Link>
        </div>

        {/* Tabs Navigation */}
        <div className="flex mb-6">
          <button
            className={`${
              activeTab === "content"
                ? "bg-indigo-500 text-gray-900"
                : "bg-gray-700 text-gray-400"
            } py-2 px-6 rounded-t-lg font-semibold hover:bg-indigo-600 transition duration-300`}
            onClick={() => setActiveTab("content")}
          >
            Content
          </button>
          <button
            className={`${
              activeTab === "analytics"
                ? "bg-indigo-500 text-gray-900"
                : "bg-gray-700 text-gray-400"
            } py-2 px-6 rounded-t-lg font-semibold hover:bg-indigo-600 transition duration-300`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
          <button
            className={`${
              activeTab === "themes"
                ? "bg-indigo-500 text-gray-900"
                : "bg-gray-700 text-gray-400"
            } py-2 px-6 rounded-t-lg font-semibold hover:bg-indigo-600 transition duration-300`}
            onClick={() => setActiveTab("themes")}
          >
            Themes
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "content" && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-indigo-400">
              Manage Content
            </h2>
            <p className="text-gray-400">
              Create, update, and organize your website's content seamlessly.
            </p>
            <Link
              href="/content"
              className="mt-6 inline-block py-2 px-4 bg-indigo-500 text-gray-900 rounded-md hover:bg-indigo-600 transition duration-300"
            >
              Go to Content Manager
            </Link>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">
              Analytics
            </h2>
            <p className="text-gray-400">
              Gain insights into your website's performance and audience.
            </p>
            <Link
              href="/analytics"
              className="mt-6 inline-block py-2 px-4 bg-purple-500 text-gray-900 rounded-md hover:bg-purple-600 transition duration-300"
            >
              Go to Analytics Dashboard
            </Link>
          </div>
        )}

        {activeTab === "themes" && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-teal-400">
              Custom Themes
            </h2>
            <p className="text-gray-400">
              Personalize your website's look and feel with ease.
            </p>
            <Link
              href="/themes"
              className="mt-6 inline-block py-2 px-4 bg-teal-500 text-gray-900 rounded-md hover:bg-teal-600 transition duration-300"
            >
              Go to Themes Manager
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
