"use client";

import { addWebsite } from "../../../store/slices/domainSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const vallidateData = () => {
    if(formData?.name?.length == 0) return false;
    if(formData?.domain?.length == 0) return false;
    return true;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(vallidateData()){
        await dispatch(addWebsite(formData));
        router.push('/websites');
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400 text-center">Add Website</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-400" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter website name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-400" htmlFor="domain">
              Domain
            </label>
            <input
              type="text"
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter website domain"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
