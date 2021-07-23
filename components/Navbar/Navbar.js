import Link from "next/link";
import styleNavbar from "../../styles/Navbar.module.css";
import * as Scroll from "react-scroll";
const ScrollLink = Scroll.Link;

const Navbar = () => {

  return (
    <div className={styleNavbar.navigation}>
      <div className="container-fluid">
        <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11 text-right">
          <div className={styleNavbar.primary_nav}>
            <ul>
              <li>
                <ScrollLink
                  activeClass="active"
                  to="main"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  activeClass="active"
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  About
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  activeClass="active"
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Contact
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  activeClass="active"
                  to="projects"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Portfolio
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  activeClass="active"
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Resume
                </ScrollLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
