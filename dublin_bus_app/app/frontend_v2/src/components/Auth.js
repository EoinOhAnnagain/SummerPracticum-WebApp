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
         if (user !== null) {
            //alert(user.emailVerified)
            if (user.emailVerified !== false){
              //setLoading(true);
            }
            else if(user.emailVerified === false) {
              //alert("Please verify your email!")
              firebaseConfig.auth().currentUser.sendEmailVerification()
              .then(() => {
                alert("Email verification sent!");
              });
              firebaseConfig.auth().signOut();
              alert("Please verify your email and login again")
              //setLoading(false);
            }
        }
        //setLoading(false);;
    });
  }, []);
  
  //if (loading) {
    //return <p>Loading...</p>;
  //}
  
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
