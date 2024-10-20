import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styleTreePage from "../Trees/TreePage.module.css";
import LoginFirstPopup from "../Popups/LoginFirstPopup";  

export default function TreePage() {
    const { id } = useParams();
    const [tree, setTree] = useState();
    const [loading, setLoading] = useState(true);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);  
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:4000/tree/getTrees/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setTree(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [id]);

    const handleAddToCart = async () => {
        
        if (!userId) {
            setIsLoginPopupOpen(true);  
            return;
        }
 
        const payload = {
            userId,
            treeId: id
        };
        const response = await fetch(`http://localhost:4000/user/add-to-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        navigate('/cart');  
    };

    const closeLoginPopup = () => {
        setIsLoginPopupOpen(false);  
    };

    if (!loading) {
        return (
            <>
                <div className={styleTreePage.trees}>
                    <div className={styleTreePage.side} key={tree._id}>
                        <div className={styleTreePage.imagesDes}>
                            <img className={styleTreePage.treeImage1} src={tree.image[0]} alt="" />
                            <img className={styleTreePage.treeImage2} src={tree.image[1]} alt="" />
                        </div>
                        <h4>{tree.name}</h4>
                        <h4>It's category is: {tree.category}</h4>
                    </div>
                    <div className={styleTreePage.side}>
                        <h2>Description</h2>
                        <h4 className={styleTreePage.info}>{tree.description}</h4>
                        <h2>How can I care for this tree?</h2>
                        <h4 className={styleTreePage.info}>{tree.care}</h4>
                        <div className={styleTreePage.buying}>
                            <h5 className={styleTreePage.price}>Pricing: <span style={{ color: 'green' }}>{tree.price}</span></h5>
                            <button onClick={handleAddToCart} className={styleTreePage.buy}>Add to cart</button>
                            <Link className={styleTreePage.card} to={`/trees`}>Back to Trees</Link>
                        </div>
                    </div>
                </div>
 
                {isLoginPopupOpen && <LoginFirstPopup isOpen={isLoginPopupOpen} onClose={closeLoginPopup} />}
            </>
        );
    }

    return <div>Loading...</div>;
}
