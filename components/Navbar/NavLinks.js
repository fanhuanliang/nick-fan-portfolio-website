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
        <Link
          activeClass="active"
          to="contact"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Resume
        </Link>
      </li>
    </ul>
  );
}

export default NavLinks
