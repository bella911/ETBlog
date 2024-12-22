import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../css/swiperStyle.css";
import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";

export default function SlidePosts() {
  const [posts, setPosts] = useState([]);
  // get all posts
  useEffect(() => {

    axios
      .get("/post/getAllPosts")
      .then((res) => {
        // setForYouPosts(res.data.data);
        setPosts(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="pt-4">
      <Swiper
        className="mySwiper"
        pagination={{
          clickable: true,
        }}
        parallax={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        modules={[Pagination, Autoplay, Parallax]}
        slidesPerView={1}
        loop={true}
        // onSlideChange={() => console.log("slide change")}
        // style={{
        //   paddingTop: "20px",
        // }}
      >
        <div
          slot="container-start"
          className="parallax-bg "
          style={{
            backgroundImage:
              // "url(https://swiperjs.com/demos/images/nature-1.jpg)",
              "url(https://media.istockphoto.com/id/1345527119/video/graphical-modern-digital-world-news-studio-loop-background.jpg?s=640x640&k=20&c=cr1SYYf7Dix-TgBqiYRLquAmi7TgEE3oZcMUExQ25QY=)",
          }}
          data-swiper-parallax="-23%"
        ></div>
          {posts.map(
            ({ _id, title, description, createdAt, image, author }, index) => (
              index < 3 &&  // news length not greater than 3
              <SwiperSlide key={_id} className="backdrop-blur-sm">
               <div className="flex-col justify-center text-start items-end px-4 text-gray-200  ">
                <div className="title" data-swiper-parallax="-300">
                 <Link to={`/posts/${_id}`} className="hover:underline">{title?.toUpperCase()}</Link>
                </div>
                {/* <div className="author" data-swiper-parallax="-200">
                  {author}
                </div> */}
                <div className="" data-swiper-parallax="-100">
                  <p className="leading-8 line-clamp-5 text-start w-[80%] " dangerouslySetInnerHTML={{ __html: description }}/>
                </div>
               </div>
              </SwiperSlide>
            )
          )}
      </Swiper>
    </div>
  );
}
