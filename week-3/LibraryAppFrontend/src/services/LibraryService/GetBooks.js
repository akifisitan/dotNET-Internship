import axios from "axios";
import { getAccessToken } from "../AuthService/Auth";

export default async function getBooks() {
    const token = getAccessToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const response = await axios.get('http://localhost:5025/Book/list', config)
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
