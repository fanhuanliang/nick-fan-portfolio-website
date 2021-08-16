import github from "../images/github.svg";
import linkedIn from "../images/linkedin.svg";
import email from "../images/email.svg";
import Image from "next/image";
import styleFooter from "../../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styleFooter.footer}>
      <div className={styleFooter.container_footer}>
        <div className={styleFooter.flex_footer}>
          <div className="github">
            <a
              href="https://github.com/fanhuanliang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image className="img-responsive" src={github} alt="" />
            </a>
          </div>

          {/* <div className="linkedin">
            <a
              href="https://www.linkedin.com/in/fanhuanliang/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image className="img-responsive" src={linkedIn} alt="linkedin" />
            </a>
          </div> */}

          <div className="email-icon">
            <a
              href="mailto:nick.fan.sde@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image className="img-responsive" src={email} alt="email" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
