import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const GuestRoute = ({component: Component, ...rest}) => {

    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('jwt') && localStorage.getItem('user') ? (
                    <Redirect to={{pathname: "/dashboard", state: {from: props.location}}}/>
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}

export default GuestRoute;