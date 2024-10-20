import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import style from './cart.module.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [error, setError] = useState(null);
    const [checkPoint, setCheckPoint] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [orderMessage, setOrderMessage] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`http://localhost:4000/user/getCart/${userId}`);
                if (!response.ok) {
                    console.log('error occured')
                }
                const cart = await response.json();
                setCartItems(cart.trees || []);
                setTotalAmount(cart.totalAmount || 0);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCart();
    });

    const handleIncrease = async (treeId) => {
        try {
            const response = await fetch(`http://localhost:4000/user/incProductCart/${userId}/${treeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('');
            }
            const updatedCart = await response.json();
            setCartItems(updatedCart.trees);
            setTotalAmount(updatedCart.totalAmount);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDecrease = async (treeId) => {
        try {
            const response = await fetch(`http://localhost:4000/user/decProductCart/${userId}/${treeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Quantity cannot be less than 1');
            }
            const updatedCart = await response.json();
            setCartItems(updatedCart.trees);
            setTotalAmount(updatedCart.totalAmount);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRemoveTree = async (treeId) => {
        try {
            const response = await fetch(`http://localhost:4000/user/remove-from-cart/${userId}/${treeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                 console.log('error in delete tree')
            }

            const updatedCart = await response.json();
            setCartItems(updatedCart.trees);
            setTotalAmount(updatedCart.totalAmount);
        } catch (err) {
            setError(err.message);
        }
    };
    const handleOrder = () => {
        setShowOrderForm(true);
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        const orderData = {
            userId,
            trees: cartItems.map(item => ({ treeId: item.treeId, quantity: item.quantity })),
            total_price: totalAmount,
            checkPoint,
        };

        try {
            const response = await fetch('http://localhost:4000/user/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Failed to place order');
            }

            const order = await response.json();
            setOrderMessage('Order placed successfully! We will contact you soon.');
            setShowOrderForm(false);
        } catch (err) {
            setError(err.message);
            console.log(err)
        }
    };

    return (
        <div className={style.all}>
            <h2>Your Cart</h2>
            {error && <div className={style.errorMessage}> {error}</div>}
            {orderMessage && <div className={style.successMessage}>{orderMessage}</div>}

            {cartItems.length === 0 ? (
                <p className={style.emptyMessage}>Start planting trees with us!</p>
            ) : (
                cartItems.map(item => (
                    <div key={item.treeId} className={style.product}>
                        <img src={item.image} alt={item.name} className={style.photo} />
                        <div className={style.details}>
                            <h3>{item.name}</h3>
                            <div>
                                <p>Price: ${item.price}</p>
                                <p>Category: {item.category}</p>
                            </div>
                            <div className={style.qtyControls}>
                                <button onClick={() => handleDecrease(item.treeId)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleIncrease(item.treeId)}>+</button>

                            </div>
                            <div className={style.qtyControls}>
                                <button onClick={() => handleRemoveTree(item.treeId)} className={style.removeButton}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {cartItems.length > 0 && !showOrderForm && (
                <>
                    <h3 className={style.totalAmount}>Total Amount: ${totalAmount}</h3>
                    <button className={style.know} onClick={handleOrder}>Order</button>
                </>
            )}

            {showOrderForm && (
                <div className={style.overlay}>
                    <form onSubmit={handleSubmitOrder} className={style.orderForm}>
                        <h2>Confirm Your Order</h2>

                        <div>
                            <h4>Order Summary</h4>
                            <ul>
                                {cartItems.map(item => (
                                    <li key={item.treeId}>
                                        {item.name}: {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                    </li>
                                ))}
                            </ul>
                            <p>Total Price: ${totalAmount}</p>
                        </div>

                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checkPoint}
                                    onChange={() => setCheckPoint(!checkPoint)}
                                />
                                Use my points
                            </label>
                        </div>
                        <br />
                        <button className={style.orderButtons} type="submit">Place Order</button>
                        <button className={style.orderButtons} type="button" onClick={() => setShowOrderForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Cart;