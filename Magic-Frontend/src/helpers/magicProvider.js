import React, { useState, useEffect } from 'react';
import { Magic } from "magic-sdk";
import { IconExtension } from "@magic-ext/icon";
import { ToastContainer, toast } from 'react-toastify';

const MagicContext = React.createContext(null);

const magic = new Magic("pk_test_BAD78299B2E4EA9D", {
  extensions: {
    icon: new IconExtension({
      rpcUrl: "https://bicon.net.solidwallet.io/api/v3"
    })
  }
});

export default function MagicProvider({ children }) {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ publicAddress, setPublicAddress ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ userMetadata, setUserMetadata ] = useState("");

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

  const contextObj = {
    magic, 
    loginData: {
      isLoggedIn
    },
    addressData: {
      publicAddress
    },
    metaData: {
      userMetadata
    },
    emailData: {
      email,
      setEmail
    },
    login,
    logout
  };

  return (
    <MagicContext.Provider value={contextObj}>
      {children}
      <ToastContainer />
    </MagicContext.Provider>
  );
}


const withMagicContext = Component => props => {
  return(
    <MagicContext.Consumer>
      {value => <Component {...props} value={value} />}
    </MagicContext.Consumer>
  );
}


export { MagicContext, withMagicContext };