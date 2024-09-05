import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
export default function LoginComponent()
{
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [showErrorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();
    function handleUserNameChange(event)
    {
        setUsername(event.target.value);
    }
    function handlePasswordChange(event)
    {
        setPassword(event.target.value);
    }
    async function handleLogin()
    {
        if(await authContext.login(username, password))
        {
            navigate(`/welcome/${username}`);
        }
        else
        {
            setErrorMessage(true);
        }
    }
    return(
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div className="LoginComponent" style={{textAlign:'center', width:'400px',border:'solid black 5px',padding:'10px'}}>
            <h1> Login</h1>
            {showErrorMessage && <div className='authenticationFailed'>Failed!! Enter your details again</div>}         
            <div className="LoginForm">
                <div>
                    <label>Enter your username: </label><input type="text" name="username" 
                    value={username} onChange={handleUserNameChange}></input>
                </div>
                <div>
                    <label>Enter your password: </label><input type="password" 
                    name="Password" value={password} onChange={handlePasswordChange}></input>
                </div>
                <div>
                    <button className="btn btn-success" type="button" name="login" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
        </div>
    )
}