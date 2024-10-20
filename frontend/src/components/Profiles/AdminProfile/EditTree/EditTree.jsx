import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styleUpdateTrees from './StyleUpdateTrees.module.css';

export default function EditTree() {
    const { id } = useParams();
    const navigate = useNavigate(); // To redirect after a successful update
    const [treeData, setTreeData] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        inventory: '',
        care: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {
        const fetchTreeData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/tree/getTrees/${id}`);

                if (response.ok) {
                    const data = await response.json();
                    // console.log('Tree Data:', data);

                    setTreeData(data);
                } else {
                    setErrorMessage('Error fetching tree details.');
                }
            } catch (error) {
                console.error('Error fetching tree data:', error);
                setErrorMessage('Could not fetch tree data.');
            }
        };

        fetchTreeData();
    }, [id]);

    // Handle form submission for editing the tree
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:4000/tree/editTree/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(treeData)
            });

            if (response.ok) {
                const updatedTree = await response.json();
                alert('Tree updated successfully!')
                // setSuccessMessage('Tree updated successfully!');
                setTimeout(() => {
                    navigate('/trees'); // Redirect to the trees page after 2 seconds
                }, 5000);
            } else {
                setErrorMessage('Error updating the tree.');
            }
        } catch (error) {
            console.error('Error updating tree:', error);
            setErrorMessage('Could not update tree. Please try again.');
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        // const { name, value } = e.target;
        setTreeData({
            ...treeData,
            //[name]: value
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={styleUpdateTrees.updatePage}>
            <h1>Edit Tree</h1>
            {errorMessage && <p className={styleUpdateTrees.error}>{errorMessage}</p>}
            {successMessage && <p className={styleUpdateTrees.success}>{successMessage}</p>}
            <form onSubmit={handleSubmit} className={styleUpdateTrees.form}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={treeData.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={treeData.category}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={treeData.price}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        className={styleUpdateTrees.description}
                        name="description"
                        value={treeData.description}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Inventory:
                    <input
                        type="number"
                        name="inventory"
                        value={treeData.inventory}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Care:
                    <textarea
                        className={styleUpdateTrees.description}
                        name="care"
                        value={treeData.care}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit" className={styleUpdateTrees.updatebutton}>
                    Update Tree
                </button>
            </form>
        </div>
    );
}
