import React, { useContext } from "react";


import { MagicContext } from './helpers/magicProvider';

import { Header, Card, Button, Icon, Input } from 'semantic-ui-react';
import { FaUserCircle } from "react-icons/fa";
import { RiLoginCircleLine } from 'react-icons/ri';


export default function Login() {
    const { loginData, addressData, metaData, emailData, login, logout } = useContext(MagicContext);

    return (
      <>
      <Card fluid raised={true} className='p-3' >
        {!loginData.isLoggedIn ? (
          <>
            <Card.Header as='h2' textAlign='center'>
              <RiLoginCircleLine size={32}/> 
              <Header.Content>Login!!</Header.Content>
            </Card.Header>
            <Input 
              placeholder='Email...' 
              onChange={event => emailData.setEmail(event.target.value)}
            />
            
            <Button className='logButton center' style={{backgroundColor:'#6851ff', color: 'white'}} onClick={login}>Send</Button>
            </>
        ) : (
          <>
            <Card.Header as='h2' textAlign='center'>
              <FaUserCircle size={32}/> 
              <Header.Content>{metaData.userMetadata.email}</Header.Content>
            </Card.Header>

            <Card.Meta textAlign='center' >
                <a href={`https://bicon.tracker.solidwallet.io/address/${addressData.publicAddress}`} rel="noopener noreferrer" target="_blank">
                  {addressData.publicAddress}
                </a>
            </Card.Meta>
            
              {/* <Butt onClick={logout}>Logout</button> */}
              <Button className='logButton center' onClick={logout} icon labelPosition='left' size='small' color='red'>
                <Icon name='power' />
                Logout
              </Button>
          </>
        
        )}
      </Card>
      </>
    );
}