import styleAbout from "../../styles/About.module.css";

export default function AboutMe() {
  return (
    <div className={styleAbout.about} id="about">
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
              I am a full-stack software engineer with a background in Sales and
              Business. I am pursuing my passion for tech through a full-time
              opportunity as a Software Engineer. I like
              solving problems and delivering clean code on time. Please contact
              me if you rre looking for a passionate Software Engineer.
              <br></br>When I am not coding, I enjoy playing basketball,
              cooking, traveling, and playing guitar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
