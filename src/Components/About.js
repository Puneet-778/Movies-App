import React from 'react';

export default function About(props){
    console.log(props.isAuth);
    console.log(props.name);
    return(
        <h1>About Page</h1>
    );
}
