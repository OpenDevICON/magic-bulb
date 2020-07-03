import React from 'react';
import Buttons from './Buttons';
import Light from './Light';
import Login from './Login';
import './App.css';

import 'semantic-ui-css/semantic.min.css';
import './bootstrap-grid.css';
import 'react-toastify/dist/ReactToastify.css';

// import { Grid } from 'semantic-ui-react';

class App extends React.Component{
    
    render(){

        return(
            <div className='row appContainer'>
                
                <div className='col-md-6 col-lg-7 col-sm-12 p-1'>
                    <Buttons />
                </div>

                <div className='loginContainer col-md-5 col-lg-4 col-sm-12'>
                    <Login />
                </div>
                
            </div>
        );
    };
}
export default App;