import React, { useState } from 'react';

import axios from "../axios";
import {useNavigate, useParams } from 'react-router-dom';

const DeletePost = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id)
  const handleDeletePost = async () => {
    axios
      .delete(`/post/${id}`, {withCredentials: true})
      .then((res) => {
        navigate("/posts");
        // console.log(res)
      })
      .catch((error) => {
        // alert('An error happened. Please Chack console');
        console.log(error);
      });
  };


  return (
    <div className='p-4'>
      {/* <BackButton /> */}
      <h1 className='text-3xl my-4'>Delete post</h1>
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this post?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeletePost}
        >
          Yes, Delete it
        </button>
      </div>


      {/* <div className='absolute h-screen left-auto top-1/4'>
      <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>

      </div> */}
    </div>
  )
}

export default DeletePost;