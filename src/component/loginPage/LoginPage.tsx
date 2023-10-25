import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify"; // Import toast
import backgroundImage from "../../assets/background.jpg";


const baseURL = "https://lizzy-backend.onrender.com";

const api = axios.create({
  baseURL,
});

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");
  const history = useNavigate();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      toast.error("Input Field Required.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
      });
      // setMessage("Input Field Required.");
      return;
    }
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      }); // Use Axios

      if (response.data.payload) {
        // Assuming response.data.payload includes username
        const { user_name, role } = response.data.payload;
        console.log(response.data.payload);

        // Store the username in localStorage
        localStorage.setItem("username", user_name);

        if (role === "admin") {
          console.log("username", user_name);
          toast.success("Login Admin successful", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
            hideProgressBar: true,
          });
          history("/admin/dashboard");
        } else {
          toast.success("Login successful", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
            hideProgressBar: true,
          });
          history("/client/dashboard");
        }

        // Show a success notification

        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error during Login:", error);
      // setMessage("Login failed");

      // Show an error notification
      toast.error("Login failed", { position: toast.POSITION.TOP_CENTER, autoClose: 1000, hideProgressBar: true});
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Form */}
      <section className="bg-gray-50 dark:bg-gray-900" 
      style = {{backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover", backgroundPosition: "center",}}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {/* <p>{message}</p> */}
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
           {/* <img className="w-8 h-8 mr-2" src={logo} alt="Logo" />
            Kawsel Media */}
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start"></div>
                  <Link
                    to="/forgotten"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signUp"
                    className="font-medium text-primary-600 hover: underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default LoginPage;
