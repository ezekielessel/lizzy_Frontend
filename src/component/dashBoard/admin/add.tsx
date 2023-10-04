import React, { useState, useRef } from "react";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify"; // Import toast
import FetchData from "./fetch_table";

const baseURL = "http://localhost:3000";

const api = axios.create({
  baseURL,
});

const AddContent: React.FC = () => {
  const [text, setText] = useState("");
  const [textDescription, setTextDescription] = useState("");
  const [pdfData, setPdfData] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleTextDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextDescription(e.target.value);
  };

  const handlePdfDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPdfData(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    formData.append("text_description", textDescription);
    if (pdfData) {
      formData.append("pdfData", pdfData);
    }

    try {
      const response = await api.post("/auth/add_data", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Data inserted successfully:", response.data);
      toast.success("Successful Added", {
        position: toast.POSITION.TOP_CENTER,autoClose: 1000, hideProgressBar:true
      });
      // Reset the form
      setText("");
      setTextDescription("");
      setPdfData(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      toast.error("Adding Data Failed", {
        position: toast.POSITION.TOP_CENTER,autoClose: 1000, hideProgressBar:true
      });
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Add Information</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 p-2 w-3/5 rounded-md border-gray-300 focus:ring focus:ring-indigo-200"
            value={text}
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Title Desc
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-3/5 rounded-md border-gray-300 focus:ring focus:ring-indigo-200"
            value={textDescription}
            onChange={handleTextDescriptionChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            PDF Upload
          </label>
          <input
            type="file"
            accept=".pdf"
            className="mt-1 w-full border-gray-300 focus:ring focus:ring-indigo-200"
            onChange={handlePdfDataChange}
            ref={inputRef}
          />
          {/*  {image && (
          <img
            src={image}
            alt="Uploaded"
            className="mt-2 max-w-xs mx-auto h-13 w-full"
          />
        )} */}
        </div>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
          Add to Table
        </button>
      </form>
      <div className="mt-4">
        <FetchData />
      </div>
    </div>
  );
};

export default AddContent;
