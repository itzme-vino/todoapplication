import axios from "axios";
import { apiClient } from "./ApiClient";
export const executeBasicAuthenticationApi = (token) =>
    apiClient.get(`/basic-auth`,
        {
            headers:{
                Authorization:token
            }
        });
export const executeJwtAuthenticationApi = (username, password) =>
    apiClient.post(`/authenticate`,{username, password});