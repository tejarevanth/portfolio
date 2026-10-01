import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import ScrollService from '../../../utilities/ScrollService';
import './Profile.css';

export default function Profile() {
  const [typeEffect] = useTypewriter({
    words: [
      'Enthusiastic Dev 😎',
      'Full Stack Developer 💻',
      'NextJS Developer 💠',
      'ASP.NET Core Dev 🟪',
      'Cross Platform Dev 📱',
      'React/React-Native Dev ⚛️',
      'Angular Dev 🅰️',
    ],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 40,
  });

  return (
    <div className='profile-container'>
      <div className='profile-parent'>
        <div className='profile-details'>
          <div className='colz'>
            <div className='colz-icon'>
              <a href='https://www.facebook.com/'>
                <i className='fa fa-facebook-square'></i>
              </a>
              <a href='mailto:youremail@gmail.com'>
                <i className='fa fa-envelope-square'></i>
              </a>
              <a href='https://www.linkedin.com/'>
                <i className='fa fa-linkedin-square'></i>
              </a>
              <a href='https://www.instagram.com/'>
                <i className='fa fa-instagram'></i>
              </a>
            </div>
          </div>

          <div className='profile-details-name'>
            <span className='primary-text'>
              {' '}
              Hello, I'M <span className='highlighted-text'>Teja Revanth Adabala</span>
            </span>
          </div>

          <div className='profile-details-role'>
            <span className='primary-text'>
              {' '}
              <h1>
                <span>{typeEffect}</span>
                <Cursor />
              </h1>
              <span className='profile-role-tagline'>
                Expert in building applications using front and back end Technologies.
              </span>
            </span>
          </div>

          <div className='profile-options'>
            <button
              className='btn primary-btn'
              onClick={() => ScrollService.scrollHandler.scrollToHireMe()}
            >
              Hire Me
            </button>
            <a href={`${process.env.PUBLIC_URL}/resume.docx`} download='Teja_Revanth_Azure_Angular_.NET_Developer.docx'>
              <button className='btn highlighted-btn'>Get Resume</button>
            </a>
          </div>
        </div>

        <div className='profile-picture'>
          <div className='profile-picture-background'></div>
        </div>
      </div>
    </div>
  )
}
