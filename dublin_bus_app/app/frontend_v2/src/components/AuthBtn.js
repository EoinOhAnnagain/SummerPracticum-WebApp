import React, { useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth";


const AuthButton = () => {
    const {currentUser}  = useContext(AuthContext);
    
    if (localStorage.getItem('email') && currentUser){
      return <div className="dropdown-element"><Link className={"nav-link"} to={"/logout/"}>Logout</Link></div>;

    } else {
        return <div className="dropdown-element"><Link className={"nav-link"} to={"/login/"}>Login</Link></div>;
    }
  };

  export default AuthButton;