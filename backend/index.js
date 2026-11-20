const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routes/AuthRouter.js');
const productRouter = require('./Routes/ProductRouter.js');
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', authRouter);
//app.use('/products', productRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})
app.get('/ping', (req, res) => {
    res.send('pong');
});