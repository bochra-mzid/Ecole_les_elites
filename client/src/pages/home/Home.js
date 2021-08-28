import { useState, useEffect } from "react";
import Navigation from "../../components/navigation.js";
import Header from "../../components/header.js";
import About  from "../../components/about.js";
import Services  from "../../components/Services/Services.js";
import Gallery  from "../../components/Gallery/Gallery.js";
import Revenu  from "../../components/Revenu/Revenu.js";
import Club from "../../components/Club/Club.js";
import Contact from "../../components/contact.js";
import JsonData from "../../data/data.json";
import SmoothScroll from "smooth-scroll";
import "../../App.css";


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

export default function Home() {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery />
      <Revenu />
      <Club data={landingPageData.Club} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};
