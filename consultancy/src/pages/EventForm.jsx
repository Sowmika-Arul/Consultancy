import { useState } from "react";

const EventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    if (!image) return null;
    
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "School_Events"); 
    
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dvpdotfev/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const imageUrl = await handleImageUpload();
    if (!imageUrl) {
      setLoading(false);
      return;
    }
    
    const eventData = { title, description, imageUrl };
    
    try {
      await fetch("https://consultancy-sea9.onrender.com/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      alert("Event added successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error adding event", error);
    }
    
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-6 mt-10">
        <h2 className="text-2xl font-bold text-center text-gray-700">Add School Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Event Description"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="file"
            className="w-full p-3 border rounded-lg bg-gray-50 cursor-pointer"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition duration-300"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
