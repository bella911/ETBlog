import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "../axios";
import SlidePosts from "../components/SlidePosts";
import ReactPaginate from "react-paginate";
import { Button, Navbar, Tabs } from "flowbite-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {FollowingModal, FollowModal} from "../components/Modal.jsx"
import ScrollToTop from "../components/ScrollToTop.jsx";
// list all news posts
function Posts() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [posts, setPosts] = useState([]);
  const [forYouPosts, setForYouPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(true);

  // get all posts
  useEffect(() => {
    axios
      .get("/post/getAllPosts")
      .then((res) => {
        // setForYouPosts(res.data.data);
        setPosts(res.data.data);
        // console.log(res.data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  // get following posts
  if (currentUser) {
    useEffect(() => {
      axios
        .get("/post/followingposts", {withCredentials: true})
        .then((res) => {
          setFollowingPosts(res.data)
          // setPosts(res.data);
          console.log("this one is the following post",res.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }, []);
  }


  const postsLength = activeTab? posts.length : followingPosts.length; // decide which length is defined
  const itemsPerPage = 9;
  // convert posts length to items by fill array start from 0 - posts length
  const items = [];
  for (let index = 0; index < postsLength; index++) {
    items[index] = index;
  }
  // ........................................

  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    
    // scroll to top of the list when click pages
    window.scrollTo({
      top: 500,
      left: 0,
      // behavior: "smooth",
    });
  };

  const paginatePosts = []; // store ranged posts based on filter page

  activeTab? posts.map((value, index) => { // if active tab is press show only posts pagination
    if (
      index >= currentItems[0] &&
      index <= currentItems[currentItems.length - 1]
    )
      paginatePosts.push(value);
  })
  :followingPosts.map((value, index) => {
    if (
      index >= currentItems[0] &&
      index <= currentItems[currentItems.length - 1]
    )
      paginatePosts.push(value);
  })

  return (
    <div className="bg-[#eee]  dark:bg-gray-800 pb-10">
      <ScrollToTop/>
      <div className="mx-auto max-w-screen-xl px-2 lg:px-8">
        {/* new news slider */}
        <SlidePosts />

        {/* for you and following */}
        {/* <ForYouFollowing /> */}

        <div className="bg-[#eee] dark:bg-gray-800 dark:text-gray-400 text-gray-800 flex justify-center gap-10  p-2 mx-auto max-w-[1210px]  mt-6 ">
            <Button color="transparent"  outline size="xs" onClick={() => setActiveTab(true) } className={`${activeTab && "border-b-2 border-b-green-500"} focus:ring-0`}>
                <span  className={`font-medium text-base  ${activeTab && ' text-green-500 font-semibold'}`}> For You </span>
            </Button>
            <Button color="transparent" outline size="xs" onClick={() => setActiveTab(false) } className={`${!activeTab && "border-b-2 border-b-green-500"} focus:ring-0`}>
                {currentUser? <span   className={`font-medium text-base ${!activeTab && ' text-green-500 font-semibold'}`}> Following </span>
                : <FollowingModal/>}
            </Button>
        </div>
     
        {/* all post view start from bottom off follow and for you */}
        {/* <ScrollToTop/> */}
        { loading ? (
          <div className="flex justify-center items-center mt-64 mb-52">
            <ClipLoader speedMultiplier="0.5" size="40px" />
          </div>
        ) : activeTab ? (
          <div className="mx-auto mt-4 py-4 grid max-w-2xl grid-cols-1 gap-x-8  gap-y-16   md:mx-0 md:max-w-none md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {paginatePosts.map(
              ({ _id, title, description, createdAt, image, author }) => (
                <PostItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  date={createdAt}
                  author={author}
                  image={image}
                />
              )
            )}
          </div>
        ): (
          // display following posts
          <div className="mx-auto mt-4 py-4 grid max-w-2xl grid-cols-1 gap-x-8  gap-y-16    md:mx-0 md:max-w-none md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {followingPosts.map(
              ({ _id, title, description, createdAt, image, author }) => (
                <PostItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  date={createdAt}
                  author={author}
                  image={image}
                />
              )
            )}
          </div>
        )}

      </div>

      <div className="flex justify-center  p-4 mx-auto max-w-[1210px]  mt-12 mb-10 ">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={handlePageClick}
          // pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          // className="flex gap-4 border-2 p-2" this value same of container class name

          containerClassName="flex gap-4 p-2 items-center "
          pageClassName="border-2 bg-gray-200  rounded border-gray-300"
          pageLinkClassName="block px-3 leading-7"
          previousLinkClassName="block px-3 leading-7"
          nextLinkClassName="block px-3 leading-7"
          previousClassName="border-2 bg-gray-200 rounded border-gray-300"
          nextClassName="border-2 bg-gray-200 rounded border-gray-300"
          disabledClassName="bg-gray-400 cursor-not-allowed border-gray-400"
          disabledLinkClassName="cursor-not-allowed"
          activeClassName="bg-green-300"
        />
      </div>

      {/* {loading? "" : <Pagination/>} */}
    </div>
  );
}

export default Posts;
