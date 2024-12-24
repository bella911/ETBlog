import React, { useState, useRef } from "react";
import logo from "../images/logo-main.png";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const checkBoxRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [form, setForm] = useState({
  //   name: "",
  //   username: "",
  //   email: "",
  //   password: "",
  //   profilePicture: "",
  //   coverImage: "",
  //   bio: "",
  // });

  const onSubmit = (data) => {
    // console.log(data);
    setLoading(true);

    axios
      .post("/auth/signup", data)
      .then(() => {
        alert("register successful");
        
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <section className="bg-[#eee] dark:bg-gray-800 ">
        <div className="flex flex-col items-center justify-center sm:px-6 px-2 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full  rounded-lg shadow-lg  md:mt-0 sm:max-w-md xl:p-0 bg-gray-400 dark:bg-gray-900 ">
            <div className="py-6 px-2 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  text-gray-900 md:text-2xl dark:text-white text-center">
                Create an Account
              </h1>
              <form
                className="block bg-transparent"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-2">
                  <label
                    htmlFor="name"
                    className="block mb-1  text-sm font-medium  text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    {...register("fullName", { required: true })}
                    className="text-start bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name"
                    required=""
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mb-2">full name required</p>
                )}
                <div className="mb-2">
                  <label
                    htmlFor="username"
                    className="block mb-1  text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="text-start bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required=""
                    {...register("username", { required: true, minLength: 4 })}
                  />
                </div>
                {errors.username && errors.username.type === "required" &&  <p className="text-red-500 text-sm mb-2"> username required</p>}
                {errors.username && errors.username.type === "minLength" && <p className="text-red-500 text-sm mb-2">username must be minimum 4 character</p> }


                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="text-start bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    required=""
                    {...register("email", { required: true })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mb-2">email required</p>
                )}
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-1  text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="text-start bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    {...register("password", { required: true, minLength: 6})}
                  />
                </div>
                {errors.password && errors.password.type === "required" && <p className="text-red-500 text-sm -mt-4 mb-2">password required</p>}
                {errors.password && errors.password.type === "minLength" && <p className="text-red-500 text-sm -mt-4 mb-2">password must be at least 4 characters long </p> }
                <button
                  type="submit"
                  className="w-full mb-3 text-white bg-green-500  focus:ring-4 focus:outline-none hover:opacity-75 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader speedMultiplier="0.5" size="20px" />
                  ) : (
                    "Sign up"
                  )}
                </button>
                <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium  hover:underline hover:text-cyan-400 hover:opacity-50 "
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
