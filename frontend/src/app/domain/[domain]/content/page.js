"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addContent, getAllContentsRelatedToDomain, updateContent } from '../../../../store/slices/contentSlice';
import Card from '../../../../components/ContentCard';
import toast from 'react-hot-toast';

function Contents() {
  const { domain } = useParams();
  const dispatch = useDispatch();

  const contentLists = useSelector((store) => store.contents.contents);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [contentData, setContentData] = useState({
    title: '',
    content: '',
    image: '',
  });

  const [previewImage, setPreviewImage] = useState(null);

  const loadContents = async () => {
    await dispatch(getAllContentsRelatedToDomain(domain));
  };

  useEffect(() => {
    loadContents();
  }, []);

  const handleAddContent = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setContentData({
      title: '',
      content: '',
      image: '',
    });
    setPreviewImage(null);
  };

  const getUserImage = (e) => {
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      setContentData({
        ...contentData,
        image: uploadImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.onload = () => {
        setPreviewImage(fileReader.result);
      };
    }
  };

  const formValidation = (title, content) => {
    if (title?.length === 0) return false;
    if (content?.length === 0) return false;
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { title, content, image } = contentData;

    if (formValidation(title, content)) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);
      formData.append('type', 'blog');
      formData.append('websiteId', domain);

      await dispatch(addContent(formData));
      loadContents();
      handleModalClose();
    }
  };


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [editContentData, setEditContentData] = useState({
  title: "",
  content: "",
  image: "",
  contentId: "",
});

const handleEditClick = (contentData) => {
  setEditContentData(contentData); // Pre-fill the content data in the modal
  setIsEditModalOpen(true); // Open the modal
};

const handleEditFormSubmit = async (e,contentId) => {
  e.preventDefault();
  console.log("editcontData",editContentData);
  if(editContentData?.title?.length == 0){
    toast.error('Title not be empty');
    return;
  }
  if(editContentData?.content?.length == 0){
    toast.error('Content not be empty');
    return;
  }
  
 const response = await dispatch(updateContent({contentId,editContentData}));
 console.log("updatingResponse",response);
 await dispatch(getAllContentsRelatedToDomain(domain));
 setIsEditModalOpen(!isEditModalOpen);
}


  return (
    <div className="relative flex flex-col gap-5 p-6 min-h-screen bg-gray-900 text-white">
      {/* Content List */}
      <div className="flex flex-wrap gap-5 justify-center">
        {contentLists?.length > 0 ? (
          contentLists.map((item) => (
            <Card
              key={item?._id}
              content={item?.content}
              title={item?.title}
              image={item?.contentImage?.secure_url}
              contentId={item?._id}
              domainId={domain}
              onEditClick={(contentData) => handleEditClick(contentData)} // Pass handler
            />
          ))
        ) : (
          <h1 className="text-gray-500 font-semibold">There is No Content</h1>
        )}
      </div>

      {/* Add Content Button */}
      <button
        onClick={handleAddContent}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700"
      >
        <span className="text-2xl font-bold">+</span>
      </button>

      {isEditModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-gray-800 text-white p-6 rounded-md shadow-lg w-[400px]">
      <h2 className="text-lg font-semibold mb-4">Edit Content</h2>
      <form
        onSubmit={(e) => handleEditFormSubmit(e, editContentData.contentId)}
        className="flex flex-col gap-4"
      >
        {/* Image Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          {editContentData.image ? (
            <img
              src={editContentData.image}
              alt="Preview"
              className="w-full h-[150px] rounded mb-2"
            />
          ) : (
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.svg"
              onChange={(e) =>
                setEditContentData({
                  ...editContentData,
                  image: e.target.files[0],
                })
              }
              className="w-full p-2 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
        </div>

        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={editContentData.title}
            onChange={(e) =>
              setEditContentData({ ...editContentData, title: e.target.value })
            }
            className="w-full p-2 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter title"
          />
        </div>

        {/* Content Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            value={editContentData.content}
            onChange={(e) =>
              setEditContentData({
                ...editContentData,
                content: e.target.value,
              })
            }
            className="w-full p-2 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            placeholder="Enter content"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsEditModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Modal for Adding Content */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 text-white p-6 rounded-md shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Add Content</h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              {/* Image Input */}
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full rounded mb-2" />
                ) : (
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.svg"
                    onChange={getUserImage}
                    className="w-full p-2 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={contentData.title}
                  onChange={(e) => setContentData({ ...contentData, title: e.target.value })}
                  className="w-full p-2 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter title"
                />
              </div>

              {/* Content Input */}
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  value={contentData.content}
                  onChange={(e) => setContentData({ ...contentData, content: e.target.value })}
                  className="w-full p-2 bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="4"
                  placeholder="Enter content"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contents;
