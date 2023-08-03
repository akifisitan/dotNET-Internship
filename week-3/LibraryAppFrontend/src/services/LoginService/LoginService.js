import axios from "axios";


export default async function loginUser(username, password) {
    try {
        const response = await axios.post('http://localhost:5025/api/Authenticate/login', {
            username: username,
            password: password,
        });
        console.log('Login Request Status Code:', response.status);
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("tokenExpiration", response.data.expiration)
        return { "data": response.data, "error": null };
    } catch (error) {
        if (error.response) {
            console.log('Status Code:', error.response.status);
            console.log('Error Response Data:', error.response.data);
        } else if (error.request) {
            console.log('No response received:', error.request);
        } else {
            console.log('Error:', error.message);
        }
        return { "data": null, "error": error.message };
    }
}
