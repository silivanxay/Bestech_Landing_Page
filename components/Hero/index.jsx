import React from "react";
import Navbar from "./Navbar";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
const Hero = () => {
  return (
    <>
      <Navbar />
      <section className="relative overflow-hidden transition-all md:pt-5 bg-image-light dark:bg-image-dark">
        <div data-aos="fade-up" className="flex flex-wrap">
          <div className="md:w-1/2 md:pt-20 z-2 relative">
            <LeftSide />
          </div>
          <div className="md:w-1/2 z-1 overflow-hidden relative">
            <RightSide />
          </div>
        </div>
      </section>
    </>
  );
};
export default Hero;
