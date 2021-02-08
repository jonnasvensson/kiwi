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

app.post('/bookclubs', async (req, res) => {
    let bookClub = {
        name: req.body.name,
        category: req.body.category,
        members: req.body.members
    };
    const data = await MONGODB.createBookClub(bookClub);
    !data ? res.status(500).send() : res.status(201).send(data);
})

app.get('/users', async (req, res) => {
    const data = await MONGODB.getAllUsers();
    !data ? res.status(500).end() : res.status(200).send(data);
})

app.get('/user/:userId', async (req, res) => {
    let userId = req.params.userId;
    const data = await MONGODB.getUser(userId);
    !data ? res.status(500).end() : res.status(200).send(data);
});


app.post('/login', async (req, res) => {
    let user = req.body;
    if (!user.username.length && !user.password.length) {
        res.status(400).end('Missing content');
    }
    const data = await MONGODB.postUser(user);
    if (data.username === user.username) {
        if (data.password === user.password) {
            res.status(201).send({ _id: data._id })
        } else {
            res.status(400).end('Wrong password');
        }
    } else if (data.username !== user.username) {
        console.log('wrong username');
        res.status(400).end('Wrong username');
    }
});

app.post('/register', async (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        gender: req.body.gender,
        area: req.body.area,
        age: req.body.age,
        categories: req.body.categories,
        meetUpTimes: req.body.meetUpTimes,
        readLanguages: req.body.readLanguages,
        speakLanguages: req.body.speakLanguages
    };
    const data = await MONGODB.register(user);
    !data ? res.status(500).send() : res.status(200).send(data);

})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))













// const MONGODB = require('./db/index').mongoURI // object som kommer frpn index i db därav kan jag skriva .mongoURI

// mongoose
//     .connect(
//         MONGODB,
//         { useNewUrlParser: true }
//     )
//     .then(() => console.log('MongoDB connected'))
//     .catch(error => console.error(error));
    