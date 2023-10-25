
import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import profile from "../../../assets/3135715.png";
import email_png from "../../../assets/email.png";
import add_png from "../../../assets/992651.png";
import AddContent from "./add";
import ReceivedContent from "./receivedEmail";
import SignOutToast from "../../alerts/signOut";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashBoard: React.FC = () => {
  const [loggedInUsername, setLoggedInUsername] = useState("");
  useEffect(() => {
    // Retrieve the username from localStorage
    const username = localStorage.getItem("username");

    if (username) {
      setLoggedInUsername(username);
    }
  }, []);

  const [selectedItem, setSelectedItem] = useState<string>("Add File");
  const sidebarItems: { imageUrl: string; text: string }[] = [
    { imageUrl: add_png, text: "Add File" },

    { imageUrl: email_png, text: "Received Email" },
  ];

  const handleSidebarItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const renderMainContent = () => {
    switch (selectedItem) {
      case "Add File":
        return <AddContent />;
      case "Received Email":
        return <ReceivedContent />;
      default:
        return null;
    }
  };
  const history = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("username"); // Clear the authentication token from local storage

    // Redirect to the login page or another appropriate page
    history("/login");

    // Show a toast message to confirm sign-out (optional)
    toast.dismiss(); // Close the toast
    toast.success("You have been signed out.", { autoClose: 1000, hideProgressBar:true }); // Show a success message
  };

  const showSignOutToast = () => {
    toast(<SignOutToast onClose={toast.dismiss} onSignOut={handleSignOut} />, {
      autoClose: false,
    });
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center bg-white py-5 px-20 shadow-md" style={{backgroundColor:"#5068fb"}}>
        <div className="flex items-center" style={{color:"#ffffff"}}>
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-lg font-semibold">Kwasel Media</h1>
        </div>
        <div className="flex items-center">
          <img
            src={profile}
            alt="Profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          <p>{loggedInUsername}</p>
          <span className="mx-2 border border-gray-300 h-10 inline-block"></span>
          <button
            onClick={showSignOutToast}
            className="border border-white-500 text-blue-500 px-4 py-2 rounded-md" style={{color:"#ffffff"}}
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="flex-grow px-20 py-10">
        <div className="grid grid-cols-5 gap-4 mx-8">
          <div className="col-span-2">
            <div className="flex justify-center items-center">
              <div className="w-3/4 h-1/3 px-3 py-4 bg-gray-50 dark:bg-gray-800 rounded-lg ">
                <ul className="space-y-3  text-lg font-medium">
                  {sidebarItems.map((item, index) => (
                    <li>
                      <a
                        key={index}
<<<<<<< HEAD
                        className={`flex items-center gap-3 p-2 text-gray-900 rounded-lg dark:text-white ${
=======
                        className={`flex items-center gap-3 p-2 text-gray-900 rounded-lg dark:text-white  ${
>>>>>>> 4a032db56682aa0497c84073c584e9c290af00fb
                          selectedItem === item.text
                            ? "text-white bg-blue-700   font-semibold"
                            : ""
                        }`}
                        onClick={() => handleSidebarItemClick(item.text)}
                      >
                        <img
                          src={item.imageUrl}
                          alt={`${item.text} Icon`}
                          className="h-6 w-6 mr-2"
                        />

                        <span className="ml-3">{item.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center items-center mt-3">
              <div className=" w-3/4 h-2/3 bg-gray-50 dark:bg-gray-800 rounded-lg align-center p-4 shadow-md">
                <p className="font-bold text-center" style={{ color: "#cc8701" }}>Our Vision</p>
                <p>
                To set the benchmark in delivering high quality business forms and document security solutions, employing the best of human capital and technology in a cost-effective and 
                profitable manner that collectively rewards ourselves, our customers and the communities in which we operate.
                </p><br/>
                <p className="font-bold text-center" style={{ color: "#cc8701" }} >Our Mission Statement</p>
                <p>Our mission is to remain leaders in delivering high quality business forms and document security solutions, employing the best of human capital and technology in a cost-effective and profitable 
                  manner that collectively rewards ourselves, our customers and the communities in which we operate.</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-3">{renderMainContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
