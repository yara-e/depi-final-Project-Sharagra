// const express = require('express');
// const connectDB = require('./Data_base/connect.js');
// const tree = require('./routes/tree.js')
// const user = require('./routes/user.js')
// const cors = require("cors");
// const app = express();
// const PORT = 4000;


// connectDB();

// app.use(
//     cors({
//         origin: "*",
//     })
// );
// app.use(express.json());

// app.use('/tree', tree)
// app.listen(PORT, () => {
//     console.log('listen');
// })

// app.use('/user', user)
// app.listen(PORT, () => {
//     console.log('listen');
// })

const express = require('express');
const connectDB = require('./Data_base/connect.js');
const tree = require('./routes/tree.js')
const user=require('./routes/user.js')
const order=require('./routes/order.js')
const cors = require("cors");
const app = express();
const PORT = 4000;

connectDB();

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());

app.use('/tree', tree)
app.use('/user',user)
app.use('/order',order)
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
