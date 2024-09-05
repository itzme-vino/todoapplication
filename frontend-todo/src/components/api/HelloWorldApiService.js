import axios from "axios";
const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
})
export const retrieveHelloWorldBean = () =>
     apiClient.get('/hello-world');

export const helloWorldPathVariable = (username) =>
    apiClient.get(`/hello-world/path-variable/${username}`,
        {
            headers:{
                Authorization:'Basic dmlub2RoOjEyMzQ='
            }
        });
