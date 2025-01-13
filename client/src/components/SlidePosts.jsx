import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../css/swiperStyle.css";
import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function SlidePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // get all posts
  useEffect(() => {
   const fetchData = () => {
    axios
      .get("/post/getAllPosts")
      .then((res) => {
        // setForYouPosts(res.data.data);
        setPosts(res.data.data);
        // console.log(res.data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    }
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);

  }, []);

  return (
    <div className="pt-4 px-2 md:h-full h-[300px]">
      <Swiper
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        parallax={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        modules={[Pagination, Autoplay, Parallax]}
        slidesPerView={1}
        loop={true}
      >
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            backgroundImage:
              // "url(https://swiperjs.com/demos/images/nature-1.jpg)",
              "url(https://media.istockphoto.com/id/1345527119/video/graphical-modern-digital-world-news-studio-loop-background.jpg?s=640x640&k=20&c=cr1SYYf7Dix-TgBqiYRLquAmi7TgEE3oZcMUExQ25QY=)",
          }}
          data-swiper-parallax="-23%"
        > </div>
        {loading ? (
          <div className="flex justify-center items-center mt-64 mb-52">
            <ClipLoader speedMultiplier="0.5" size="40px" />
          </div>
          ) : (
          <>
            {posts.map(
              ({ _id, title, description, createdAt, image, author }, index) =>
                index < 3 && ( // news length not greater than 3
                  <SwiperSlide key={_id} className="backdrop-blur-sm">
                    <div className="flex-col justify-center text-start items-end sm:px-4 px-2  ">
                      <div className="title my-4 " data-swiper-parallax="-300">
                        <Link
                          to={`/posts/${_id}`}
                          className="hover:underline text-4xl md:8xl text-gray-300 line-clamp-1 "
                        >
                          {title?.toUpperCase()}
                        </Link>
                      </div>
                      {/* <div className="author" data-swiper-parallax="-200">
                  {author}
                </div> */}
                      <div className="" data-swiper-parallax="-100">
                        <p
                          className="sm:leading-8 line-clamp-6  text-start md:w-[80%]  sm:text-xl text-base text-gray-200"
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )
            )}
          </>
        )}
      </Swiper>
    </div>
  );
}
