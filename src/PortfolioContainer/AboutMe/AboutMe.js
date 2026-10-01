import React, { useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./AboutMe.css";

export default function AboutMe(props) {
  // Fade this screen in the first time it scrolls into view
  useEffect(() => {
    const fadeInScreenHandler = (screen) => {
      if (screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
    };

    const fadeInSubscription =
      ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

    return () => fadeInSubscription.unsubscribe();
  }, [props.id]);

  const SCREEN_CONSTANTS = {
    description:
      "Full stack developer experienced in building web applications with ASP.NET Core, Angular and React, from interactive front ends to secure, scalable back-end services. I enjoy turning designs into polished products and am eager to be an asset to a growing team.",
    highlights: {
      bullets: [
        "Full Stack web development",
        "Interactive front end as per the design",
        "Angular and React",
        "React Native for cross-platform apps",
        "Building REST APIs with ASP.NET Core",
        "Managing databases",
      ],
      heading: "Here are a Few Highlights:",
    },
  };

  const renderHighlights = () => {
    return SCREEN_CONSTANTS.highlights.bullets.map((value, i) => (
      <div className="highlight" key={i}>
        <div className="highlight-blob"></div>
        <span>{value}</span>
      </div>
    ));
  };

  return (
    <div className="about-me-container screen-container fade-in" id={props.id || ""}>
      <div className="about-me-parent">
        <ScreenHeading title="About Me" subHeading="Why Choose Me?" />
        <div className="about-me-card">
          <div className="about-me-profile"></div>
          <div className="about-me-details">
            <span className="about-me-description">
              {SCREEN_CONSTANTS.description}
            </span>
            <div className="about-me-highlights">
              <div className="highlight-heading">
                <span>{SCREEN_CONSTANTS.highlights.heading}</span>
              </div>
              {renderHighlights()}
            </div>
            <div className="about-me-options">
              <button
                className="btn primary-btn"
                onClick={() => ScrollService.scrollHandler.scrollToHireMe()}
              >
                Hire Me
              </button>
              <a
                href={`${process.env.PUBLIC_URL}/resume.docx`}
                download="Teja_Revanth_Azure_Angular_.NET_Developer.docx"
              >
                <button className="btn highlighted-btn">Get Resume</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
