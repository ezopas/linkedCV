const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const {check, validationResult} = require('express-validator/check');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post(
    '/',
    [
        check('email', 'email is not valid').isEmail(),
        check(
            'password',
            'Please enter a correct password'
        ).exists()
    ],
    async(req, res) => {
     const errors = validationResult(req);

     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
     }

     const {email, password} = req.body;

     try{
         let user = await User.findOne({email});

         if(!user){
             return res.status(400).json({errors: [{msg: 'Invalid sign in'}]});
         }

         const isMatch = await bcrypt.compare(password, user.password);

         if(!isMatch){
             return res.status(400).json({errors: [{msg: 'Invalid sign in'}]});
         }

         const payload = {
             user: {
                 id: user.id,
             }
         };

         jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600},
             (err, token) => {
                 if(err) throw err;
                     res.json({token });
             });
     }catch (err){
         console.log(err.message);
         res.status(500).send('server error');
     }

     //User.findOne().then();


 });

module.exports = router;