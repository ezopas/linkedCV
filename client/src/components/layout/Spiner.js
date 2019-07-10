import React, {Fragment} from 'react';
import spinner from './spiner.gif';

export default = () => (
    <Fragment>
        <img src={spinner}
             style={{width: '200px', margin: 'auto', display: 'block'}}
             alt='Loading...'
                 />
    </Fragment>
)
    try{
        const res = await .get('/api/profile/me');

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