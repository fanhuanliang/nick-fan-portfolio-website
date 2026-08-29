import AboutMe from "../components/AboutMe/AboutMe";
import Certificate from "../components/Certificate/Certificate";
import Contact from "../components/Contact/Contact";
import Experience from "../components/Experience/Experience";
import Main from "../components/Main/Main";
import Navbar from "../components/Navbar/Navbar";
import Projects from "../components/Projects/Projects";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to main content
      </a>
      <Main />
      <Navbar />
      <main id="content" tabIndex={-1}>
        <AboutMe />
        <Experience />
        <Certificate />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
