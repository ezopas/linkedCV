import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from "../../actions/auth";

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <ul>
            <li><a href="/profiles" onClick={logout}>Logout</a></li>
        </ul>
    );

    const guestLinks = (
        <ul>
    <li><Link to="/profiles">Developers</Link></li>
    <li><Link to="/register">Register</Link></li>
    <li><Link to="/login">Login</Link></li>
    </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="index.html">LinkedCV</Link>
            </h1>
            {!loading ? '<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>' : null}
        </nav>
    )
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);