import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Popups/Login";
import Register from "../Popups/Register";
import styleNavbar from './Navbar.module.css';
import { isLoggedIn } from '../../utils/auth';

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleLoginPopup = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const toggleRegisterPopup = () => {
    setIsRegisterOpen(!isRegisterOpen);
  };


  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn()) {
        const userId = localStorage.getItem('userId');
        try {
          const response = await fetch(`http://localhost:4000/user/getUsers/${userId}`);
          const data = await response.json();
          setUser(data);
          console.log(data)
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  });
  return (
    <>
      <div className={styleNavbar.navbar}>
        <div className={styleNavbar.logo}>
          <h1>SHAGARA</h1>
        </div>
        <div className={styleNavbar.links}>
          <Link to="/" className={styleNavbar.navElement}>Home</Link>
          <Link to="/about" className={styleNavbar.navElement}>About</Link>
          <Link to="/trees" className={styleNavbar.navElement}>Trees</Link>
          <Link to="/contact" className={styleNavbar.navElement}>Contact</Link>
          {!isLoggedIn() ? (
            <div className={styleNavbar.profile}>
              <button className={styleNavbar.enter} onClick={toggleLoginPopup}>Login</button>
              <button className={styleNavbar.enter} onClick={toggleRegisterPopup}>Register</button>
            </div>
          ) : (
            <>
              <Link to="/cart" className={styleNavbar.navElement}>Cart</Link>
              <Link className={styleNavbar.navElement} to='/user'>
                {user && (
                  <img
                    className={styleNavbar.img}
                    src={`../../../public/users-images/${user.photo}`}
                    alt="Profile"
                  />
                )}
              </Link>
            </>
          )}
        </div>
      </div>

      {isLoginOpen && (
        <div className={styleNavbar.popup}>
          <div className={styleNavbar.popupInner}>
            <button className={styleNavbar.closeBtn} onClick={toggleLoginPopup}>X</button>
            <Login />
          </div>
        </div>
      )}

      {isRegisterOpen && (
        <div className={styleNavbar.popup}>
          <div className={styleNavbar.popupInner}>
            <button className={styleNavbar.closeBtn} onClick={toggleRegisterPopup}>X</button>
            <Register />
          </div>
        </div>
      )}
    </>
  );
}
