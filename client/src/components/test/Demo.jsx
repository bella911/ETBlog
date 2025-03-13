import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from "../../axios";
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
function Notification() {

  useEffect(() => {
    axios.get("/notifications", {withCredentials: true})
         .then((res) => {
          // console.log(res);
         })
         .catch((error) => console.log(error.messages))
  },[])

const notify = ["saba likes you", "umer follow you", "baye commented on your post", "samri likes your image"]
  return (
    <>
    <div className="bg-[#eee]   dark:bg-gray-800 px-1 text-center">

      <div className="max-w-screen-xl mx-auto text-center pt-16 pb-64   min-h-[70vh]  ">
        <h2 className="sm:text-4xl text-xl md:w-[70%] w-full text-start text-red-500">List Notifications</h2>
        {notify.map((value, index ) => (
          <p key={index} className="text-base md:w-[60%] w-full text-start p-3 m-2  dark:text-gray-400 text-gray-600 px-2">value</p>

        ))
        }
      </div>
    </div>
    </>
  )
}

export default Notification

