import React, { useState, useEffect } from "react";
// import "./styles.css";
// import { content } from "./data/contract";
import { Magic } from "magic-sdk";
import { IconExtension } from "@magic-ext/icon";
import IconService from "icon-sdk-js";

import { ToastContainer, toast } from 'react-toastify';
import { Header, Card, Button, Icon, Input } from 'semantic-ui-react';
import { FaUserCircle } from "react-icons/fa";
import { RiLoginCircleLine } from 'react-icons/ri';

const { IconBuilder, IconAmount, IconConverter } = IconService;

const magic = new Magic("pk_test_BAD78299B2E4EA9D", {
  extensions: {
    icon: new IconExtension({
      rpcUrl: "https://bicon.net.solidwallet.io/api/v3"
    })
  }
});

export default function Login() {
    const [email, setEmail] = useState("");
    const [publicAddress, setPublicAddress] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userMetadata, setUserMetadata] = useState({});
  
  
    useEffect(() => {
      magic.user.isLoggedIn().then(async magicIsLoggedIn => {
        setIsLoggedIn(magicIsLoggedIn);
        if (magicIsLoggedIn) {
          try{
            const publicAddress = await magic.icon.getAccount();
            setPublicAddress(publicAddress);
            setUserMetadata(await magic.user.getMetadata());
          
          } catch(err) {
            toast.error(err.rawMessage);
            console.log(JSON.stringify(err));
          }
        }
      });
    }, [isLoggedIn]);
  
    const login = async () => {
      try{
        await magic.auth.loginWithMagicLink({ email });
        setIsLoggedIn(true);
        toast.success("Login successful");
      } catch (err) {
        toast.error(err.rawMessage);
        console.log(JSON.stringify(err));
      }
    };
  
    const logout = async () => {
      try{
        await magic.user.logout();
        setIsLoggedIn(false);
      } catch(err) {
        toast.error(err.rawMessage);
        console.log(JSON.stringify(err));
      }
    };
 
    return (
      <>
      <Card fluid raised={true} className='p-3' >
        {!isLoggedIn ? (
          <>
            <Card.Header as='h2' textAlign='center'>
              <RiLoginCircleLine size={32}/> 
              <Header.Content>Login!!</Header.Content>
            </Card.Header>
            <Input 
              placeholder='Email...' 
              onChange={event => setEmail(event.target.value)}
            />
            {/* <input
              type="email"
              name="email"
              required="required"
              placeholder="Enter your email"
              
              }}
            /> */}
            <Button className='logButton center' style={{backgroundColor:'#6851ff', color: 'white'}} onClick={login}>Send</Button>
            </>
        ) : (
          <>
            <Card.Header as='h2' textAlign='center'>
              <FaUserCircle size={32}/> 
              <Header.Content>{userMetadata.email}</Header.Content>
            </Card.Header>

            <Card.Meta textAlign='center' >
                <a href={`https://bicon.tracker.solidwallet.io/address/${publicAddress}`} target="_blank">
                  {publicAddress}
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
      <ToastContainer />
      </>
    );
}