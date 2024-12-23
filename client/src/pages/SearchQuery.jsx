import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import axios from "../axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation, useNavigate } from 'react-router-dom';

function SearchQuery() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  // const navigate = useNavigate();

  // fetch query from the Url
  const fetchUrlParams = () => {
    const urlP = new URLSearchParams(location.search);
    const queryUrl = urlP.get("query");
    if (queryUrl) {
      setQuery(queryUrl);
    }
  };

  useEffect(() => {
    fetchUrlParams();
    axios
      .get(`/post/getAllPosts`)
      .then((res) => {
        // console.log(res.data.data);
        const data = res.data.data;
        setPosts(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location.search]); // location search used for change and auto refresh the search query

  const filterPosts = posts.filter(
    (d) =>
      d.title.toLowerCase().includes(query) ||
      d.author.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query)
  );
  // console.log("filtered posts", filterPosts)

  //  if(filterPosts.length == 0){
  //   return setError("Post Not Found")
  //  }

  // console.log(filterPosts.length === 0);
  //   console.log(query);

  return (
    <div className="bg-[#eee]  dark:bg-gray-800">
      <div className="pb-16 relative min-h-[70vh] ">
        <div className="mx-auto max-w-7xl sm:px-6 px-2 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center pt-64 pb-52">
              <ClipLoader speedMultiplier="0.5" size="50px" />
            </div>
          ) : filterPosts.length == 0 ? (
            <div className="text-4xl pt-24  text-red-500 flex justify-center">Posts Not Found</div>
          ) : (
            <div className="mx-auto pt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  border-gray-200  sm:pt-16  md:mx-0 md:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {filterPosts.map(
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
      </div>
    </div>
  );
}

export default SearchQuery;
