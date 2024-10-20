import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Usefatch from '../../Profiles/getUsers';
import styleUpdateTrees from './UpdateTrees.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

export default function KnowUsers() {
    const Users = Usefatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [priceFilter, setPriceFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Fetch search
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
    return (
        <>

            <div className={styleUpdateTrees.updatePage}>
                <h1>All Users</h1>
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
                    <tr>
                        <th>User</th>
                        <th>phone</th>
                        <th>address</th>
                        {/* <th>actions</th> */}
                    </tr>
                    {Users.map((user) => (
                        <tr>
                            <td className={styleUpdateTrees.name}>{user.name}</td>
                            <td>{user.phone}</td>
                            <td className={styleUpdateTrees.price}>{user.address}</td>
                            {/* <td>
                                <button className={styleUpdateTrees.delete}>
                                delete
                                </button>
                                <button className={styleUpdateTrees.update}>
                                view
                                </button>
                                </td> */}
                        </tr>

                    ))}
                </table>
            </div>
        </>
    )
}
