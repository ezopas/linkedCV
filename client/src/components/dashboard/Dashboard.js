import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from "../../actions/profile";
import Spiner from '../layout/Spiner';
import {Link} from 'react-router-dom';
import DashboardActions from './DashboardActions';

const Dashboard = ({getCurrentProfile, auth: {uswer}, profile: {profile, loading} }) => {

    useEffect(() => {
        getCurrentProfile();
    }, []);

    return (
        loading && profile === null ? <Spiner/> : <Fragment>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className='lead'>
                Welcome {user && user.name}
            </p>
            {profile !== null ? <Fragment><DashboardActions/></Fragment> : <Fragment>
                <p>You do not have yet setup a profile.</p>
                <Link to='/create-profile' classname='btn btn-primary my-1'>Please add.</Link>
            </Fragment>}
        </Fragment>
    )
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);