import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {getAllDomains, updateDomain } from "../store/slices/domainSlice";
import { deleteContent, getAllContentsRelatedToDomain } from '../store/slices/contentSlice';
import { useRouter } from "next/navigation";

const Card = ({ title, image, content, contentId,domainId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    await dispatch(deleteContent(contentId));
    await dispatch(getAllContentsRelatedToDomain(domainId));
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleSaveClick = async (e) => {
    e.stopPropagation();
    // Call update logic here
    if (newTitle && newContent) {
      await dispatch(updateContent({ contentId, data: { title: newTitle, content: newContent } }));
      await dispatch(getAllDomains());
    }
    setIsEditing(false);
  };

  return (
    <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      {/* Edit Button */}
      <button
        onClick={handleEditClick}
        className="absolute top-2 right-10 bg-transparent text-white p-2 rounded-full hover:bg-yellow-700 flex items-center justify-center"
        title="Edit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 3.172a4.01 4.01 0 00-5.656 5.656L12 10.828l5.656-5.656a4.01 4.01 0 00-5.656-5.656z"
          />
        </svg>
      </button>

      {/* Cross (Delete) Button */}
      <button
        onClick={handleDeleteClick}
        className="absolute top-2 right-2 bg-transparent text-white p-2 rounded-full hover:bg-red-700 flex items-center justify-center"
        title="Delete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Image */}
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-indigo-400 mb-4">{title}</h3>
        <p className="text-gray-400">{content}</p>
      </div>

      {/* Edit Modal / Form */}
      {isEditing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 text-white p-6 rounded-md shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Edit Content</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              placeholder="Title"
            />
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full p-2 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              placeholder="Content"
            ></textarea>
            <div className="flex justify-between">
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
