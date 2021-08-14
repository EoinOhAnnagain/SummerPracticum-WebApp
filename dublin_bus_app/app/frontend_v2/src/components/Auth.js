import React, { useEffect, useState } from "react";
import firebaseConfig from "../config.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
        //alert("[Auth.js] Firebase state changes")
        // if(localStorage.getItem('email')){
        //     alert("[Auth.js] Django system already login!")
        // }else{
        //     alert("[Auth.js] Django not login yet!")    
        // }
        setCurrentUser(user);
        setLoading(false);;
    });
  }, []);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};