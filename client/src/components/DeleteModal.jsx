import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from "../axios";
import { Navigate, useNavigate } from 'react-router-dom';
// import { postLength } from "../redux/crudSlice";

function DeleteModal({ toggleModal, postSize}) {
  const navigate = useNavigate();
  const id = useSelector((state) => state.post.selectedPost);
  const pSize = useSelector((state) => state.post.postSize);
  const currentUser = useSelector((state) => state.user.currentUser);


function refreshPage(){ 
  window.location.reload(); 
}
const handleDeletePost = async () => {
  axios
    .delete(`/post/${id}`, {withCredentials: true})
    .then(() => {
      toggleModal();
      navigate(`/dashboard/${currentUser.username}`);
      window.location.reload(); 
    })
    .catch((error) => {
      toggleModal();
      console.log(error);
    });
};

  return (
      <div className="backdrop-blur-sm ">
        <div className=" mb-20  max-w-[500px] mx-auto text-center border-2 rounded-lg pb-16 py-1 lg:px-12 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="text-end lg:-mr-10 mb-5 ">
            <button
              className="px-3 py-1 hover:bg-red-500 rounded-sm"
              onClick={() => toggleModal()}
            >
              X
            </button>
          </div>
          <div className="text-xl mb-10 mt-12">
            Are you sure you want to delete this post?
          </div>
          <div className="flex gap-14 justify-center">
            <button className="bg-red-500 dark:bg-red-700 py-2 px-6 rounded-md hover:opacity-80" onClick={() => 
              {
                handleDeletePost();
                --postSize;
                }}>
              Yes
            </button>
            <button
              className="bg-green-400 dark:bg-green-600 py-2 px-6 rounded-md hover:opacity-80"
              onClick={() => toggleModal()}
            >
              No
            </button>
          </div>
        </div>
      </div>
  )
}

export default DeleteModal

