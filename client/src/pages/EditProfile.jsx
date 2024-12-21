import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReplyCommentOnUserPage } from "../components/Modal";


function EditProfile() {
      const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="block mx-auto bg-[#eee] dark:bg-gray-800 min-w-96">
      <div className="py-8 max-w-5xl mx-auto lg:py-20 px-1">
        <form className="block ">
          <div className="">
            <div
              className="flex items-center justify-center mb-5 "
            >
              <label
                htmlFor="cover-file"
                className="flex flex-col items-center justify-center w-full aspect-[5/1] rounded-xl cursor-pointer bg-white dark:hover:opacity-75 dark:bg-gray-900 hover:opacity-75 dark:hover:border-gray-500 dark:hover:bg-gray-900 relative"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    strokeLinecap="round"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-gray-500"
                    fill="currentColor"
                  ></svg>

                    <img className="w-full" src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"/>
                </div>
                <input
                  name="cover"
                  id="cover-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            <div
              className="flex items-center justify-center w-32 h-32 mb-5 -mt-16 ml-4"
              x-data="imageViewer('')"
            >
              <label
                htmlFor="avatar-file"
                className="flex flex-col items-center justify-center w-full aspect-square border-t border-gray-500 rounded-full cursor-pointer bg-white dark:hover:bg-gray-700/50 dark:bg-gray-900 hover:bg-gray-50 dark:border-gray-900 dark:hover:bg-gray-700 relative"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    strokeLinecap="round"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                    className="w-8 h-8 text-gray-500"
                    fill="currentColor"
                  ></svg>
                </div>
                <div className="object-cover w-full aspect-square absolute inset-0 rounded-full">
                <img className="rounded-full w-full" src={currentUser.profilePicture} alt="image" />

                </div>
                <input
                  name="avatar"
                  id="avatar-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />

              </label>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600  dark:text-gray-300 dark:font-normal rtl:text-right"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="block w-full text-start border-gray-200 rounded-md text-sm px-5 py-3.5   dark:bg-gray-800 dark:border-gray-900 dark:text-gray-400 placeholder-gray-400/70 shadow-sm  mt-1 "
              id="name"
              name="name"
              type="text"
              // value="Abel"
              defaultValue={currentUser.fullName}
              required="required"
              autoComplete="name"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600  dark:text-gray-300 dark:font-normal rtl:text-right"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="block w-full text-start border-gray-200 rounded-md text-sm px-5 py-3.5   dark:bg-gray-800 dark:border-gray-900 dark:text-gray-400 placeholder-gray-400/70 shadow-sm  mt-1 "
              id="email"
              name="email"
              type="email"
              // value="geti.gezahegn@gmail.com"
              defaultValue={currentUser.email}
              required="required"
              autoComplete="email"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600  dark:text-gray-300 dark:font-normal rtl:text-right"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="block w-full text-start border-gray-200 rounded-md text-sm px-5 py-3.5   dark:bg-gray-800 dark:border-gray-900 dark:text-gray-400 placeholder-gray-400/70 shadow-sm  mt-1 "
              id="username"
              name="username"
              type="text"
              // value="Voss"
              defaultValue={currentUser.username}
              required="required"
              autoComplete="username"
              placeholder="Username"
              disabled
            />
          </div>
          <div className="mb-7 lg:mb-12 ">
            <label
              className="block text-sm font-medium text-gray-600  dark:text-gray-300 dark:font-normal rtl:text-right"
              htmlFor="about"
            >
              About
            </label>
            <input
              className="block w-full text-start border-gray-200 rounded-md text-sm px-5 py-3.5   dark:bg-gray-800 dark:border-gray-900 dark:text-gray-400 placeholder-gray-400/70 shadow-sm  mt-1 "
              id="about"
              name="about"
              defaultValue={currentUser.bio}
              type="text"
              placeholder="About"
              
            />
          </div>
          <hr className="my-6 lg:my-10 border-gray-100 dark:border-gray-900" />
          <h3 className="dark:text-white text-xl font-medium mb-4 lg:mt-8 mt-3">
            Change password
          </h3>
          <div className="mb-4 ">
            <label
              className="block text-sm font-medium text-gray-600  dark:text-gray-300 dark:font-normal rtl:text-right"
              htmlFor="password"
            >
              Current password
            </label>
            <input
              className="block w-full text-start border-gray-200 rounded-md text-sm px-5 py-3.5   dark:bg-gray-800 dark:border-gray-900 dark:text-gray-400 placeholder-gray-400/70 shadow-sm  mt-1 "
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              placeholder="Current password"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600  dark:text-gray-300 dark:font-normal rtl:text-right"
              htmlFor="new_password"
            >
              New password
            </label>
            <input
              className="block w-full text-start border-gray-200 rounded-md text-sm px-5 py-3.5  dark:bg-gray-800 dark:border-gray-900 dark:text-gray-400 placeholder-gray-400/70 shadow-sm  mt-1 "
              id="new_password"
              name="new_password"
              type="password"
              autoComplete="password"
              placeholder="New password"
            />
          </div>
          <button
            className="inline-flex whitespace-nowrap gap-x-3 items-center justify-center px-6 py-3.5 text-sm rounded-base font-[450] disabled:opacity-50 disabled:pointer-events-none transition border border-transparent text-white bg-green-600 rounded-full  focus:outline-none focus:ring-2 focus:ring-offset-2  dark:focus:ring-offset-gray-800 w-full max-w-xs mt-5"
            type="submit"
          >
            Save change
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
