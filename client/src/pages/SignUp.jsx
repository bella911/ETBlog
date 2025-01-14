import React, { useState, useRef } from "react";
import logo from "../images/logo-main.png";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import ScrollToTop from "../components/ScrollToTop";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const checkBoxRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customErrors, setCustomErrors] = useState({ existUsername: "", existEmail: "", usernameLength: "" });

  const onSubmit = (data) => {
    setCustomErrors({});
    console.log(data);
    
    //cross check process the username value character is meet requirement length
    if(data.username.trim().length < 3) return setCustomErrors({emptyUsername: "username must be at least 4 characters long" })
      else if (!/^[0-9A-Za-z]{4,16}$/.test(data.username.trim())) return setCustomErrors({invalidUsername: "invalid username" })
    if(data.password.trim().length < 3) return setCustomErrors({emptyPassword: "password must be at least 4 characters long" })
    if(data.fullName.trim().length < 3) return setCustomErrors({emptyFullName: "full name must be at least 4 characters long" })
      
      setLoading(true);

    // convert email and username to lower case
    data.fullName = data.fullName.trim()
    data.username = data.username.trim().toLowerCase()
    data.password = data.password.trim().toLowerCase()
    data.email = data.email.toLowerCase().toLowerCase();
    // console.log(data);

    axios
      .post("/auth/signup", data)
      .then(() => {
        alert("register successful");
        setLoading(false);
        navigate("/login");

      })
      .catch((error) => {
        // console.log(error)
        console.log(error.message);
        setLoading(false);

        // check the email already exist
        if (error.response?.status === 400) {
          return setCustomErrors({
            existUsername: error.response.data?.existUsername,
            existEmail: error.response.data?.existEmail
          });
          // console.log(customErrors)
        }
      });
  };

  return (
    <div>
      <ScrollToTop/>
      <section className="bg-[#eee] dark:bg-gray-800 ">
        <div className="flex flex-col items-center justify-center sm:px-6 px-2 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full  rounded-lg shadow-lg  md:mt-0 sm:max-w-md xl:p-0 bg-gray-400 dark:bg-gray-900 ">
            <div className="py-6 px-2 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  text-gray-900 md:text-2xl dark:text-white text-center">
                Create an Account
              </h1>
              <form
                className="block bg-transparent px-4 sm:px-0"
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
                    name="fullName"
                    {...register("fullName", { required: true,
                      minLength: 4,
                      validate: (value) =>
                        value.trim() !== '' || 'full name cannot contain only spaces',
                     })}
                    className="text-start bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="full name"
                  />
                </div>
                {errors.fullName && errors.fullName.type === "required" && <p className="text-red-500 text-sm mb-2"> full name required</p>}
                {errors.fullName && errors.fullName.type === "validate" && <p className="text-red-500 text-sm mb-2">{errors.fullName.message}</p> }
                {errors.fullName && errors.fullName.type === "minLength" && <p className="text-red-500 text-sm mb-2">full name must be at least 4 characters long</p>}
                {customErrors.emptyFullName && (<p className="text-red-500 text-sm mb-2">{customErrors.emptyFullName}</p>)}


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
                    {...register("username", { required: true, minLength: 4,
                      validate: (value) =>
                        value.trim() !== '' || 'username cannot contain only spaces',
                     })}
                  />
                </div>
                {errors.username && errors.username.type === "required" && <p className="text-red-500 text-sm mb-2"> username required</p>}
                {errors.username && errors.username.type === "validate" && <p className="text-red-500 text-sm mb-2">{errors.username.message}</p> }
                {errors.username && errors.username.type === "minLength" && <p className="text-red-500 text-sm mb-2">username must be at least 4 characters long</p>}
                {customErrors.invalidUsername && (<p className="text-red-500 text-sm mb-2">{customErrors.invalidUsername}</p>)}
                {customErrors.emptyUsername && (<p className="text-red-500 text-sm mb-2">{customErrors.emptyUsername}</p>)}
                {customErrors.existUsername && (<p className="text-red-500 text-sm mb-2">{customErrors.existUsername}</p>)}

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
                {errors.email && (<p className="text-red-500 text-sm mb-2">email required</p>)}
                {customErrors.existEmail && (<p className="text-red-500 text-sm mb-2">{customErrors.existEmail}</p>)}
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
                    {...register("password", { required: true, minLength: 4,
                      validate: (value) =>
                        value.trim() !== '' || 'password cannot contain only spaces',
                     })}
                  />
                </div>
                {errors.password && errors.password.type === "required" && <p className="text-red-500 text-sm -mt-4 mb-2">password required</p>}
                {errors.password && errors.password.type === "validate" && <p className="text-red-500 text-sm -mt-4 mb-2">{errors.password.message}</p> }
                {errors.password && errors.password.type === "minLength" && <p className="text-red-500 text-sm -mt-4 mb-2">password must be at least 4 characters long </p>}
                {customErrors.emptyPassword && (<p className="text-red-500 text-sm -mt-4 mb-2">{customErrors.emptyPassword}</p>)}


                <div className="mb-6 ">
                  <label htmlFor="gender" 
                    className="block mb-1  text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                  <div className="flex gap-6 dark:text-white text-gray-900">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        defaultChecked
                        value="male"
                        {...register('gender', { required: 'Gender is required' })}
                      />
                      Male
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="female"
                        {...register('gender', { required: 'Gender is required' })}
                      />
                      {" Female"}
                    </label>
                  </div>
                  {/* {errors.gender && <p>{errors.gender.message}</p>} */}
                </div>
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
                <p className="text-base text-center font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium  text-cyan-400 hover:opacity-50 "
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
