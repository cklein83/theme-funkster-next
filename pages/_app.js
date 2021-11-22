
import { useEffect } from "react";

import Head from "next/head";

import { useRouter } from 'next/router';

/*
// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'
*/

import 'bootstrap-icons/font/bootstrap-icons.css';

// own css files here
import '../styles/custom.scss';


function MyApp({ Component, pageProps }) {

  /*
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.js')

    new WOW().init()

    var Scroll = require('react-scroll');
    var scroller = Scroll.scroller;

    console.log("use effect !!!!!*!******!!*!")

    if (window.location.hash) {
        let jumpToSection = window.location.hash.substr(1)
        //console.log("jump: " + jumpToSection)
        scroller.scrollTo(jumpToSection, {
            duration: 100,
            smooth: true
        })
    }
    console.log("Page loaded.")

  }, []);
*/

  useEffect(() => {

      import('bootstrap/dist/js/bootstrap.js')

      new WOW().init()
  }, []);

  useEffect(() => {
      const hash = window.location.hash
      if (hash) {
          setTimeout(()=> {
            document
              .querySelector(hash)
              .scrollIntoView({ behavior: "smooth" })
          }, 100)
      }
  })
  


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" />
        <script src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js" async={true}></script>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css" />
        <script type="text/javascript" src="/js/wow.min.js" async={true}></script>

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Birthstone+Bounce:wght@500&amp;family=Open+Sans:wght@800&amp;family=Roboto+Condensed:wght@700&amp;display=swap" rel="stylesheet" />


      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
