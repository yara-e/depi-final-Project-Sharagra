import React, { useEffect, useState } from 'react';
import Usefatch from '../../Profiles/getOrders';
import styleUpdateTrees from './UpdateTrees.module.css';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [showUpdateForm, setShowUpdateForm] = useState({});
    const fetchedOrders = Usefatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:4000/user/getUsers");
                const data = await response.json();
                const usersMap = data.reduce((acc, user) => {
                    acc[user._id] = user.name;
                    return acc;
                }, {});
                setUsers(usersMap);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const fetchData = async () => {
            await fetchUsers();
            setOrders(fetchedOrders);
            setLoading(false);
        };

        fetchData();
    }, [fetchedOrders]);

    useEffect(() => {
        console.log("Fetched Orders:", orders);
    }, [orders]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:4000/order/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            const updatedOrder = await response.json();
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === updatedOrder._id ? updatedOrder : order
                )
            );
            setShowUpdateForm((prev) => ({ ...prev, [orderId]: false }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (event, orderId) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newStatus = formData.get('status');
        handleStatusChange(orderId, newStatus);
    };

    const toggleUpdateForm = (orderId) => {
        setShowUpdateForm((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styleUpdateTrees.updatePage}>
            <h1>All Orders</h1>

            <table className={styleUpdateTrees.trees}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Status</th>
                        <th>Total Price</th>
                        <th>Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{users[order.userId] || 'Unknown User'}</td>
                            <td>{order.status}</td>
                            <td>{order.total_price}</td>
                            <td>
                                <button className={styleUpdateTrees.updatebutton} onClick={() => toggleUpdateForm(order._id)}>
                                    Update
                                </button>
                                {showUpdateForm[order._id] && (
                                    <div className={styleUpdateTrees.formContainerr}>
                                        <form onSubmit={(e) => handleSubmit(e, order._id)}>
                                            <h4>Update Status</h4>
                                            <br />

                                            <select name="status" defaultValue={order.status}>
                                                <option value="pending">Pending</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="canceled">Canceled</option>
                                            </select>
                                            <br />
                                            <br />
                                            <button className={styleUpdateTrees.updatebutton} type="submit">Submit</button>
                                        </form>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
