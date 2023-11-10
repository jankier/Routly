const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());

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
    try{
        const user = await User.create({
            email,
            name,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(user);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.post('/login', async (req, res) => {
    const {registeredEmail, registeredPassword} = req.body;
    console.log(JSON.stringify(registeredEmail));
    const user = await User.findOne({email: registeredEmail});
    if (user) {
        const passOk = bcrypt.compareSync(registeredPassword, user.password)
        if (passOk) {

            res.cookie('token', '').json('password ok');
        } else {
            res.status(422).json('password not ok');
        }
    } else {
        res.json('user not found');
    }
})

app.listen(4000);