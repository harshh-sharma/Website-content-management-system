"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-6">
      <header className="text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
          Welcome to the CMS
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Your ultimate tool for managing website content seamlessly.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
        {/* Card 1 */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300">
          <h2 className="text-xl font-bold mb-2 text-indigo-400">Manage Content</h2>
          <p className="text-gray-400">
            Create, update, and organize your website&apos;s content effortlessly.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300">
          <h2 className="text-xl font-bold mb-2 text-purple-400">Analytics</h2>
          <p className="text-gray-400">
            Gain insights into your website&apos;s performance and audience.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300">
          <h2 className="text-xl font-bold mb-2 text-teal-400">Custom Themes</h2>
          <p className="text-gray-400">
            Personalize your website&apos;s look and feel with ease.
          </p>
        </div>
      </div>

      <footer className="mt-16 text-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} CMS System. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
