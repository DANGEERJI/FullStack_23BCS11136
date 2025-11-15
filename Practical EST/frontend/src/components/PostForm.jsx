import React, { useState } from "react";
import axios from "axios";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccess(false);

  try {
    const response = await axios.post("http://localhost:8080/posts", {
      title,
      body,
    });

    if (response.status === 201) {
      console.log("201 - Post created successfully!");
    }

    setSuccess(true);
    setTitle("");
    setBody("");

  } catch (err) {
    console.error("Error:", err);
  }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-gray-900 rounded-xl shadow-lg border border-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">
        Create Post
      </h2>

      {success && (
        <p className="mb-4 text-green-400 font-medium text-center bg-gray-800 py-2 rounded-lg border border-gray-700">
          Post submitted successfully!
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block mb-2 font-medium text-gray-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="Enter title"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-300">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-200 h-32 resize-none placeholder-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="Enter body"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
