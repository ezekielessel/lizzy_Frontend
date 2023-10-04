import React from "react";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify"; // Import toast
import { useState } from "react";

const baseURL = "http://localhost:3000";

const api = axios.create({
  baseURL,
});

const EmailContent: React.FC = () => {
  const [email_address, setAddress] = useState("");
  const [email_message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email_address === "" || email_message === "") {
      toast.error("Input Field Required.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      const response = await api.post("/auth/add_email", {
        email_address,
        email_message,
      }); // Use Axios

      if (response.status === 201) {
        toast.success("Email Sent Successful", {
          position: toast.POSITION.TOP_CENTER,autoClose: 1000, hideProgressBar: true
        });
      } else {
        toast.success("Email Failed", {
          position: toast.POSITION.TOP_CENTER,autoClose: 1000, hideProgressBar: true
        });
      }

      setAddress("");
      setMessage("");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.success("Email Failed", {
        position: toast.POSITION.TOP_CENTER, autoClose: 1000, hideProgressBar:true
      });
    }
  };

  return (
    <div>
      <div className=" align-center p-4 ">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-bold" htmlFor="username">
              From
            </label>
            <input
              type="email"
              id="email"
              value={email_address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="name.email@company.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold" htmlFor="email">
              To
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md bg-white text-black"
              placeholder="kwame.email@company.com"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              value={email_message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded-md resize-none"
              rows={4}
              required
            ></textarea>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailContent;
