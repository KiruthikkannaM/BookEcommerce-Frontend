import { useState } from "react";
import axios from "axios";
import "../pages/Login.css"
import {Link} from "react-router-dom";


function Login(){
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [error,storeError]=useState('');

    const HandleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const response=await axios.post("https://booklust-backend.onrender.com/login",
                {userName:userName,password:password},
            );
            if(response.status===200){
                const {userId}=response.data;
                console.log(userId)
                localStorage.setItem("userId",userId);
                console.log("Login successful and userid in localstorage:",userId);
                window.location.href="/";
                    
            }
            else console.log("login unsuccessful");
        }catch(err){
            console.error(err);
        }
    }
 

    return(
        
            <div className="login-container">
                <form onSubmit={HandleSubmit}>
                    <h1>Login</h1>
                    <div className="login-box">
                        <input type="text" placeholder="username" className="login-box" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                    </div>
                    <div className="login-box">
                        <input type="password" placeholder="password" className="login-box" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                
                
                    <button type="submit">Submit</button>
                    <p className="signup-link">Don't have an account? <Link className="signup-button" to="/signup">Sign Up</Link></p>
            </form>
            
            </div>
       
    )

}

export default Login;