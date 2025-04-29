import React from "react";
import Navbar from "../../components/LandingPage/Navbar";
import HeroSection from "../../components/LandingPage/HeroSection";
import AboutSection from "../../components/LandingPage/AboutSection";
import FeaturesSection from "../../components/LandingPage/FeaturesSection";
import TeamSection from "../../components/LandingPage/TeamSection";
import Footer from "../../components/LandingPage/Footer";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <TeamSection />
      <Footer />
    </>
  );
};

export default LandingPage;
