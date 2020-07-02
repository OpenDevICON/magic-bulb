import React from 'react';
import Buttons from './Buttons';
import Light from './Light';
import Login from './Login';
import './App.css';
class App extends React.Component{
    
    render(){
        return(
            <div >
                
                <Login />
                <div>
                <Buttons />
                </div>
                {/* <Light /> */}
            </div>
        )

    };
}
export default App;