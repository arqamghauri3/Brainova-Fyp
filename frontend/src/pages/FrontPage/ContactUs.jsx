import ContactPageComponents from "@/components/LandingPage/ContactPageComponents";
import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import React from "react";
import { useSelector } from "react-redux";

function ContactUs() {
  return (
    <>
      <ContactPageComponents />
      <Footer />
    </>
  );
}

export default ContactUs;
