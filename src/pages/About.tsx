
import Wrapper from '../sections/Wrapper';
import profilePicture from "../assets/Harkin-sam.jpeg"
import { FaGithub } from 'react-icons/fa';

function About() {
  return (
    <div className='profile'>
      <img src={profilePicture} alt="profile-picture"  className='profile-image' />

      <h1 className="profile-text"> Hi I'm Samuel</h1>
      <h2 className="profile-text">The creator of this awesome pokemon app</h2>
      <h4 className="profile-text">This project is created for learning purpose.</h4>

      <div className="profile-links">
        <a href="https://github.com/Harkin-sam"><FaGithub /></a>
      </div>
    </div>
  )
}

export default Wrapper(About); // wrapper used here to engulf the child component