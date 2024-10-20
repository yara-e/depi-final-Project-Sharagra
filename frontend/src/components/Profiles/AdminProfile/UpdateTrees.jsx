import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Usefatch from '../../Trees/getTrees';
import styleUpdateTrees from './UpdateTrees.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import './EditTree/EditTree'
import { useNavigate } from 'react-router-dom';

export default function UpdateTrees() {
    // const Trees = Usefatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [priceFilter, setPriceFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [Trees, setTrees] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:4000/tree/getTrees");
                const data = await response.json();
                setTrees(data);
            } catch (error) {
                console.error("Error fetching trees:", error);
            }
        };

        fetchData();
    }, []);


    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (searchQuery) {
            try {
                const response = await fetch(`http://localhost:4000/tree/searchTrees?name=${searchQuery}`);
                const data = await response.json();
                setTrees(data)
            }
            catch (error) {
                console.log(error);
            }
        } else {
            const response = await fetch("http://localhost:4000/tree/getTrees");
            const data = await response.json();
            setTrees(data);
        }
        setSearchQuery('');
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        // Logic for filtering trees based on price and category
        console.log('Filtering by:', { priceFilter, categoryFilter });
        // Reset the form
        setPriceFilter('');
        setCategoryFilter('');
        toggleForm();
    };
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/tree/deleteTree/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedTrees = Trees.filter(tree => tree._id !== id);
                setTrees(updatedTrees); // Update the state to remove the deleted tree
                alert("Tree deleted successfully!"); // Show success message
            } else {
                alert("Failed to delete the tree. Please try again."); // Handle failed delete
            }
        } catch (error) {
            console.error('Error deleting tree:', error);
            alert('Error deleting tree. Please try again.'); // Show error message
        }
    };

    const handleEditClick = (id) => {
        navigate(`/admin/profile/editTree/${id}`);
    };
    const handleAddTree = () => {
        navigate('/admin/profile/addTree')
    }

    return (
        <>
            <div className={styleUpdateTrees.updatePage}>
                <h1>All Trees</h1>
                <button onClick={() => handleAddTree()} className={styleUpdateTrees.addButton}>Add Tree</button>
                <form onSubmit={handleSearchSubmit} className={styleUpdateTrees.searchbox}>
                    <input
                        type="text"
                        placeholder="Search trees..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styleUpdateTrees.searchBar}
                    />
                    <button type="submit" className={styleUpdateTrees.searchButton}>
                        <FontAwesomeIcon icon={faSearch} className='sicon' />
                    </button>
                </form>

                <table className={styleUpdateTrees.trees}>
                    <thead>
                        <tr>
                            <th>Trees</th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Trees.map((Tree) => (
                            <tr key={Tree._id}>
                                <td className={styleUpdateTrees.name}>{Tree.name}</td>
                                <td>{Tree.inventory}</td>
                                <td className={styleUpdateTrees.price}>{Tree.price}</td>
                                <td>
                                    <button
                                        className={styleUpdateTrees.delete}
                                        onClick={() => deleteProduct(Tree._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleEditClick(Tree._id)}
                                        className={styleUpdateTrees.update}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}





