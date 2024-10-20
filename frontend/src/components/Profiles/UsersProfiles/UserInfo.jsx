import React, { useEffect, useState } from 'react';
import styleInfo from './UserInfo.module.css';

export default function UserInfo() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    // Fetch user data from backend when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId'); // Get user ID from localStorage

            if (!userId) {
                setError("No user ID found. Please login.");
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/user/getUsers/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }
                const data = await response.json();
                setUserData(data); // Set fetched user data
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <div className={styleInfo.infoPage}>
                <div className={styleInfo.userInfo}>
                    {error ? (
                        <h2>{error}</h2>
                    ) : userData ? (
                        <div className={styleInfo.info}>
                            <div className={styleInfo.point}>
                                
                                <h5>my points : <span className={styleInfo.pointNum}>15</span></h5>
                            </div>
                            <h1>Name:</h1>
                            <h4>{userData.name}</h4>
                            <h1>Email:</h1>
                            <h4>{userData.email}</h4>
                            <h1>Address:</h1>
                            <h4>{userData.address}</h4>
                            <h1>Phone:</h1>
                            <h4>{userData.phone}</h4>

                        </div>
                    ) : (
                        <h2>Loading...</h2>
                    )}
                </div>
            </div>
        </>
    );
}
