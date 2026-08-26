import styleAbout from "../../styles/About.module.css";
import Image from "next/image";
import TechStacks from "./TechStacks";
import { logo } from "../../lib/data";

export default function AboutMe() {
  return (
    <div className={styleAbout.about} id="about">
      <div className={styleAbout.wrapper}>
        <div className={styleAbout.img}>
          <Image
            src="/images/IMG_1857.png"
            alt="selfie"
            fill
            sizes="(max-width: 600px) 120px, 150px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styleAbout.container_about}>
          <div className="row">
            <div className="col-sm-12 col-md-12 text-center">
              <div className={styleAbout.about_header}>
                <h1>About Me</h1>
              </div>
            </div>
          </div>

          <div className="row">
            <div className={styleAbout.description}>
              <p className={styleAbout.paragraph}>
                I am a full-stack software engineer, and pursuing my passion for
                tech through a full-time opportunity as a Software Engineer. I
                like solving problems and delivering clean code on time. I
                particularly enjoy working on the front end, especially with
                React, and love the satisfaction that comes with bringing an
                idea to life.
                <br></br>When I am not coding, I enjoy playing basketball,
                cooking, traveling, and playing guitar.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styleAbout.tech}>
        <h1 className={styleAbout.techHeader}>Technologies</h1>
        <div className={styleAbout.techRow}>
          {logo.map((item) => (
            <TechStacks key={item.id} logoLink={item.link} />
          ))}
        </div>
      </div>
    </div>
  );
}
