import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

// import PostDetail from "../pages/PostDetail";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "../../axios";
import moment from "moment"
 

function PostItem({ id, title, description, createdAt, author, image, userId }) {
  const navigate = useNavigate()
  const [userPicture, setUserPicture] = useState("")
  // console.log(id)
  // count post viewers
  const countView = async () =>{
   axios
    .get(`/post/count/${id}`)
    .then((res) => {
      // console.log("post views", res.data);
      navigate(`/posts/${id}`)
    })
    .catch((error) => console.log(error));
  }

  //  
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`/user/${userId}`) // { withCredentials: true }
        .then((res) => {
          setUserPicture(res.data.profilePicture); // fetch user posts
        })
        .catch((error) => {
          console.log(error.message);
        });
      }
  
      fetchData();
  
      const intervalId = setInterval(fetchData, 3000);
  
      return () => clearInterval(intervalId);
  
    }, []);
  return (
    <article
      // key={id}
      className="flex  flex-col items-center justify-between "
    >
      <div className=" bg-white dark:bg-gray-900  h-full w-full object-fill object-center lg:h-full lg:w-full rounded-lg  shadow-md max-w-xs md:max-w-none sm:max-w-none  overflow-hidden">
        <Link to={`/posts/${id}`}>
          <img className="h-56  w-full " src={image} alt=" cover page of posts" />
        </Link>

        <div className="border-x-[1px] dark:border-x-gray-900  rounded-md rounded-t-none  p-2">
          <div className="flex items-center gap-x-4 text-xs">
            <time className="text-gray-500 dark:text-gray-200  ">
            {moment(createdAt).fromNow()}
            </time>
          </div>
            <h3 className="line-clamp-1 mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-gray-200   group-hover:text-gray-600 ">
              <Link to={`/posts/${id}`} className="hover:underline">
                {title}
              </Link>
            </h3>
          <div className="group relative">
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-200  ">
              <span dangerouslySetInnerHTML={{ __html: description }}/>
              {/* {description} */}
            </p>
            <button className="text-green-500 hover:underline" onClick={()=> countView()}>See more</button>
            {/* <Link to={`/posts/${id}`} className="text-green-500 hover:underline"><button onClick={()=> countView}>See more</button></Link> */}
          </div>
          <div className="relative mt-4 flex items-center gap-x-4">
            <img
              src={userPicture}
              alt="author image"
              className="h-10 w-10 rounded-full bg-gray-50"
            />
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900 dark:text-gray-200 hover:underline">
                <Link to={`/user/${author?.toLowerCase()}`}>
                  {author}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostItem;
