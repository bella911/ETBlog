import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "../axios";
import ScrollToTop from "../components/ScrollToTop";
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet"
function Authors() {
    const [loading, setLoading] = useState(true);
    const [listAuthors, setListAuthors] = useState([]);
    const [posts, setPosts] = useState([]);
    let count = 0;

    // get all users
    useEffect(() => {
        axios
            .get(`/user/users`, { withCredentials: true }) // { withCredentials: true }
            .then((res) => {
                setListAuthors(res.data); // fetch user posts
                setLoading(false);
            })
            .catch((error) => {
                // setLoading(false);
                console.log(error.message);
            });
    }, []);

    // get all posts
    useEffect(() => {
        axios
            .get("/post/getAllPosts")
            .then((res) => {
                setPosts(res.data.data);
                // console.log(res.data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    
    return (
        <div className='py-10 bg-[#eee]  dark:bg-gray-800 '>
            <Helmet> 
                <title>Authors | ETblog</title>
                <meta name="description" content="List all authors info" />
            </Helmet>
            <ScrollToTop />
            <div className="mx-auto  max-w-7xl pb-12 md:px-6 px-2 min-h-96">
                <div className=" pb-10  md:text-start text-center">
                    <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-600 dark:text-gray-400 sm:text-4xl">
                        Meet our Authors
                    </h2>
                    <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400 px-1">
                        We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
                        best content for our clients.
                    </p>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center mt-32 mb-28">
                        <ClipLoader speedMultiplier="0.5" size="40px" />
                    </div>)
                    : (<div className=''>
                        <ul className="pb-20 text-center grid md:gap-x-16 gap-x-8 gap-y-12 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-y-16 xl:col-span-2 ">
                            {listAuthors.map((author) => (
                                <li key={author._id}>
                                    {posts.map((user) => { if (user.user.includes(author._id)) count++ })}
                                    {/* {console.log("total post", count)} */}
                                    <div className="flex  flex-col items-center gap-x-6">
                                        <Link to={`/user/${author.username}`} >
                                            <img  src={author.profilePicture} alt={`${author.username}-picture`} className="size-16 rounded-full" />
                                        </Link>
                                        <div>
                                            <Link to={`/user/${author.username}`} >
                                                <h3 className="text-base/7 font-semibold tracking-tight text-gray-600 dark:text-gray-400">{author.username}</h3>
                                            </Link>
                                            {/* <p className="text-sm/6 font-semibold text-green-400">{"author.role"}</p> */}
                                            <p className="text-sm/6 font-semibold text-green-400">{count} posts</p>
                                            {/* reset count and hidden the value from displaying on web */}
                                            <span className="hidden">{count = 0}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    )}
            </div>
        </div>
    )
}

export default Authors