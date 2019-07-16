import axios from 'axios';
import {setAlert} from './alert';

import {
    ACCOUNT_DELETED, CLEAR_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from "./types";

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try{
        const res = await axios.get('/api/profile/me');
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status }
        });
    }
};

//get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE});


    try{
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    }catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status }
        });
    }
};

//get profile by id
export const getProfileById = userId => async dispatch => {
    try{
        const res = await axios.get('/api/profile/user/'+userId);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status }
        });
    }
};

//get github repos
export const getGithubRepos = username => async dispatch => {
    try{
        const res = await axios.get('/api/profile/github'+username);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    }catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status }
        });
    }
};

//create or update profilwe
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile created'));

        if(!edit){
            history.push('/dashboard');
        }


    }catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status }
        });
    }
};

//add Experience
export  const addExperience = (formData, history) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');
    }catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status }
        });
    }
}

//add Education
export  const addEducation = (formData, history) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');
    }catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete experience
export const deleteExprience = id => async dispatch => {
    try{
        const res = await axios.delete('/api/profile/experience/'+id);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Edxperience Removed', 'success'));
    }catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete education
export const deleteEducation = id => async dispatch => {
    try{
        const res = await axios.delete('/api/profile/education/'+id);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));
    }catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status }
        });
    }
};

//delete account and profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure?')){

    }
    try{
        dispatch({
            type: CLEAR_PROFILE,
            //payload: res.data
        });
        dispatch({
            type: ACCOUNT_DELETED,
            //payload: res.data
        });

        dispatch(setAlert('Your account pemanantly Removed', 'success'));
    }catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status }
        });
    }
};
