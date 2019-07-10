import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile} from "../../actions/profile";
import {Link, withRouter} from 'react-router-dom';

const CreateProfile = ({createProfile, history}) =>{
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
        createProfile(formData, history);
    }

    //mnukopijuok is html tempalto keisk pagal 9-4,9-5
    return(
        <Fragment></Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile:  PropTypes.func.isRequred,
}

export default connect(null, {createProfile})(withRouter(CreateProfile));