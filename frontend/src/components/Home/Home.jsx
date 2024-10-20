// import React, { useState } from 'react'
// import styleHome from './Home.module.css'
// import { Link } from 'react-router-dom'
// import ImageSlider from "./ImageSlider";
// import '../Donate/Donate'

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// export default function Home() {
//         const [showDonateForm, setShowDonateForm] = useState(false);
//         const handleDonateClick = () => {
//           setShowDonateForm(true);
//         };
//     return (
//         <>
//             <div >
//                 <ImageSlider />
//             </div>

// <div className={styleHome.plantes}>

//     <img className={styleHome.imageTree} src="images/plante.png" alt="" />

//     <div className={styleHome.plante}>
//         <h1>Plant Trees, Earn Rewards</h1>
//         <h2>At Shagara, we believe in the power of planting trees to restore nature, combat climate change, and foster sustainable communities. By joining us, you can make a tangible impact on the environment, one tree at a time. Earn rewards for every tree you plant, and be a part of Egypt's movement towards a greener, healthier future. Together, we can build a better planet for generations to come.</h2>
//         <button className={styleHome.know}>
//             <Link to="/trees" className={styleHome.planting}>plant trees</Link>
//         </button>
//     </div>

// </div>

//             <div className={styleHome.services}>

//                 <h1>our services</h1>

//                 <div className={styleHome.ourService}>
//                     <div className={styleHome.treeCard}>
//                         <img className={styleHome.imageCard} src="images/donateTree.png" alt="" />
//                         <h2>Support a Greener Future!</h2>
//                         <p>
//                             Your contribution makes a lasting impact on the environment.
//                             Lets grow together-donate now and plant the seeds of change!
//                         </p>
//                         <button className={styleHome.know}>
//                             <Link to="/donate" className={styleHome.planting}>Donate</Link>
//                         </button>
//                     </div>

//                     <div className={styleHome.treeCard}>
//                         <img className={styleHome.imageCard} src="images/buyTree.png" alt="" />
//                         <h2>Plant a Tree, Grow a Legacy!
//                         </h2>
//                         <p>
//                             Purchase a tree and be part of our mission to create a greener Egypt. Each tree you buy helps combat climate change and supports a healthier planet!
//                         </p>
//                         <button className={styleHome.know}>
//                             <Link to="/trees" className={styleHome.planting}>Buy</Link>
//                         </button>
//                     </div>

//                     <div className={styleHome.treeCard}>
//                         <img className={styleHome.imageCard} src="images/guidance.png" alt="" />
//                         <h2>Grow with Confidence!
//                         </h2>
//                         <p>
//                             Learn how to plant and care for your tree with our easy, step-by-step guide. Whether you're a beginner or an expert. Let’s plant together and make the earth a little greener!
//                         </p>
//                         {/* <button className={styleHome.know}>
//                             <Link to="/about" className={styleHome.planting}>Donate</Link>
//                         </button> */}
//                     </div>
//                 </div>
//                 {showDonateForm && <Donate onClose={() => setShowDonateForm(false)}/> }

//                 <div className={styleHome.join}>
//                     <h1>Join the Green Revolution</h1>
//                     <p>At Shagara, we believe in the power of planting trees to restore nature, combat climate change, and foster sustainable communities. By joining us, you can make a tangible impact on the environment, one tree at a time. Earn rewards for every tree you plant, and be a part of Egypt's movement towards a greener, healthier future. Together, we can build a better planet for generations to come.</p>
//                     <button className={styleHome.know}>
//                         <Link to="/contact" className={styleHome.planting}>join us</Link>
//                     </button>
//                 </div>

//             </div>
//         </>
//     )
// }

import React, { useState, useEffect } from "react";
import styleHome from "./Home.module.css";
import { Link } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import Donate from "../Donate/Donate";
import './Carousel.css';
import LoginFirstPopup from "../Popups/LoginFirstPopup";
import { isLoggedIn } from "../../utils/auth";
export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoginFirstPopupOpen, setIsLoginFirstPopupOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const togglePopup = () => {

    if (userLoggedIn) {

      setIsPopupOpen(!isPopupOpen);
    } else {

      setIsLoginFirstPopupOpen(true);
    }
  };

  const closeLoginPopup = () => {
    setIsLoginFirstPopupOpen(false);
  };
  useEffect(() => {
    setUserLoggedIn(isLoggedIn());
  }, []);
  return (
    <>

      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/images/homeBackground.JPG"
              className="d-block w-100 carousel-image"
              alt="First slide"
              onError={(e) => (e.target.src = '/images/placeholder.jpg')}
            />
            <div className="carousel-caption d-none d-md-block text-center"> {/* Center text */}
              <p className="carousel-text" style={{ color: '#46543e' }}>Mature trees store carbon and help fight global warming. Every tree planted is a step towards a cooler planet!</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/tree-images/carob tree 2.jpeg"
              className="d-block w-100 carousel-image"
              alt="Second slide"
              onError={(e) => (e.target.src = '/images/placeholder.jpg')}
            />
            <div className="carousel-caption d-none d-md-block text-center"> {/* Center text */}
              <p className="carousel-text">Climate change is real, but so is our power to combat it. Join us in planting trees that will protect our future.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/tree-images/sycamore fig 2.jpeg"
              className="d-block w-100 carousel-image"
              alt="Third slide"
              onError={(e) => (e.target.src = '/images/placeholder.jpg')}
            />
            <div className="carousel-caption d-none d-md-block text-center"> {/* Center text */}
              <p className="carousel-text">Let's grow a sustainable future, one tree at a time. Your small action today can create a big change tomorrow.</p>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
          aria-label="Previous"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
          aria-label="Next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* <div>
        <ImageSlider />
      </div> */}

      <div className={styleHome.plantes}>
        <img className={styleHome.imageTree} src="images/plante.png" alt="" />

        <div className={styleHome.plante}>
          <h1 className={styleHome.header1}>Plant Trees, Earn Rewards</h1>
          <h2>
            At Shagara, we believe in the power of planting trees to restore
            nature, combat climate change, and foster sustainable communities.
            By joining us, you can make a tangible impact on the environment,
            one tree at a time. Earn rewards for every tree you plant, and be a
            part of Egypt's movement towards a greener, healthier future.
            Together, we can build a better planet for generations to come.
          </h2>
          <button className={styleHome.know}>
            <Link to="/trees" className={styleHome.planting}>
              plant trees
            </Link>
          </button>
        </div>
      </div>

      <div className={styleHome.services}>
        <h1 className={styleHome.header1}>Our Services</h1>
        <div className={styleHome.ourService}>
          <div className={styleHome.treeCard}>
            <img
              className={styleHome.imageCard}
              src="images/donateTree.png"
              alt=""
            />
            <h2>Support a Greener Future!</h2>
            <p>
              Your contribution makes a lasting impact on the environment. Let's
              grow together—donate now and plant the seeds of change!
            </p>
            <button className={styleHome.know} onClick={togglePopup}>
              Donate
            </button>
          </div>

          <div className={styleHome.treeCard}>
            <img
              className={styleHome.imageCard}
              src="images/buyTree.png"
              alt=""
            />
            <h2>Plant a Tree, Grow a Legacy!</h2>
            <p>
              Purchase a tree and be part of our mission to create a greener
              Egypt. Each tree you buy helps combat climate change and supports
              a healthier planet!
            </p>
            <button className={styleHome.know}>
              <Link to="/trees" className={styleHome.planting}>
                Buy
              </Link>
            </button>
          </div>

          <div className={styleHome.treeCard}>
            <img
              className={styleHome.imageCard}
              src="images/guidance.png"
              alt=""
            />
            <h2>Grow with Confidence!</h2>
            <p>
              Learn how to plant and care for your tree with our easy,
              step-by-step guide. Whether you're a beginner or an expert, let’s
              plant together and make the earth a little greener!
            </p>
          </div>
        </div>

        <div className={styleHome.join}>
          <h1 className={styleHome.header1}>Join the Green Revolution</h1>
          <p>
            At Shagara, we believe in the power of planting trees to restore
            nature, combat climate change, and foster sustainable communities.
            By joining us, you can make a tangible impact on the environment,
            one tree at a time. Earn rewards for every tree you plant, and be a
            part of Egypt's movement towards a greener, healthier future.
            Together, we can build a better planet for generations to come.
          </p>
          <button className={styleHome.know}>
            <Link to="/contact" className={styleHome.planting}>
              Join Us
            </Link>
          </button>
        </div>
      </div>

      {/* Popup for the donation form */}
      {isPopupOpen && (
        <div className={styleHome.popup}>
          <div className={styleHome.popupInner}>
            <button className={styleHome.closeBtn} onClick={togglePopup}>
              X
            </button>
            <Donate />
          </div>
        </div>
      )}
      <LoginFirstPopup isOpen={isLoginFirstPopupOpen} onClose={closeLoginPopup} />
    </>
  );
}
