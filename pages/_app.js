import '../styles/globals.css'
import Header from '../components/Header'
import Content from '../components/Content/Content'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Component {...pageProps} />
    <Header />
    <Content />
    </>
  )
}

export default MyApp
