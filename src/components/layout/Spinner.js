//spinner component
import React from 'react';
import spinner from './spinner1.gif'; //reference the image 

//this is a functional component, cos it doesn't need its own state

export default () => {
    return (
        <div>
            <img
                src={spinner}
                alt="Loading..."
                style={{width: '200px', margin: '40px auto', display: 'block'}}
                />
        </div>
    );
};