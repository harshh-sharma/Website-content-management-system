const Card = ({ title, image, content }) => {
    image = 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600'
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-bold text-indigo-400 mb-4">{title}</h3>
          <p className="text-gray-400">{content}</p>
        </div>
      </div>
    );
  };

export default Card;