import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../css/swiperStyle.css";
export default function SlidePosts() {
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
        style={{
          paddingTop: "20px"
        }}
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
        <SwiperSlide className="flex-col justify-start">
          <div>
            <span className="md:w-[50%] w-100% ">
              <a href="/hell">
                <img src={""} alt="" className="w-12 h-2" />
              </a>
            </span>
            <span className="flex-1">
              <a href="https://www.google.com/">Google</a>
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide >
          <div className="flex-col justify-center text-start items-end px-4 text-gray-300  ">
            <div className="title" data-swiper-parallax="-300">
              Slide 1
            </div>
            <div className="subtitle" data-swiper-parallax="-200">
              Subtitle
            </div>
            <div className="text " data-swiper-parallax="-100">
              <p className="leading-5 ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam dictum mattis velit, sit amet faucibus felis iaculis
                nec. Nulla laoreet justo vitae porttitor porttitor.
                Suspendisse in sem justo. Integer laoreet magna nec elit
                suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at
                elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula
                nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean
                feugiat non eros quis feugiat.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
