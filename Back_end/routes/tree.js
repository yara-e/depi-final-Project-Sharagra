const express = require('express');
const router = express.Router();
const Tree = require('../models/trees.js');
const multer = require('multer');
const path = require('path');


const storageTree = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../finalProject/public/tree-images/'); // Directory for tree photos
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const uploadTree = multer({ storage: storageTree }).array('images', 3);
// Get all trees
router.get('/getTrees', async (req, res) => {
    try {
        const trees = await Tree.find(); // Fetch all tree documents

        res.status(200).json(trees); // Send the trees as a JSON response
    } catch (error) {
        console.error('Error fetching trees:', error);
        res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
});

//get tree by id
router.get('/getTrees/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const tree = await Tree.findById(id);

        if (!tree) {
            return res.status(404).json({ message: 'Tree not found' });
        }

        res.json(tree);
    } catch (error) {
        console.error('Error fetching tree:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// get the count of trees
router.get('/count', async (req, res) => {
    try {
        const treeCount = await Tree.countDocuments(); // Count the number of documents in the 'trees' collection
        res.json({ count: treeCount });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tree count' });
    }
});


router.get('/low-inventory-count', async (req, res) => {
    try {
        // Filter trees where inventory is less than or equal to 5
        const lowInventoryCount = await Tree.countDocuments({ inventory: { $lte: 5 } });
        res.json({ count: lowInventoryCount });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching low inventory tree count' });
    }
});

// add tree
router.post('/addTree', uploadTree, async (req, res) => {
    const { name, category, price, description, inventory, care } = req.body;
    const images = req.files.map(file => `/tree-images/${file.originalname}`);

    const tree = new Tree({
        name,
        category,
        price,
        description,
        inventory,
        care,
        image: images
    });
    try {
        await tree.save();
        res.status(201).json(tree);
    } catch (error) {
        console.error('Error adding tree:', error);

    }

})
//edit tree
router.put('/editTree/:id', uploadTree, async (req, res) => {
    const { id } = req.params;
    const { name, category, price, description, inventory, care } = req.body;

    // Validate that required fields are provided
    if (!name || !category || !price || !inventory) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const updatedTree = await Tree.findByIdAndUpdate(
            id,
            { name, category, price, description, inventory, care },
            { new: true }
        );

        if (!updatedTree) {
            return res.status(404).json({ message: 'Tree not found' });
        }
        res.status(200).json(updatedTree);
    } catch (error) {
        console.error('Error editing tree:', error);
        res.status(500).json({ message: 'Error updating tree' });
    }
});
//delete tree

router.delete('/deleteTree/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const tree = await Tree.findByIdAndDelete(id);
        if (!tree) {
            return res.status(404).json({ message: 'Tree not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting tree:', error);
        res.status(500).json({ message: 'Error deleting tree' });

    }
});
// Search tree by name
router.get('/searchTrees', async (req, res) => {
    const { name } = req.query;

    try {
        const trees = await Tree.find({ name: { $regex: name, $options: 'i' } });
        res.json(trees);
    } catch (error) {
        console.error('Error searching trees:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//filter by price and category
router.get('/filterTrees', async (req, res) => {
    try {
        const { category, minPrice, maxPrice } = req.query;


        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        console.log(filter)
        const trees = await Tree.find(filter);
        res.status(200).json(trees);
    } catch (error) {
        console.error('Error fetching trees:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;