import Hero from "../components/Hero"
import Feature from "../components/Feature";
import Application from "../components/AppDemo";
import FAQ from "../components/FAQ";
import Blog from "../components/Blog";
import React, { useEffect } from "react";
import { ThemeProvider } from "../components/elements/Darkmode/ThemeContext";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer/Footer";
import { Price } from "../components/Price/Price";
import { About } from "../components/About/About";

import Back2TopButton from "../components/elements/common/Back2TopButton";
import "aos/dist/aos.css";
import Aos from "aos";
import "react-toastify/dist/ReactToastify.css";
export default function index() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);
  return (
    <>
      <ThemeProvider>
        <Hero />
        <Feature />
        <Application />
        <FAQ />
        <Blog />
        <Price />
        <About />
        <Contact />
        <Footer />
        <Back2TopButton />
      </ThemeProvider>
    </>
  );
}
