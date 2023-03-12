import React, { useEffect } from "react";
import { ThemeProvider } from "../components/elements/Darkmode/ThemeContext";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import Navbar from "../components/Hero/Navbar";
import Hero from "../components/Hero"
import Feature from "../components/Feature";
import Out_team from "../components/Out_Team/Out_team";
import { useState } from "react";
import Contact from "../components/Contact/Contact";
import { Footer } from "../components/Footer/Footer";
import { About } from "../components/About/About";

export default function index() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  const [Time, setTime] = useState(1)
  if (Time === 1) {
    setTimeout(() => {
      setTime(Time + 1)
    }, 1000)
  } else if (Time === 2) {
    setTimeout(() => {
      setTime(Time + 1)
    }, 1000)
  } else if (Time === 3) {
    setTimeout(() => {
      setTime(Time + 1)
    }, 1000)
  } else if (Time === 4) {
    setTimeout(() => {
      setTime(Time + 1)
    }, 1000)
  }

  if (Time > 3) {
    return (
      <>
        <ThemeProvider>
          <div className={`SEO${Time === 4 ? 4 : 5}`}><Navbar /></div>
          <div className={`SEO${Time === 4 ? 4 : 5} overflow-hidden`}>
            <Hero />
            <Out_team />
            <About />
            <Contact />
            <Footer />
          </div>
        </ThemeProvider>
      </>
    );
  } else {
    return (
      <>
        <ThemeProvider>
          <div className='w-full h-screen flex justify-center items-center overflow-hidden'>
            {/* <span className={`SEO ${Time} md:inline hidden font-bold font-lg dark:text-white text-black`}>WelCome to Bestech</span>
            <span className={`md:hidden inline font-bold font-lg dark:text-white text-black`}>Welcome to Bestech</span> */}

            <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
              <div class="w-full ">
                <div class="h-[50px] w-[200px] xl:w-[400px] bg-gray-200 rounded-lg dark:bg-gray-700 mb-4 flex items-center pl-5">Loading...</div>
                <div class="h-[30px] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div class="h-[30px] w-[50px] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              </div>
              <div className="w-full lg:py-0 py-20">
                <div class="flex items-center justify-center h-[200px] w-[200px] bg-gray-300 rounded-full dark:bg-gray-700">
                  <svg class="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" alt=''/></svg>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </>
    );
  }

}
