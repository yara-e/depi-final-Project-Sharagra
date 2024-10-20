import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styleAddTree from './AddTree.module.css';

export default function AddTree() {
    const [treeData, setTreeData] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        inventory: '',
        care: '',
    });
    const [imageFiles, setImageFiles] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setTreeData({
            ...treeData,
            [e.target.name]: e.target.value,
        });
    }
    const handleFileChange = (e) => {
        setImageFiles(e.target.files);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', treeData.name);
        formData.append('category', treeData.category);
        formData.append('price', treeData.price);
        formData.append('description', treeData.description);
        formData.append('inventory', treeData.inventory);
        formData.append('care', treeData.care);

        // Append image files
        if (imageFiles) {
            for (let i = 0; i < imageFiles.length; i++) {
                formData.append('images', imageFiles[i]);
            }
        }
        try {
            const response = await fetch('http://localhost:4000/tree/addTree', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const newTree = await response.json();
                alert('Tree added successfully!');
                // setSuccessMessage('Tree added successfully!');
                // setTimeout(() => {
                //     navigate('/trees'); 
                // }, 3000);

                setTreeData({
                    name: '',
                    category: '',
                    price: '',
                    description: '',
                    inventory: '',
                    care: ''
                });
                setImageFiles(null);
            } else {
                setErrorMessage('Error adding tree. Please try again.');
            }
        } catch (error) {
            console.error('Error adding tree:', error);
            setErrorMessage('Could not add tree. Please try again.');
        }
    };

    return (
        <div className={styleAddTree.addPage}>
            <br />
            <br />
            <h1>Add Tree</h1>
            {errorMessage && <p className={styleAddTree.error}>{errorMessage}</p>}
            {successMessage && <p className={styleAddTree.success}>{successMessage}</p>}
            <form onSubmit={handleSubmit} className={styleAddTree.form}>
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
                        className={styleAddTree.description}
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
                        className={styleAddTree.description}
                        name="care"
                        value={treeData.care}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Images:
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                </label>
                <button className={styleAddTree.addbutton} type="submit" >
                    Add Tree
                </button>
            </form>
        </div>
    )
}