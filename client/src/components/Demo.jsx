import { Link } from "react-router-dom";
import { FaTelegram, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


// import "./demo.css"
export default function Demo() {
  return (
    <>
    <div className="pb-3 bg-[#eee] dark:bg-gray-800 ">
      <div className="max-w-screen-xl mx-auto">
        <div className=" flex justify-end relative top-48">
          <Link to="">
            <img  src="images/main/logo.png" alt="logo-image" width="90px" />
          </Link>
        </div>
        <div className="flex justify-between mt-52">
          <div className="">
            <span>Links:</span>
            <Link to="#" className="ml-0 hover:text-green-400">Movies</Link>
            <Link to="#" className="hover:text-green-400 text-gray-300 font-[15px] ml-[20px] ">TV-Shows</Link>
            <Link to="#" className="hover:text-green-400 text-gray-300 font-[15px] ml-[20px] ">A-Z List</Link>
            <Link to="#" className="hover:text-green-400 text-gray-300 font-[15px] ml-[20px] ">Recently Updated</Link>
          </div>
          <div>
          </div>
        </div>
        <hr className="max-w-screen-xl mx-auto text-red-900 dark:text-gray-600 my-2"/>
        {/* <!--horizontal line between them--> */}
        <p className="text-center text-sm  text-gray-400  mb-0">
          ETBlogs is top of free blog website, where to read blogs
          online free without registration required. With a big database and
          great features, we're confident ETBlogs is the best free blogs online
          website in the space that you can't simply miss!
        </p>
        <div className="flex justify-center gap-5 mt-3">
          <Link to="mailto:abelon.gezahegn2@gmail.com" target="_blank"><MdEmail className="text-green-500"/></Link>
          <Link to="https://t.me/+CUqjJYaN8HI2ZmRk" target="_blank"><FaTelegram className="text-green-500"/></Link>
          <Link to="" target="_blank"><FaFacebook className="text-green-500"/></Link>
        </div>
        <div>
          <p className="text-center font-[13px] text-gray-400 mb-0">&copy;2023 ETBlogs All rights reserved.</p>
        </div>
      </div>
    </div>


      
    </>
  )
}

