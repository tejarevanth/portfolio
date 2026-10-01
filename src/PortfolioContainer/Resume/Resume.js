import React, { useState, useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Resume.css";

// Reusable block for one resume entry: heading, dates, sub-heading and description
const ResumeHeading = (props) => {
  return (
    <div className="resume-heading">
      <div className="resume-main-heading">
        <div className="heading-bullet"></div>
        <span>{props.heading ? props.heading : ""}</span>
        {props.fromDate && props.toDate ? (
          <div className="heading-date">
            {props.fromDate + "-" + props.toDate}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="resume-sub-heading">
        <span>{props.subHeading ? props.subHeading : ""}</span>
      </div>
      <div className="resume-heading-description">
        <span>{props.description ? props.description : ""}</span>
      </div>
    </div>
  );
};

export default function Resume(props) {
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffsetStyle, setCarousalOffsetStyle] = useState({});

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

  /* ---------- Static data ---------- */

  // Side menu of the resume; icons live in src/assets/Resume/
  const resumeBullets = [
    { label: "Education", logoSrc: "education.svg" },
    { label: "Work History", logoSrc: "work-history.svg" },
    { label: "Programming Skills", logoSrc: "programming-skills.svg" },
    { label: "Projects", logoSrc: "projects.svg" },
    { label: "Interests", logoSrc: "interests.svg" },
  ];

  // Skill progress bars: set ratingPercentage to your own level
  const programmingSkillsDetails = [
    { skill: "C#", ratingPercentage: 85 },
    { skill: "ASP.NET Core", ratingPercentage: 85 },
    { skill: "Angular", ratingPercentage: 80 },
    { skill: "React JS", ratingPercentage: 75 },
    { skill: "JavaScript", ratingPercentage: 80 },
    { skill: "TypeScript", ratingPercentage: 80 },
    { skill: "SQL Server", ratingPercentage: 75 },
    { skill: "Azure", ratingPercentage: 70 },
    { skill: "HTML", ratingPercentage: 85 },
    { skill: "CSS", ratingPercentage: 80 },
  ];

  // Projects: replace with the projects you have worked on
  const projectsDetails = [
    {
      title: "Personal Portfolio Website",
      duration: { fromDate: "2026", toDate: "2026" },
      description:
        "A personal portfolio website to showcase all my details and projects in one place.",
      subHeading: "Technologies Used: React JS",
    },
    {
      title: "Project Name",
      duration: { fromDate: "YYYY", toDate: "YYYY" },
      description: "Short description of what the project does.",
      subHeading: "Technologies Used: ...",
    },
    {
      title: "Project Name",
      duration: { fromDate: "YYYY", toDate: "YYYY" },
      description: "Short description of what the project does.",
      subHeading: "Technologies Used: ...",
    },
  ];

  // Content shown for each resume bullet
  const resumeDetails = [
    <div className="resume-screen-container" key="education">
      <ResumeHeading
        heading="University Name"
        subHeading="Degree, e.g. BACHELOR OF TECHNOLOGY IN COMPUTER SCIENCE"
        fromDate="YYYY"
        toDate="YYYY"
      />
      <ResumeHeading
        heading="Certification / Course Name"
        subHeading="Certification details"
        fromDate="YYYY"
        toDate="YYYY"
      />
      <ResumeHeading
        heading="High School Name"
        subHeading="Science stream / board"
        fromDate="YYYY"
        toDate="YYYY"
      />
    </div>,

    <div className="resume-screen-container" key="work-experience">
      <div className="experience-container">
        <ResumeHeading
          heading="Company Name"
          subHeading="FULL STACK .NET DEVELOPER"
          fromDate="YYYY"
          toDate="Present"
        />
        <div className="experience-description">
          <span className="resume-description-text">
            One-line summary of your current role.
          </span>
        </div>
        <div className="experience-description">
          <span className="resume-description-text">
            - Key achievement or responsibility #1.
          </span>
          <br />
          <span className="resume-description-text">
            - Key achievement or responsibility #2.
          </span>
          <br />
          <span className="resume-description-text">
            - Key achievement or responsibility #3.
          </span>
          <br />
        </div>
      </div>
    </div>,

    <div
      className="resume-screen-container programming-skills-container"
      key="programming-skills"
    >
      {programmingSkillsDetails.map((skill, index) => (
        <div className="skill-parent" key={index}>
          <div className="heading-bullet"></div>
          <span>{skill.skill}</span>
          <div className="skill-percentage">
            <div
              style={{ width: skill.ratingPercentage + "%" }}
              className="active-percentage-bar"
            ></div>
          </div>
        </div>
      ))}
    </div>,

    <div className="resume-screen-container" key="projects">
      {projectsDetails.map((project, index) => (
        <ResumeHeading
          key={index}
          heading={project.title}
          subHeading={project.subHeading}
          description={project.description}
          fromDate={project.duration.fromDate}
          toDate={project.duration.toDate}
        />
      ))}
    </div>,

    // Interests: replace with your own
    <div className="resume-screen-container" key="interests">
      <ResumeHeading
        heading="Interest #1 (e.g. Teaching)"
        description="A sentence about why you enjoy it."
      />
      <ResumeHeading
        heading="Interest #2 (e.g. Music)"
        description="A sentence about why you enjoy it."
      />
      <ResumeHeading
        heading="Interest #3 (e.g. Competitive Gaming)"
        description="A sentence about why you enjoy it."
      />
    </div>,
  ];

  /* ---------- Carousel ---------- */

  // Slide the details up by one screen height per bullet
  const handleCarousal = (index) => {
    let offsetHeight = 360;

    let newCarousalOffset = {
      style: { transform: "translateY(" + index * offsetHeight * -1 + "px)" },
    };

    setCarousalOffsetStyle(newCarousalOffset);
    setSelectedBulletIndex(index);
  };

  const getBullets = () => {
    return resumeBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={
          index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"
        }
        key={index}
      >
        <img
          className="bullet-logo"
          src={require(`../../assets/Resume/${bullet.logoSrc}`)}
          alt="no internet connection"
        />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };

  const getResumeScreens = () => {
    return (
      <div
        style={carousalOffsetStyle.style}
        className="resume-details-carousal"
      >
        {resumeDetails.map((resumeDetail) => resumeDetail)}
      </div>
    );
  };

  return (
    <div className="resume-container screen-container fade-in" id={props.id || ""}>
      <div className="resume-content">
        <ScreenHeading title="Resume" subHeading="My formal Bio Details" />
        <div className="resume-card">
          <div className="resume-bullets">
            <div className="bullet-container">
              <div className="bullet-icons"></div>
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>

          <div className="resume-bullet-details">{getResumeScreens()}</div>
        </div>
      </div>
    </div>
  );
}
