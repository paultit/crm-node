const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHadler = require('../utils/errorHandler');
module.exports.login = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60*60})
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Passwords mismatch. Try again.'
            })
        }
        
    } else {
        res.status(404).json({
        message: 'There is no such the email. Try again.'});
    }
}

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email});
    console.log(candidate);
    if (candidate) {
        res.status(409).json({
            message: 'This email is already taken. Try another one.'
        })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
        });
        try {
            await user.save();
            console.log(user);
            res.status(201).json(user);
        } catch(e) {
            errorHandler(res, e);
        }
        
    }
    
} 