const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const cookiePasrser = require('cookie-parser');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cookiePasrser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
})

app.post('/register', async (req, res) => {
    const {email, name, password} = req.body;
    const userInDatabase = await User.findOne({email: email});
    if (!email || !name || !password) {
        res.status(406).json('all fields must be filled');
    } else if (userInDatabase){
        res.status(422).json('user already in database');
    } else {
        const user = await User.create({
            email,
            name,
            password,
        });
        res.json(user);
    }
})

app.post('/login', async (req, res) => {
    const {registeredEmail, registeredPassword} = req.body;
    const user = await User.findOne({email: registeredEmail});
    if (user) {
        const passOk = bcrypt.compareSync(registeredPassword, user.password)
        if (passOk) {
            jwt.sign({email:user.email, id:user._id}, process.env.JWT_SECRET, {}, (err, token) =>  {
                if (err) throw err;
                res.cookie('token', token).json(user);
            });
        } else {
            res.status(422).json('password not ok');
        }
    } else {
        res.json('user not found');
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, cookieData) => {
            if (err) throw err;
            const user = await User.findById(cookieData.id);
            res.json(user);
        });
    } else {
        res.json(null);
    }
})

app.get('/logout', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        res.clearCookie('token').json('user logged out');
    } else {
        res.status(422).json('cannot log out user');
    }
})

app.listen(4000);