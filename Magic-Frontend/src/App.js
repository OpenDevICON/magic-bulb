import React from 'react';
import Buttons from './Buttons';
// import Light from './Light';
import Login from './Login';
import './App.css';

import 'semantic-ui-css/semantic.min.css';
import './bootstrap-grid.css';
import 'react-toastify/dist/ReactToastify.css';

import { Card } from 'semantic-ui-react';

// import { Grid } from 'semantic-ui-react';


class App extends React.Component{
    
    render(){

        return(
        <>
            <div style={{backgroundColor:'black'}} className='pb-4 row d-flex align-items-center justify-content-center'>
                <Card centered style={{backgroundColor:'black', color: 'white'}} className='p-3 m-2' >
                <h1 className='mainHeader'>MAGIC BULB</h1>
                </Card>
            </div>

            <div className='row appContainer pt-3'>
                
                <div className='col-md-6 col-lg-7 col-sm-12 p-1'>
                    <Buttons />
                </div>

                <div className='loginContainer col-md-5 col-lg-4 col-sm-12'>
                    <Login />
                </div>
                
            </div>
        </>
        );
    };
}
export default App;