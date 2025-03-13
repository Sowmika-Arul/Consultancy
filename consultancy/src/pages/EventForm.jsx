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
    formData.append("upload_preset", "School_Events"); // Set this in Cloudinary
    
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
      await fetch("http://localhost:5000/events", {
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
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Add School Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Event Description"
          className="w-full p-2 border rounded mt-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="file"
          className="w-full p-2 border rounded mt-2"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-2"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
