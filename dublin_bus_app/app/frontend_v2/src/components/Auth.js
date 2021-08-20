import React, { useEffect, useState } from "react";
import firebaseConfig from "../config.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);
         if (user !== null) {
            if(user.emailVerified === false) {
              //alert("Please verify your email!")
              firebaseConfig.auth().currentUser.sendEmailVerification()
              .then(() => {
                alert("Email verification sent! Please verify to log in");
              });
              firebaseConfig.auth().signOut();
              //setLoading(false);
            }else{
              if(localStorage.getItem('email')){
                alert("Welcome "+ localStorage.getItem('email'));
            }else{
                alert("[Auth.js] Django not login yet!")    
            }
            }
        }
    });
  }, []);
  
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
