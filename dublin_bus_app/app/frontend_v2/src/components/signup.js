import React, { Component, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {axiosInstance} from "../axiosApi";
import firebaseConfig from "../config";

//  TODO: Error handling.
const Signup = () => {
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [signsuccess, setSignsuccess] = useState(false);

    const createUser = (email, password) => {
        try {
          auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
          alert(error);
        }
      };
    
    const handleChange = event =>{
        const { name, value } = event.currentTarget;
        if (name === "email") {
          setEmail(value);
        } else if (name === "password") {
          setPassword(value);
      };
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/user/create/', {
                email: email,
                password: password
            });
            firebaseConfig.auth().createUserWithEmailAndPassword(email, password);      

            setSignsuccess(true);
            setPassword("");
            return response;
        } catch (error) {
            alert("Signup fail!");
            console.log(error.stack);
            setErrors({
                error: error.response.data
            });
            setPassword("");
            console.log("Error: " + errors);
        }
    };

    // useEffect(()=>{
    //     if(signsuccess){
    //         setSignsuccess(false);
    //         setPassword("");
    //         alert("Signup successfully!");
    //         // redirect to login
    //         return <Redirect to="/login/" />;
    //     }
    // });

    if(signsuccess){
        alert("Signup successfully!");
        // redirect to login
        return <Redirect to="/login/" />;
    }

    return (
        <div>
            Signup
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input name="email" type="email" value={email} placeholder="E.g: abc123@gmail.com"
                    onChange={handleChange}/>
                    { errors.email ? errors.email : null}
                </label>
                <label>
                    Password:
                    <input name="password" type="password" value={password} placeholder="E.g: abcd1234"
                    onChange={handleChange}/>
                    { errors.password ? errors.password : null}
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}


// class Signup extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             password: "",
//             email:"",
//             errors:{},
//             signsuccess: false
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         this.setState({[event.target.name]: event.target.value});
//     }

//     async handleSubmit(event) {
//         event.preventDefault();
//         try {
//             const response = await axiosInstance.post('/user/create/', {
//                 email: this.state.email,
//                 password: this.state.password
//             });
//             this.setState({signsuccess:true});
//             return response;
//         } catch (error) {
//             console.log(error.stack);
//             this.setState({
//                 errors:error.response.data
//             });
//         }
//     }

//     render() {
//         if(this.state.signsuccess){
//             this.setState({signsuccess:false});
//             alert("Signup successfully!");
//             // redirect to login
//         }
//         return (
//             <div>
//                 Signup
//                 <form onSubmit={this.handleSubmit}>
//                     <label>
//                         Email:
//                         <input name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
//                         { this.state.errors.email ? this.state.errors.email : null}
//                     </label>
//                     <label>
//                         Password:
//                         <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
//                         { this.state.errors.password ? this.state.errors.password : null}
//                     </label>
//                     <input type="submit" value="Submit"/>
//                 </form>
//             </div>
//         )
//     }
// }
export default Signup;