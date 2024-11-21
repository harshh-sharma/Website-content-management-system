import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getAllDomains, updateDomain } from "../store/slices/domainSlice"

const Card = ({ websiteName, domain, domainId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newWebsiteName, setNewWebsiteName] = useState(websiteName);
  const [newDomain, setNewDomain] = useState(domain);
  const dispatch = useDispatch();

  const handleEditValidation = (name,domain) => {
    if(newWebsiteName?.length == 0){
        return false;
    }

    if(newDomain?.length == 0){
        return false;
    }

    return true;
  }

  const handleSave = async (e) => {
    e.stopPropagation(); 
    if(handleEditValidation(newWebsiteName,newDomain)){
        const data = {
            name:newWebsiteName,
            domain:newDomain
        }
        await dispatch(updateDomain({ domainId, data }));
        await dispatch(getAllDomains());

    }
    setIsEditing(false); 
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  return (
    <div
      className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300 cursor-pointer h-[200px] w-[300px]"
      onClick={(e) => e.stopPropagation()}
    >
      {!isEditing ? (
        <Link href={`/domain/${domainId}/content`} passHref>
          <div className="mb-4">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2 text-indigo-400">{websiteName}</h2>
                <p className="text-gray-400">{domain}</p>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        // Editable Mode
        <div>
          {/* Editable Fields */}
          <input
            type="text"
            value={newWebsiteName}
            onChange={(e) => setNewWebsiteName(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Edit website name"
          />
          <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Edit domain"
          />
          <div className="flex justify-between">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Button */}
      {!isEditing && (
        <button
          onClick={handleEditClick}
          className="mt-4 bg-yellow-400 text-white px-6 font-semibold py-1 rounded hover:bg-yellow-500"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default Card;
