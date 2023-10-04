import React, { useState, useEffect } from "react";
import axios from "axios";

interface PdfCardData {
  id: number;
  text: string;
  text_description: string;
  pdfData: string; // Change the type to Uint8Array
}

const baseURL = "http://localhost:3000";

const api = axios.create({
  baseURL,
});

const DownloadContent: React.FC = () => {
  const [pdfCards, setPdfCards] = useState<PdfCardData[]>([]);

  useEffect(() => {
    // Fetch data from your backend route
    const fetchData = async () => {
      try {
        const response = await api.get<PdfCardData[]>("/auth/fetch_data"); // Replace with your actual backend route
        setPdfCards(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const downloadPdf = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `downloaded.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {pdfCards.map((card) => (
        <div key={card.id} className="bg-white p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">{card.text}</h2>
          <p className="text-gray-600 mb-2">{card.text_description}</p>

          <button
            onClick={() => downloadPdf(card.pdfData)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      ))}
    </div>
  );
};

export default DownloadContent;
