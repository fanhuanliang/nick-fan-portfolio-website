import '../styles/globals.css'
import Header from '../components/Header'
import Content from '../components/Content/Content'
import Projects from '../components/Projects/Projects'
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Component {...pageProps} />
    <Header />
    <Content />
    <Projects />
    <Contact />
    <Footer />
    </>
  )
}

export default MyApp
