const express = require('express');
const urlRoute = require('./routes/url');
const connectToMongoDB = require('./connect');
const cors = require('cors');


const app = express();
const PORT = 8001;

// middleware to parse incoming body
app.use(express.json());
app.use(cors());
require('dotenv').config();

connectToMongoDB(process.env.URL).then(
() => {console.log(`Connected to MongoDB`);
});
app.use('/url', urlRoute);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})