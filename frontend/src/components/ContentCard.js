import { useDispatch } from "react-redux";
import { deleteContent, getAllContentsRelatedToDomain } from "../store/slices/contentSlice";
import { CiEdit } from "react-icons/ci";

const Card = ({ title, image, content, contentId, domain, onEditClick }) => {
  const dispatch = useDispatch();

  const dummyImage =
    "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600";

  const handleDeleteClick = async (e) => {
    e.stopPropagation(); // Prevent event bubbling
    await dispatch(deleteContent(contentId));
    await dispatch(getAllContentsRelatedToDomain(domain)); // Refetch updated content
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    onEditClick({ title, image, content, contentId }); // Pass the current content data to the parent
  };

  return (
    <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      {/* Edit Button */}
      <button
        onClick={handleEditClick}
        className="absolute top-2 right-10 bg-transparent text-white p-2 rounded-full hover:bg-yellow-500 flex items-center justify-center"
        title="Edit"
      >
        <CiEdit/>
      </button>

      {/* Delete Button */}
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
      <img
        src={image ? image : dummyImage}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-indigo-400 mb-4">{title}</h3>
        <p className="text-gray-400">{content}</p>
      </div>
    </div>
  );
};

export default Card;
