import React from 'react';
import Bulb from 'react-bulb';
 
const Light= (props) => (
    <div className="light">
        <Bulb
    size={40}
    color={props.color}
  />

    </div>
  
);
export default Light;