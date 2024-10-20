import React from 'react';
import styleLogout from './Logout.module.css'
import { useNavigate } from 'react-router-dom';

export default function ALogout() {
    const navigate = useNavigate(); // Replaces useHistory in react-router-dom v6

    const handleLogout = () => {
        const confirmation = window.confirm("Are you sure you want to logout?");

        if (confirmation) {
            // Clear user data from local storage
            localStorage.removeItem('adminId');

            // Optionally, clear other related data if necessary
            // localStorage.removeItem('userToken');

            // Redirect to login page
            navigate('/admin');
        }
    };

    return (
        <>
            <div className={styleLogout.LogoutPage}>
                <h2>Logout Page</h2>
                <p>Click below to logout.</p>
                <button className={styleLogout.logout} onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
}
