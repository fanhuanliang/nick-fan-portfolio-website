import React from 'react'
import { Link }from "react-scroll";

const NavLinks = () => {
  return (
    <ul>
      <li>
        <Link
          activeClass="active"
          to="main"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          activeClass="active"
          to="about"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          activeClass="active"
          to="projects"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Portfolio
        </Link>
      </li>
      <li>
        <Link
          activeClass="active"
          to="contact"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Contact
        </Link>
      </li>
      <li>
        <a
          href="https://drive.google.com/file/d/1-rqlhJ5eFtOXDghiItNsGIdtbrAKMDvH/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
      </li>
    </ul>
  );
}

export default NavLinks
