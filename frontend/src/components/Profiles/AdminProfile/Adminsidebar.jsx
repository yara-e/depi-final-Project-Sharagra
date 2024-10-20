import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import styleAdminSidebar from './Adminsidebar.module.css'


export default function Adminsidebar() {


  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      const adminId = localStorage.getItem('adminId');

      if (!adminId) {
        setError("No user ID found. Please login.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/user/getUsers/${adminId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className={styleAdminSidebar.adminSidebar}>
      <div className={styleAdminSidebar.info}>
        {error ? (
          <h2>{error}</h2>
        ) : userData ? (
          <>
            <img className={styleAdminSidebar.profileImage} src={`../../../../public/users-images/${userData.photo}`} alt="" />
            <h2>{userData.name}</h2>
          </>
        ) : (
          <h2>Loading...</h2>
        )}


      </div>
      <div className={styleAdminSidebar.links}>
        <Link to="/admin/profile/dashboard" className={styleAdminSidebar.adminElement}>
          <FontAwesomeIcon icon={faUser} className={styleAdminSidebar.icon} title="Profile" />
          dashboard
        </Link>
        <Link to="/admin/profile/updateTrees" className={styleAdminSidebar.adminElement}>
          <FontAwesomeIcon icon={faUser} className={styleAdminSidebar.icon} title="Profile" />
          trees
        </Link>
        <Link to="/admin/profile/informationUser" className={styleAdminSidebar.adminElement}>
          <FontAwesomeIcon icon={faShoppingCart} className={styleAdminSidebar.icon} title="Cart" />
          users
        </Link>
        <Link to="/admin/profile/orders" className={styleAdminSidebar.adminElement}>
          <FontAwesomeIcon icon={faShoppingCart} className={styleAdminSidebar.icon} title="Cart" />
          orders
        </Link>
        <Link to="/admin/profile/logout" className={styleAdminSidebar.adminElement}>
          <FontAwesomeIcon icon={faSignOutAlt} className={styleAdminSidebar.icon} title="Logout" />
          logout
        </Link>
      </div>
    </div>
  )
}
