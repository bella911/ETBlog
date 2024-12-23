import React from "react";
import logo from "../images/logo.png";
// import Facebook from "../icons/facebook.png";
// import Instagram from "../icons/instagram.png";
// import Telegram from "../icons/telegram.png";
// import Github from "../icons/github.png";
import { Link } from "react-router-dom";
import { FaTelegram, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";

function Footer() {
  return (
    // new etmovies style footer it's so light weight
    <div className="pb-3 bg-[#eee] dark:bg-gray-800  min-h-48">
      <div className="max-w-screen-xl  mx-auto">
        <div className="flex items-end justify-between flex-col sm:flex-row px-2">
          <div className="mx-auto md:mx-0">
            <div>
              {/* <img src={logo} className="w-auto h-6 sm:h-9 mx-auto md:mx-0" alt="logo" /> */}
              <svg

                className="md:w-auto w-24  h-9 mx-auto md:mx-0"
                viewBox="0 0 300 77.8785824180256"
              >
                <g
                  featurekey="nameFeature-0"
                  transform="matrix(2.6168876622227972,0,0,2.6168876622227972,2.1447065684535184e-7,-26.796924070886288)"
                  fill="#0ea47a"
                >
                  <path d="M0 40 l0 -29.76 l17.32 0 l0 8.36 l-10.48 0 l0 3.68 l8.6 0 l0 5.96 l-8.6 0 l0 3.4 l10.48 0 l0 8.36 l-17.24 0 l-0.08 0 z M19.32 20.48 l0 -10.24 l21.76 0 l0 10.24 l-7.48 0 l0 19.52 l-6.8 0 l0 -19.52 l-7.48 0 z M61.44 23.6 c2.4 0.88 3.28 2.52 3.28 5.04 l0 5.28 c0 4.08 -1.6 6.08 -9.68 6.08 l-11.96 0 l0 -5.96 l1.84 0 l0 -16.92 l-1.84 0 l0 -6.88 l11.6 0 c6.92 0 8.28 1.72 8.28 5.2 l0 4.52 c0 1.64 -0.44 2.8 -1.52 3.64 z M52.48 15.8 l0 6.84 c0.32 0.08 0.72 0.16 1.24 0.16 c1.84 0 2.44 -0.64 2.44 -2.12 l0 -2.88 c0 -1.44 -0.4 -2.16 -2.44 -2.16 c-0.52 0 -0.92 0.04 -1.24 0.16 z M56.76 32.32 l0 -3 c0 -1.48 -0.72 -2.12 -2.84 -2.12 c-0.6 0 -1.08 0.04 -1.44 0.12 l0 7.04 c0.36 0.12 0.84 0.2 1.44 0.2 c2.36 0 2.84 -0.76 2.84 -2.24 z M72.2 32.480000000000004 l19.2 0 l0 7.52 l-24.68 0 l0 -29.76 l5.48 0 l0 22.24 z M81.8 10.239999999999998 c6.24 0 7.48 2.08 7.48 6.36 l0 8.44 c0 4.28 -1.84 6.12 -7.48 6.12 c-5.68 0 -7.48 -1.92 -7.48 -6.12 l0 -8.44 c0 -4.2 1.84 -6.36 7.48 -6.36 z M85.32 22.16 l0 -3.04 c0 -1.52 -0.52 -2.24 -3.12 -2.24 c-2.36 0 -3.12 0.76 -3.12 2.24 l0 3.04 c0 1.48 0.72 2.16 3.12 2.16 c2.36 0 3.12 -0.64 3.12 -2.16 z M104 10.239999999999998 c8 0 10.64 2.6 10.64 8.68 l0 2.6 l-5.64 0 c-0.04 -2.44 -1.16 -3.44 -4.44 -3.44 c-3.36 0 -4.44 1.12 -4.44 3.64 l0 7.88 c0 2.48 1.12 3.8 4.44 3.8 c3.56 0 4.36 -1.16 4.44 -3.48 l-5.52 0 l0 -6.48 l11.16 0 l0 7.52 c0 6.08 -1.76 9.04 -10.64 9.04 c-8 0 -10.6 -3.08 -10.6 -9.04 l0 -12.04 c0 -5.96 2.52 -8.68 10.6 -8.68 z"></path>
                </g>
              </svg>
            </div>
            <div className=" text-sm dark:text-gray-400 text-gray-800">
              Power Your Media Dreams{" "}
            </div>
          </div>
          <div className="flex justify-between dark:text-gray-400 text-gray-800 ">
            <div className="hidden md:inline-block">
              <span className="dark:text-[#eee] text-green-600">Links:</span>
              <Link to={"/"} className="ml-0 hover:text-green-400 ">
                &nbsp; News
              </Link>
              {/* <Link to="#" className="hover:text-green-400  font-[15px] ml-[20px] ">Videos</Link> */}
              <Link
                to={""}
                className="hover:text-green-400  font-[15px] ml-[20px] "
              >
                Authors
              </Link>
              <Link
                to="#"
                className="hover:text-green-400  font-[15px] ml-[20px] "
              >
                Recently Posted
              </Link>
            </div>
            <div></div>
          </div>
        </div>
        <hr className="max-w-screen-xl mx-auto border-green-500 dark:border-gray-600 my-2" />
        {/* <!--horizontal line between them--> */}
        <p className="text-center text-sm  dark:text-gray-400 text-gray-800 mb-0">
          ETBlogs is top of free blog website, where to read blogs online free
          without registration required. With a big database and great features,
          we're confident ETBlogs is the best free blogs online website in the
          space that you can't simply miss!
        </p>
        <div className="flex justify-center gap-5 mt-3">
          <Link to="mailto:abelon.gezahegn2@gmail.com" target="_blank">
            <MdEmail className="text-green-500 w-6 h-6 hover:opacity-50" />
          </Link>
          <Link to="https://t.me/BellaVoss" target="_blank">
            <FaTelegram className="text-green-500 w-6 h-6 hover:opacity-50" />
          </Link>
          <Link to="tel:+251912227599" target="_blank">
            <IoCall className="text-green-500 w-6 h-6 hover:opacity-50" />
          </Link>
          {/* <Link to="https://facebook.com/abel.gezahegn.756" target="_blank">
            <FaFacebook className="text-green-500 w-6 h-6 hover:opacity-50" />
          </Link> */}
        </div>
        <div>
          <p className="text-center font-[13px]  mb-0 dark:text-gray-400 text-gray-800">
            &copy;2023 ETBlogs All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
