import React from 'react';
import stylePopup from './LoginFirstPopup.module.css';  

export default function LoginFirstPopup({ isOpen, onClose }) {
    if (!isOpen) return null;  

    return (
        <div className={stylePopup.popupOverlay}>
            <div className={stylePopup.popupContent}>
                <h2>Please Log In</h2>
                <p>You need to log in first to access this feature.</p>
                <button onClick={onClose} className={stylePopup.closeButton}>Close</button>
            </div>
        </div>
    );
}
