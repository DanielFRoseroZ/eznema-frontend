const API_URL = process.env.NEXT_PUBLIC_API_URL;

import axios from "axios";

export default async function login (data) {
    try {
        const response = await axios.post(API_URL + "login", data, { withCredentials: true});
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}