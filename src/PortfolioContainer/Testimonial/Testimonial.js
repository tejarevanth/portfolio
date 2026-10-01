import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Testimonial.css";

// Replace with real feedback from people you have worked with
const testimonials = [
  {
    comment:
      "A short quote from a client, manager or colleague about working with you.",
    name: "Client Name",
    position: "Position, Company",
    photo: "img/Testimonial/lady.png",
  },
  {
    comment:
      "A short quote from a client, manager or colleague about working with you.",
    name: "Client Name",
    position: "Position, Company",
    photo: "img/Testimonial/lady.png",
  },
  {
    comment:
      "A short quote from a client, manager or colleague about working with you.",
    name: "Client Name",
    position: "Position, Company",
    photo: "img/Testimonial/lady.png",
  },
  {
    comment:
      "A short quote from a client, manager or colleague about working with you.",
    name: "Client Name",
    position: "Position, Company",
    photo: "img/Testimonial/lady.png",
  },
];

export default function Testimonial(props) {
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

  const options = {
    loop: true,
    margin: 0,
    nav: true,
    animateIn: "bounceInRight",
    animateOut: "bounceOutRight",
    dots: true,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: { items: 1 },
      768: { items: 1 },
      1000: { items: 3 },
    },
  };

  return (
    <div>
      <ScreenHeading
        title="Testimonial"
        subHeading="What My Client Say About Me"
      />
      <section className="testimonial-section fade-in" id={props.id || ""}>
        <div className="container">
          <div className="row">
            <OwlCarousel
              className="owl-carousel"
              id="testimonial-carousel"
              {...options}
            >
              {testimonials.map((testimonial, index) => (
                <div className="col-lg-12" key={index}>
                  <div className="testi-item">
                    <div className="testi-comment">
                      <p>
                        <i className="fa fa-quote-left" />
                        {testimonial.comment}
                        <i className="fa fa-quote-right" />
                      </p>
                      <ul className="stars list-unstyled">
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star-half-o" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                      </ul>
                    </div>
                    <div className="client-info">
                      <img
                        src={`${process.env.PUBLIC_URL}/${testimonial.photo}`}
                        alt="no internet connection"
                      />
                      <h5>{testimonial.name}</h5>
                      <p>{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </section>
      <div className="footer-image">
        <img
          src={require("../../assets/Testimonial/shape-bg.png")}
          alt="no internet connection"
        />
      </div>
    </div>
  );
}
