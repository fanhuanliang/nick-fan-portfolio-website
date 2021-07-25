import Head from 'next/head'
import Navbar from "../components/Navbar/Navbar";
import AboutMe from "../components/AboutMe/AboutMe";
import Projects from "../components/Projects/Projects";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import "semantic-ui-css/semantic.min.css";

export default function Home() {

  return (
    <div>
      <Head>
        <title>My Portfolio</title>
        <meta name="keywords" content="typescript next.js portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Main />
      <Navbar />
      <AboutMe />
      <Projects />
      <Contact />
      {/* <Footer /> */}
    </div>
  );
}
