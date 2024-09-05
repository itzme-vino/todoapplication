import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationApi, executeJwtAuthenticationApi } from "../components/api/AuthenticationApiService";
import { apiClient } from "../components/api/ApiClient";
//creating a context
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
//sharing this context with all the children 
export default function AuthProvider({children})
{
    const[isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);
    // async function login(username, password)
    // {
    //     const baToken = "Basic " + window.btoa(username + ":" + password);
    //     const response = executeBasicAuthenticationApi(baToken);
    //     try{
    //     if((await response).status==200)
    //         {
    //             setAuthenticated(true);
    //             setUsername(username);
    //             setToken(baToken);
    //             apiClient.interceptors.request.use(
    //                 (config)=> {
    //                     console.log("configuration and intercepting of token");
    //                     config.headers.Authorization=baToken;
    //                     return config;
    //                 }
    //             )
    //             return true;
    //         }
    //         else
    //         {
    //             logout();
    //             return false;
    //         }
    //     }
    //     catch(error)
    //     {
    //         logout();
    //         return false;
    //     }
    // }
    async function login(username, password)
    {
        const response = await executeJwtAuthenticationApi(username, password);
        try{
        if(response.status == 200)
            {
                const JwtToken = "Bearer " + response.data.token;
                setAuthenticated(true);
                setUsername(username);
                setToken(JwtToken);
                apiClient.interceptors.request.use(
                    (config)=> {
                        console.log("configuration and intercepting of token");
                        config.headers.Authorization=JwtToken;
                        return config;
                    }
                )
                return true;
            }
            else
            {
                logout();
                return false;
            }
        }
        catch(error)
        {
            logout();
            return false;
        }
    }
    function logout()
    {
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
    }
    return(<AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>)
}