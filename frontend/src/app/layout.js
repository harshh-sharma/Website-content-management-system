"use client";

import { Provider } from "react-redux";
import Navbar from "../components/Navbar";
import './globals.css';
import appStore from "@/store/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <Provider store={appStore}>
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
