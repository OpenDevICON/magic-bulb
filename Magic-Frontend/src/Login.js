import React, { useState, useEffect } from "react";
// import "./styles.css";
// import { content } from "./data/contract";
import { Magic } from "magic-sdk";
import { IconExtension } from "@magic-ext/icon";
import IconService from "icon-sdk-js";

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
          const publicAddress = await magic.icon.getAccount();
          setPublicAddress(publicAddress);
          setUserMetadata(await magic.user.getMetadata());
        }
      });
    }, [isLoggedIn]);
  
    const login = async () => {
      await magic.auth.loginWithMagicLink({ email });
      setIsLoggedIn(true);
    };
  
    const logout = async () => {
      await magic.user.logout();
      setIsLoggedIn(false);
    };
 
    return (
      <div className="login">
        {!isLoggedIn ? (
          <div className="container">
            <h1>Please sign up or login</h1>
            <input
              type="email"
              name="email"
              required="required"
              placeholder="Enter your email"
              onChange={event => {
                setEmail(event.target.value);
              }}
            />
            <button onClick={login}>Send</button>
          </div>
        ) : (
          <div>
            <div className="container">
              <h1>Current user: {userMetadata.email}</h1>
              <button onClick={logout}>Logout</button>
            </div>
            <div className="container">
              <h1>Icon address</h1>
              <div className="info">
                <a
                  href={`https://bicon.tracker.solidwallet.io/address/${publicAddress}`}
                  target="_blank"
                >
                  {publicAddress}
                </a>
              </div>
            </div>
        
          </div>
        )}
      </div>
    );
}