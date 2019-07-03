const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const gravatar = require('gravatar');
const  User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
//desc: register user

router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please email').isEmail(),
    check('password', 'Pleaese enter correct password'),
        //check('password', 'Pleaese enter correct password').isLenght({min: 8}),
],
    async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try{
        let user = await User.findOne({email});

        if(user){
            res.status(400).json({errors: [{msg: 'User already register'}]});
        }


        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name, email, avatar, password
        });
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600},
            (err, token) => {
            if(err) throw err,
                res.json({token });
            });
    }catch (err){
        console.log(err.message);
        res.status(500).send('server error');
    }

    //User.findOne().then();


});

module.exports = router;