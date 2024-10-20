import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styleTrees from './Trees.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

export default function Trees() {
    const [trees, setTrees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:4000/tree/getTrees");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
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
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTrees(data);
                setNoResults(data.length === 0);
            } catch (error) {
                console.log(error);
                alert('Failed to search trees. Please try again later.');
            }
        } else {
            const response = await fetch("http://localhost:4000/tree/getTrees");
            const data = await response.json();
            setTrees(data);
            setNoResults(data.length === 0);
        }
        setSearchQuery('');
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleFilterSubmit = async (e) => {
        e.preventDefault();

        if (min && max && Number(min) > Number(max)) {
            alert('Minimum price cannot be greater than maximum price.');
            return;
        }

        const query = `category=${categoryFilter}&minPrice=${min}&maxPrice=${max}`;

        try {
            const response = await fetch(`http://localhost:4000/tree/filterTrees?${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTrees(data);
            setNoResults(data.length === 0);
        } catch (error) {
            console.log(error);
            alert('Failed to filter trees. Please try again later.');
        }

        setMin('');
        setMax('');
        setCategoryFilter('');
        toggleForm();
    };

    return (
        <>
            <div className={styleTrees.allPage}>
                <h1>All Trees</h1>
                <button className={styleTrees.fab} onClick={toggleForm}>
                    <FontAwesomeIcon icon={faFilter} />
                </button>
                <form onSubmit={handleSearchSubmit} className={styleTrees.searchbox}>
                    <input
                        type="text"
                        placeholder="Search trees..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styleTrees.searchBar}
                    />
                    <button type="submit" className={styleTrees.searchButton}>
                        <FontAwesomeIcon icon={faSearch} className='sicon' />
                    </button>
                </form>

                {showForm && (
                    <div className={styleTrees.overlay}>
                        <div className={styleTrees.formContainer}>
                            <h2>Filter Trees</h2>
                            <form onSubmit={handleFilterSubmit}>
                                <div>
                                    <label htmlFor="min">Minimum Price:</label>
                                    <input
                                        type="number"
                                        id="min"
                                        value={min}
                                        onChange={(e) => setMin(e.target.value)}
                                        placeholder="Min price"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="max">Maximum Price:</label>
                                    <input
                                        type="number"
                                        id="max"
                                        value={max}
                                        onChange={(e) => setMax(e.target.value)}
                                        placeholder="Max price"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category">Category:</label>
                                    <select
                                        id="category"
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Drought-tolerant">Drought-tolerant</option>
                                        <option value="Native">Native</option>
                                        <option value="Fruit">Fruit</option>
                                        <option value="Evergreen">Evergreen</option>
                                    </select>
                                </div>
                                <button type="submit" className={styleTrees.closeButton}>Filter</button>
                            </form>
                        </div>
                    </div>
                )}

                <div className={styleTrees.treeContainer}>
                    {trees.length > 0 ? (
                        trees.map((tree) => (
                            <div className={styleTrees.trees} key={tree._id}>
                                <img className={styleTrees.productImage} src={tree.image[0]} alt={tree.name} />
                                <h4 className={styleTrees.name}>{tree.name}</h4>
                                <h4 className={styleTrees.des}>{tree.description}</h4>
                                <h5 className={styleTrees.price} > Pricing: <span style={{ color: 'green' }}>{tree.price}</span></h5>
                                <button className={styleTrees.details}>
                                    <Link to={`/trees/${tree._id}`} className={styleTrees.link}>Details</Link>
                                </button>
                            </div>
                        ))
                    ) : (
                        <p  >No trees match the selected criteria.</p>
                    )}
                </div>


                {noResults && searchQuery && (
                    <p>No trees found for "{searchQuery}".</p>
                )}
            </div>
        </>
    );
}