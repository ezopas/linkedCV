const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult } =  require('express-validator/check');
const request = require('request');
const config = require('config');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({msg: 'Not found user!'});
        }

        res.json(profile);
    }catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});

//POST api/profile request
//create or update usr profile

router.post('/', [auth, [
    check('status', 'Status is required')
        .not()
        .isEmpty()
        //.check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubUserName,
        skills,
        youtube,
        facebook,
        twitter,
        linkedin
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if (githubUserName) profileFields.githubUserName = githubUserName;
    if (skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(twitter) profileFields.social.twitter = twitter;

    try {
        let profile = await Profile.findOne({user: req.user.id});

        if(profile){
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
            );

            return res.json(profile);
        }
        //creating new profile
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);
    }catch (err) {
        console.log(err.message);
        res.status(500).send('server Error');
    }

    //get api/profile/user/:user_id
    router.get('/user/:user_id', async (req, res) => {
        try {
            const profiles = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

            if(!profile) return res.status(400).json({msg: 'Not find this user'});

            res.json(profiles);
        }catch (err) {
            console.log(err.message);
            if(err.kind == 'ObjectId'){
                return res.status(400).json({msg: 'profile not found'});
            }
            res.status(500).send('Server error');
        }
    })

    //delete profile, user and posts
    router.delete('/', auth, async (req, res) => {
        try{
            //remove profile
            await Profile.findOneAndRemove({user: req.user.id});

            await User.findOneAndRemove({ _id: req.user.id});

            res.json({msg: 'user removed'});
            // if(!profile){
            //     return res.status(400).json({msg: 'Not found user!'});
            // }
            //
            // res.json(profile);
        }catch (err) {
            console.log(err.message);
            res.status(500).send('server error');
        }
    });

    //add profile experiance
    router.put('/experience', auth, [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try{

           const profile = await Profile.findOne({user: req.user.id});

           profile.experience.unshift(newExp);

           await profile.save();

           res.json(profile);
        }catch (err) {
            console.log(err.message);
            res.status(500).send('server error');
        }
    });

    //delete api/profile/expirience/:exp_id
    router.delete('experience/:exp_id', auth, async (req, res) => {
        try{
            const profile = await Profile.findOne({user: req.user.id});

            //get index whixch will remove
            const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

            profile.experience.splice(removeIndex, 1);

            await profile.save();

            res.json(profile);
        }catch (err){
            console.log(err.message);
            res.status(500).send('server error');
        }
    });

    //add profile education
    router.put('/education', auth, [
        check('school', 'School is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        try{

            const profile = await Profile.findOne({user: req.user.id});

            profile.education.unshift(newEdu);

            await profile.save();

            res.json(profile);
        }catch (err) {
            console.log(err.message);
            res.status(500).send('server error');
        }
    });

    //delete api/profile/education/:edu_id
    router.delete('education/:edu_id', auth, async (req, res) => {
        try{
            const profile = await Profile.findOne({user: req.user.id});

            //get index whixch will remove
            const removeIndex = profile.exducation.map(item => item.id).indexOf(req.params.edu_id);

            profile.education.splice(removeIndex, 1);

            await profile.save();

            res.json(profile);
        }catch (err){
            console.log(err.message);
            res.status(500).send('server error');
        }
    });

    //get api/profile.github/:username
    router.get('/github/:username', (req, res) => {
        try{
            const options = {
                uri: 'https://api.github.com/users/'+req.params.username+'repos?per_page=5&sort=created:asc&client_id='+config.get('githubClientId')+'&client_secret='+config.get('githubSecret'),
                method: 'GET',
                headers: {'user-agent': 'node.js'}
            };

            request(options, (error, response, body) => {
               if(error) console.log(error);

               if(response.statusCode !== 200){
                   return res.status(404).json({msg: 'No Github profile found'});
               }

               res.json(JSON.parse(body));
            });
        }
        catch (err){
            console.log(err.message);
            res.status(500).send('server error');
        }
    })
});

module.exports = router;