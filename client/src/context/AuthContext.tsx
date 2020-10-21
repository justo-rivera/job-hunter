import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config";
import {IUser, InitialAuthState, ContextProps} from '../interfaces'

const AuthContext = createContext(null);

const AuthProvider: React.FC<ContextProps> = ({ children }) => {

  const [isAuthenticated, checkAuthenticated] = useState(false);
  const [authState, setAuthState] = useState<InitialAuthState>({
    userInfo: {}
  });

  const getUser = () => {
    axios
    .get(`${config.API_URL}/user`, { withCredentials: true })
    .then((res) => {
      if(res.data){
        setAuthState(res.data)
        checkAuthenticated(true)
        console.log(isAuthenticated)
      }
   
    })
    .catch((err) => {
      console.log(err);
    });

  }

  useEffect(() => {
    getUser()   
      
  }, []);
  

  const setAuthInfo = (userInfo: IUser) => {
    setAuthState(userInfo);
  };
  const setIsAuthenticated = (arg) => {
    checkAuthenticated(arg)

  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        isAuthenticated,
        setIsAuthenticated: (arg) => setIsAuthenticated(arg),
        setAuthState: (authInfo:IUser) => setAuthInfo(authInfo),
        getUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
