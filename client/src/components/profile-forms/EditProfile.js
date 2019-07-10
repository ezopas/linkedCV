import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile, getCurrentProfile} from "../../actions/profile";
import {Link, withRouter} from 'react-router-dom';

//9-6 6:11
const EditProfile = ({createProfile, history}) =>{
    const [formData, setFromData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubUserName: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        getCurrentProfile();

        setFromData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills,
            githubUserName: loading || !profile.githubUserName ? '' : profile.githubUserName,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube
        });
    }, [loading]);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubUserName,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube
    } = formData;

    const onChange = e => setFromData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    };

    //mnukopijuok is html tempalto keisk pagal 9-4,9-5
    return(
        <Fragment></Fragment>
    );
};

EditProfile.propTypes = {
    createProfile:  PropTypes.func.isRequred,
    getCurrentProfile: PropTypes.func.isRequred,
    profile: PropTypes.object.isRequred
};

const mapStateToprops = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));