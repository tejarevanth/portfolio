import React, { useState, useEffect } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import axios from "axios";
import { toast } from "react-toastify";
import imgBack from "../../assets/ContactMe/mailz.jpeg";
import load1 from "../../assets/ContactMe/load2.gif";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./ContactMe.css";

export default function ContactMe(props) {
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [banner, setBanner] = useState("");
  const [bool, setBool] = useState(false); // true while the email is sending

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault(); // stop the page from reloading

    if (name.length === 0 || email.length === 0 || message.length === 0) {
      const msg = "Please fill all the fields";
      setBanner(msg);
      toast.error(msg);
      return;
    }

    try {
      let data = { name, email, message };
      setBool(true);
      const res = await axios.post(`/contact`, data);

      if (res.status === 200) {
        setBanner(res.data.msg);
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      const msg =
        error.response?.data?.msg || "Couldn't send your message. Please try again.";
      setBanner(msg);
      toast.error(msg);
    } finally {
      setBool(false);
    }
  };

  const [typeEffect] = useTypewriter({
    words: ["Get In Touch 📧"],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 40,
  });

  return (
    <div className="main-container fade-in" id={props.id || ""}>
      <ScreenHeading subHeading="Let's Keep In Touch" title="Contact Me" />
      <div className="central-form">
        <div className="col">
          <h2 className="title">
            <span>{typeEffect}</span>
            <Cursor />
          </h2>
          <div className="colz-icon">
            <a href="https://www.facebook.com/">
              <i className="fa fa-facebook-square"></i>
            </a>
            <a href="mailto:youremail@gmail.com">
              <i className="fa fa-envelope-square"></i>
            </a>
            <a href="https://www.linkedin.com/">
              <i className="fa fa-linkedin-square"></i>
            </a>
            <a href="https://www.instagram.com/">
              <i className="fa fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="back-form">
          <div className="img-back">
            <h4>Send Your Email Here!</h4>
            <img src={imgBack} alt="not found" />
          </div>

          <form onSubmit={submitForm}>
            <p>{banner}</p>

            <label htmlFor="name">Name</label>
            <input id="name" type="text" onChange={handleName} value={name} />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              onChange={handleEmail}
              value={email}
            />

            <label htmlFor="message">Message</label>
            <textarea id="message" onChange={handleMessage} value={message} />

            <div className="send-btn">
              <button type="submit">
                send
                <i className="fa fa-paper-plane" />
                {bool ? (
                  <b className="load">
                    <img src={load1} alt="loading" />
                  </b>
                ) : (
                  ""
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
