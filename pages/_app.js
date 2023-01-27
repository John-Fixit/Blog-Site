import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.css"
import Navbar from '../Components/navbar'
import Head from 'next/head'
// import "bootstrap/dist/js/bootstrap.js"
import "react-toastify/dist/ReactToastify.css";
import Script from 'next/script';
import axios from 'axios';
import { SWRConfig } from 'swr';


function MyApp({ Component, pageProps }) {

  const fetcher = (url)=>axios.get(url).then((res)=>res.data)
  return (<>
      <Head>
        <title>Blog Site</title>
        {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script> */}
      </Head>
        <Script  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></Script>
      <Navbar />

      <SWRConfig
        value={{
          fetcher:fetcher
        }}>
     <Component {...pageProps} />
      </SWRConfig>
  </>
  )
}

export default MyApp
