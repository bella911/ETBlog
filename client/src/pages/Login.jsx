import React, { useState } from "react";
import person from "../icons/person.png";
import lock from "../icons/lock.png";
import PersonImage from "../images/PersonImage.png";
// import axios from "axios";
import axios from "../axios";
import { useNavigate, Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/authSlice";
import { FcGoogle } from "react-icons/fc";
import OAuth from "../components/OAuth";
import ScrollToTop from "../components/ScrollToTop";
import { Helmet } from 'react-helmet'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isGoogleOAuth, setIsGoogleOAuth] = useState(false);
  function handlChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // execute only if user not use google auth
    if (!isGoogleOAuth) {
      setErrors({}); // Clear previous errors
      if (!username && !password) {
        return setErrors({
          username: "username is required",
          password: "Password is required",
        });
      } else if (!username) {
        return setErrors({ username: "username is required" });
      } else if (!/^[0-9A-Za-z]{4,16}$/.test(username)) {
        return setErrors({ username: "Invalid username" });
      } else if (!password) {
        return setErrors({ password: "Password is required" });
      } else if (password.length <= 3) {
        return setErrors({
          password: "Password must be at least 4 characters long",
        });
      }
      setLoading(true);
    }

    try {
        // convert email and username to lower case

      const res = await axios.post("/auth/login", { username, password }, { withCredentials: true }) // {withCredentials: true}
      dispatch(signIn(res.data));
      setLoading(false);
      navigate(`/`);

    } catch (error) {
      // console.log('Error:', error); // list all error properties
      setLoading(false);
      if (error.response.status === 400) {
        setErrors({ message: "username or password incorrect" });
      }
      else if (error.response.status === 404)
        console.log("Resource not found")
      else (error.response.status === 500)
      console.log('Internal server error');
    }
  }

  return (
    <div className="bg-[#eee]  dark:bg-gray-800 ">
      <Helmet>
        <title>Login | ETBlog</title>
        <meta name="description" content="Login page to access full feature" />
     </Helmet>
      <ScrollToTop/>
      <form
        className="flex justify-center text-center py-20 font-sans"
        onSubmit={handleSubmit}
      >
        <div className="sm:p-10 mx-2 shadow-lg bg-gray-300 dark:bg-gray-700 rounded-md lg:flex sm:flex-row ">
          <img
            className="hidden sm:flex justify-center items-center w-[300px] "
            src={PersonImage}
            alt=""
          />
          <div className=" p-6 shadow-lg bg-gray-400 dark:bg-gray-900  rounded-md font-bold sm:text-3xl">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Sign in to your account
            </h1>

            <div className="mb-2 pt-9">
              <label
                htmlFor="username"
                className="block mb-1 text-start  text-base font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 focus:ring-green-500 dark:focus:border-green-500 focus:border-green-500"
                placeholder="username"
                required=""
                value={username}
                onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-1 text-start text-base font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="text-start bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 focus:ring-green-500 dark:focus:border-green-500 focus:border-green-500"
                required=""
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              // className="w-full flex justify-center  py-2 px-4 rounded-md text-sm font-medium bg-green-300 dark:text-gray-700"
              className="w-full mb-3 dark:text-white  bg-green-500  focus:ring-4 focus:outline-none hover:opacity-75 font-medium rounded-lg text-sm px-5 py-2 text-center "
              disabled={loading}
            >
              {loading ? (
                <ClipLoader speedMultiplier="0.5" size="25px" />
              ) : (
                "Login"
              )}
            </button>
            {/* login with google account */}
            <button className="w-full" onClick={() => setIsGoogleOAuth(true)}>
              <OAuth />
            </button>
            {!isGoogleOAuth && errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
            <p className="text-center text-base  dark:text-white text-gray-800 mt-2 font-normal">
              Don’t have an account yet?{" "}
              <Link
                to="/signup"
                className="text-cyan-400 hover:opacity-50"
              >
                Sign up
              </Link>
            </p>

          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
