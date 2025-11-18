import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CourseCarousel from "../components/CourseCarousel";
import MissionSection from "../components/MissionSection";
import ConnectSection from "../components/ConnectSection";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <section id="home">
          <HeroSection />
        </section>

        <section id="courses">
          <CourseCarousel />
        </section>

        <section id="mission">
          <MissionSection />
        </section>

        <section id="community">
          <ConnectSection />
        </section>

        <section id="faq">
          <FAQ />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
