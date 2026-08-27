import AboutMe from "../components/AboutMe/AboutMe";
import Contact from "../components/Contact/Contact";
import Experience from "../components/Experience/Experience";
import Main from "../components/Main/Main";
import Navbar from "../components/Navbar/Navbar";
import Projects from "../components/Projects/Projects";

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
