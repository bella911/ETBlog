import React from 'react'
import { Link } from 'react-router-dom'
import { FaTelegram, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import { Donate } from './payment/DonateModal';

// import { Donate } from './Modal';


function SuperHeader() {
    return (
        <div className='max-w-screen-xl mx-auto px-4'>
            <div className=" flex justify-center items-center lg:gap-5 pt-2 ">
                <div id="address" className='flex md:gap-5 gap-3'>
                    <Link to="tel:+251912227599" target="_blank" >
                        <span className='flex gap-1 items-center'>
                            <IoCall className="text-green-500 text-base hover:opacity-50 xs:inline" />
                            <span className='hover:text-green-600 text-gray-500 dark:text-white md:inline hidden'>+251912227599</span>
                        </span>
                    </Link>
                    <Link to="mailto:admin@bella.com.et" target="_blank" >
                        <span className='flex gap-1 items-center'>
                            <SiGmail className="text-green-500 text-base hover:opacity-50" />
                            <span className='hover:text-green-600 text-gray-500 dark:text-white md:inline hidden'>admin@bella.com.et</span>
                        </span>
                    </Link>
                    <div className='md:flex gap-1 items-center  hidden'>
                        <FaLocationDot className="text-green-500 text-base hover:opacity-50" />
                        <span className='hover:text-green-600 text-gray-500 dark:text-white'>Adama, Ethiopia</span>
                    </div>
                </div>

                <div id="social_media" className='flex md:gap-5 gap-3 md:pl-10 pl-2'>
                    <Link to="https://t.me/BellaVoss" target="_blank">
                        <FaTelegram className="text-green-500 text-base hover:opacity-50" />
                    </Link>
                    <Link to="https://www.linkedin.com/in/abel-gezahegn-28a5ab1ab/" target="_blank">
                        <FaLinkedin className="text-green-500 text-base hover:opacity-50" />
                    </Link>
                    {/* <Link to="mailto:abelon.gezahegn2@gmail.com" target="_blank">
                            <SiGmail className="text-green-500 text-base hover:opacity-50" />
                        </Link> */}
                    <Link to="https://facebook.com/abel.gezahegn.756" target="_blank">
                        <FaFacebook className="text-green-500 text-base hover:opacity-50" />
                    </Link>
                </div>

                <div id="remain" className='flex md:gap-5 gap-3 md:pl-10 pl-5 flex-row-reverse'>

                    {/* donate */}
                    <Donate />
                    {/* <button className='bg-yellow-400 text-black px-4 py-1 rounded-full hover:opacity-80'><Donate/></button> */}

                    {/* language */}
                    <select name="" id="" className='bg-transparent border-green-300 rounded-lg py-0 focus:ring-0 text-gray-500 focus:border-gray-400 px-0 pl-1'>
                        <option value="">Eng</option>
                        <option value="">አማ</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SuperHeader