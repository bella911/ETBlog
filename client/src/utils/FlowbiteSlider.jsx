import React from 'react'
import { Carousel } from "flowbite-react";
import Meditation from "../images/meditation.png"
import Team from "../images/TeamWork.jpg"
function FlowbiteSlider() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 sm:my-[75px] my-8">
    <Carousel slide={false}>
      <div className="flex justify-between  items-center gap-16   flex-col  md:flex-row ">
        <div className="flex-1">
          <img
            className="w-[600px] border-[1px] border-r-0 rounded-l-lg  rounded-br-[60%] "
            src={Meditation}
            alt="group-developer"
          />
        </div>
        <div className="lg:w-2/5 ">
          <h4 className="text-2xl">
            Stay focused on your business. Let us handle the design.
          </h4>
          <p>
            You have a business to run. Stop worring about cross-browser
            bugs, designing new pages, keeping your components up to date.
            Let us do that for you.
          </p>
        </div>
      </div>
      <div className="flex justify-between  items-center gap-16   flex-col  md:flex-row ">
        <div className="flex-1">
          <img
            className="w-[600px] border-[1px] border-r-0 rounded-l-lg  rounded-br-[60%]"
            src={Team}
            alt="group-developer"
          />
        </div>
        <div className="lg:w-2/5">
          <h4 className="text-2xl">
            Stay focused on your business. Let us handle the design.
          </h4>
          <p>
            You have a business to run. Stop worring about cross-browser
            bugs, designing new pages, keeping your components up to date.
            Let us do that for you.
          </p>
        </div>
      </div>
    </Carousel>
  </div>
  )
}

export default FlowbiteSlider