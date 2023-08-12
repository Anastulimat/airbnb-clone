const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const User = require('./models/User');

const app = express();

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = '1fKdQgH3BB1U7dl2pp';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);


app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(user);
    } catch (e) {
        res.status(422).json(e);
    }
});


app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (user) {
            const passOk = bcrypt.compareSync(password, user.password);
            if (passOk) {
                jwt.sign({
                    email: user.email,
                    id: user._id,
                }, jwtSecret, {}, (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.cookie('token', token).json(user);
                });
            } else {
                res.status(422).json('Pass not ok!')
            }
        } else {
            res.json('Not found !')
        }


    } catch (e) {
        res.status(422).json(e);
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
        })
    } else {
        res.json(null);
    }
})

app.listen(4000);