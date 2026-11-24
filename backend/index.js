const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
require('./Models/db');

const authRouter = require('./Routes/AuthRouter.js');
const productRouter = require('./Routes/ProductRouter.js');

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

console.log("AuthRouter:", typeof authRouter);
console.log("ProductRouter:", typeof productRouter);

app.use('/auth', authRouter);
app.use('/products', productRouter);

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

console.log(
  "MONGO_CONN exists:",
  Boolean(process.env.MONGO_CONN)
);
