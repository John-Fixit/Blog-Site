import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.css"
import Navbar from '../Components/navbar'
import Head from 'next/head'
// import "bootstrap/dist/js/bootstrap.js"
import "react-toastify/dist/ReactToastify.css";


function MyApp({ Component, pageProps }) {

  return (<>
      <Head>
        <title>Blog Site</title>
      </Head>
      <Navbar />
     <Component {...pageProps} />
  </>
  )
}

export default MyApp
