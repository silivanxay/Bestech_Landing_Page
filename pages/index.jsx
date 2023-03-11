import React, { useEffect } from "react";
import { ThemeProvider } from "../components/elements/Darkmode/ThemeContext";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import Navbar from "../components/Hero/Navbar";
import Hero from "../components/Hero"
import Feature from "../components/Feature";
import Outeam from "../components/OutTeam/Outeam";
import { useState } from "react";
import Contack from "../components/Contack/Contact";
import { Footer } from "../components/Footer/Footer";
import { About } from "../components/About/About";
import Devalopment from "../components/Tools-of-development/devalopment";

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
    }, 2500)
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
          <div className={`SEO${Time === 4 ? 4 : 5}`}>
            <Hero />
            <Outeam />
            <About />
            <Contack />
            <Devalopment />
            <Footer />
          </div>
        </ThemeProvider>
      </>
    );
  } else {
    return (
      <>
        <ThemeProvider>
          <div className='w-full h-screen flex justify-center items-center'>
            <span className={`SEO${Time} md:inline hidden font-bold font-lg dark:text-white text-black`}>WelCome to Bestech</span>
            <span className={`md:hidden inline font-bold font-lg dark:text-white text-black`}>Welcome to Bestech</span>
          </div>
        </ThemeProvider>
      </>
    );
  }

}
