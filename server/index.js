const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())

const MONGODB = require('./db/index');

app.get('/bookclubs', async (req, res) => {
    const data = await MONGODB.getBookClubs();
    !data ? res.status(500).end() : res.status(200).send(data);
});


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))



// const MONGODB = require('./db/index').mongoURI // object som kommer frpn index i db därav kan jag skriva .mongoURI

// mongoose
//     .connect(
//         MONGODB,
//         { useNewUrlParser: true }
//     )
//     .then(() => console.log('MongoDB connected'))
//     .catch(error => console.error(error));
    