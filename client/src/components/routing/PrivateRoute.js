import React from 'react';
import {Reoute, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connerct} from 'react-redux';

const PrivateRoute = ({component: Component, auth: {isAuthenticaterd, loading}, ...rest}) => (
    <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to='/login'/>) : (<Component {...props} />)}/>
);

PrivateRoute.propTypes = {

};

const mapStateToProps = state => ({
    auth: state.auth
});

export default PrivateRoute;