import Navbar from "../components/Navbar/Navbar";
import AboutMe from "../components/AboutMe/AboutMe";
import Projects from "../components/Projects/Projects";
import Contact from "../components/Contact/Contact";
import Main from "../components/Main/Main";
import Experience from "../components/Experience/Experience";

export default function Home() {
  return (
    <>
      <Main />
      <Navbar />
      <AboutMe />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
