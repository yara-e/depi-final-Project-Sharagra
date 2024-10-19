const express = require('express');
const router = express.Router();
const User = require('../models/user.js') // Ensure this path is correct
const multer = require('multer')
const Cart = require('../models/cart.js')
const Donation = require('../models/donation.js')
const Message = require('../models/message.js')
const Order = require('../models/order.js')
const Tree = require('../models/trees.js')

const storageUser = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../finalProject/public/users-images/'); // Directory for tree photos
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const uploadUser = multer({ storage: storageUser })


// Get all users
router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find({ 'type': 'user' }); // Fetch all tree documents

        res.status(200).json(users); // Send the users as a JSON response
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
});
router.get('/getAdmins', async (req, res) => {
    try {
        const users = await User.find({ 'type': 'admin' }); // Fetch all tree documents

        res.status(200).json(users); // Send the users as a JSON response
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
});
//get user by id
router.get('/getUsers/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// get the count of users
router.get('/count', async (req, res) => {
    try {
        const userCount = await User.countDocuments(); // Count the number of documents in the 'trees' collection
        res.json({ count: userCount });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tree count' });
    }
});

module.exports = router;

//login
//register
router.post('/register', uploadUser.single('photo'), async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    const photo = req.file.originalname;

    try {
        const user = new User({
            name,
            email,
            password,
            phone,
            address,
            photo
        });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error registering user:', error);

    }
});
//login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, 'type': 'user' });
        if (!user) {
            return res.status(404).json({ message: 'Make sure you have an account' })
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Wrong Password try again' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Login error:', error);

    }
});
router.post('/loginAdmin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, 'type': 'admin' });
        if (!user) {
            return res.status(404).json({ message: 'Make sure you have an account' })
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Wrong Password try again' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Login error:', error);

    }
});
// Show user profile
router.get('/profile/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);

    }
});

// Donate
router.post('/donate', async (req, res) => {
    const { tree, amount, userId } = req.body;

    const donation = new Donation({
        tree,
        amount,
        userId
    });
    try {
        const user = await User.findById(userId)
        if (user) {
            user.points += amount * 0.05;

        }
        await user.save();
        await donation.save();
        res.status(201).json(donation);
    } catch (error) {
        console.error('Error making donation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

});


router.post('/add-to-cart', async (req, res) => {
    const { userId, treeId, quantity = 1 } = req.body;


    if (!userId || !treeId) {
        return res.status(400).json({ message: 'User ID and Tree ID are required' });
    }

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, trees: [] });
        }


        const existingTree = cart.trees.find(tree => tree.treeId && tree.treeId.toString() === treeId);

        if (existingTree) {
            existingTree.quantity += quantity;
        } else {
            cart.trees.push({ treeId: treeId.toString(), quantity });
        }

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/getCart/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId })
            .populate({
                path: 'trees.treeId',
                select: 'name price image category'
            });

        if (!cart) {
            return res.status(404).json({ message: "Start planting with us" });
        }

        // Calculate total amount
        const enrichedCart = cart.trees.map(item => {
            const tree = item.treeId;
            return {
                quantity: item.quantity,
                treeId: tree ? tree._id : null,
                name: tree ? tree.name : 'Unknown',
                price: tree ? tree.price : 0,
                category: tree ? tree.category : 'Unknown',
                image: tree && tree.image.length > 0 ? tree.image[0] : '',
            };
        });

        const totalAmount = enrichedCart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        res.json({ ...cart.toObject(), trees: enrichedCart, totalAmount });

    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Increment product quantity in cart
router.put('/incProductCart/:userId/:treeId', async (req, res) => {
    const { userId, treeId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });
        const treeItem = cart.trees.find(item => item.treeId == treeId);
        if (treeItem) {
            treeItem.quantity += 1;
            await cart.save();


            const enrichedCart = await Cart.findOne({ userId })
                .populate({
                    path: 'trees.treeId',
                    select: 'name price image category'
                });

            const updatedEnrichedCart = enrichedCart.trees.map(item => {
                const tree = item.treeId;
                return {
                    quantity: item.quantity,
                    treeId: tree ? tree._id : null,
                    name: tree ? tree.name : 'Unknown',
                    price: tree ? tree.price : 0,
                    category: tree ? tree.category : 'Unknown',
                    image: tree && tree.image.length > 0 ? tree.image[0] : '',
                };
            });

            const totalAmount = updatedEnrichedCart.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);

            res.json({ ...cart.toObject(), trees: updatedEnrichedCart, totalAmount });
        } else {
            res.status(404).json({ message: 'Tree not found in cart' });
        }
    } catch (error) {
        console.error('Error incrementing product in cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Decrement product quantity in cart
router.put('/decProductCart/:userId/:treeId', async (req, res) => {
    const { userId, treeId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });
        const treeItem = cart.trees.find(item => item.treeId == treeId);
        if (treeItem) {
            if (treeItem.quantity > 1) {
                treeItem.quantity -= 1;
                await cart.save();

                //  the updated cart
                const enrichedCart = await Cart.findOne({ userId })
                    .populate({
                        path: 'trees.treeId',
                        select: 'name price image category'
                    });

                const updatedEnrichedCart = enrichedCart.trees.map(item => {
                    const tree = item.treeId;
                    return {
                        quantity: item.quantity,
                        treeId: tree ? tree._id : null,
                        name: tree ? tree.name : 'Unknown',
                        price: tree ? tree.price : 0,
                        category: tree ? tree.category : 'Unknown',
                        image: tree && tree.image.length > 0 ? tree.image[0] : '',
                    };
                });

                const totalAmount = updatedEnrichedCart.reduce((total, item) => {
                    return total + (item.price * item.quantity);
                }, 0);

                res.json({ ...cart.toObject(), trees: updatedEnrichedCart, totalAmount });
            } else {
                res.status(400).json({ message: 'Quantity cannot be less than 1' });
            }
        } else {
            res.status(404).json({ message: 'Tree not found in cart' });
        }
    } catch (error) {
        console.error('Error decrementing product in cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Calculate total price of the cart
// router.get('/totalPrice/:cartId', async (req, res) => {
//     const { cartId } = req.params;
//     try {
//         const cart = await Cart.findById(cartId).populate('trees.treeId');
//         if (!cart) {
//             return res.status(404).json({ message: 'Cart not found' });
//         }
//         const totalPrice = cart.trees.reduce((total, item) => {
//             return total + (item.quantity * item.treeId.price);
//         }, 0);
//         res.json({ totalPrice });
//     } catch (error) 
//         console.error('Error calculating total price:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// Place an order
router.post('/order', async (req, res) => {
    var { userId, trees, total_price, checkPoint } = req.body;
    try {
        const user = await User.findById(userId)
        const points = parseInt(user.points)
        if (checkPoint) {
            total_price -= points
            user.points = 0
            await user.save()
        }

        for ({ treeId, quantity } of trees) {
            const tree = await Tree.findById(treeId)
            if (tree.inventory > quantity) {
                tree.inventory -= quantity
                tree.save()
            } else {
                res.send(`The avalible quantity is ${tree.inventory}`)
            }

        }


        const order = new Order({
            userId,
            trees,
            total_price
        });
        await order.save();
        user.points += total_price * 0.05;
        await user.save()
        await Cart.deleteOne({ userId });
        res.status(201).json(order);


    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/remove-from-cart/:userId/:treeId', async (req, res) => {
    const { userId, treeId } = req.params;
    try {

        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { trees: { treeId } } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(updatedCart);
    } catch (error) {
        console.error('Error removing tree from cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Send a message
router.post('/sendMessage', async (req, res) => {
    const { userId, message } = req.body;

    const newMessage = new Message({
        userId,
        message
    });

    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;