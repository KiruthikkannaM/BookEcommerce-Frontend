import { useState } from "react";
import axios from "axios";
import {useNavigate,Link} from "react-router-dom";
import "../pages/Login.css"

function SignUp(){
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [rePassword,setRePassword]=useState('');
    const [error, setError] = useState('');

    const HandleSubmit=async (e)=>{
        e.preventDefault();
        if (password !== rePassword) {
            setError("Passwords don't match!");
            return;
        }
        try{
            const response=await axios.post('https://booklust-backend.onrender.com/signup',{userName,password,rePassword});
            console.log(response.data); 
            if(response.status===200){
                const { userId } = response.data;
                localStorage.setItem("userId",userId);
                window.location.href="/";
            }

        }catch(err){
            console.error(err);
        }
    }
    return (
        <div className="login-container">
            <form onSubmit={HandleSubmit}>
                <h1>Sign Up</h1>
                
                {error && <div className="error-message">{error}</div>}
                
                <div className="login-box">
                    <input 
                        type="text" 
                        placeholder="Enter your username" 
                        className="login-box"
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className="login-box">
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        className="login-box"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="login-box">
                    <input 
                        type="password" 
                        placeholder="Retype your password" 
                        className="login-box"
                        value={rePassword} 
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                </div>

                <button type="submit">Submit</button>
                <p className="signup-link">Already have an account? <Link className="signup-button" to="/login">Login</Link></p>
            </form>
        </div>
    )
}

export default SignUp;