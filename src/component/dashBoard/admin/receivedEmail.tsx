import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast

const baseURL = "https://lizzy-backend.onrender.com";

const api = axios.create({
  baseURL,
});

interface EmailData {
  id: number;
  emailAddress: string;
  emailMessage: string;
}

const EmailContent: React.FC = () => {
  const [tableData, setTableData] = useState<EmailData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await api.get<EmailData[]>("/auth/fetch_email"); // Adjust the route URL as needed
      setTableData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleDelete(id: number) {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this item?"
      );

      if (confirm) {
        await api.delete(`/auth/delete_email/${id}`);
        setTableData((prevData) => prevData.filter((item) => item.id !== id));
        toast.success("Item deleted successfully!", { position: "top-center", autoClose: 1000, hideProgressBar:true});
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border">
          <tr>
            <th className="px-4 py-2">Number</th>
            <th className="px-4 py-2">Email Address</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{index + 1}</td>

              <td className="px-4 py-2">{row.emailAddress}</td>
              <td>{row.emailMessage}</td>

              <td className="px-4 py-2">
                <button
                  className="text-blue-600 hover:text-blue-700"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailContent;
