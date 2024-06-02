const API_URL = process.env.NEXT_PUBLIC_API_URL

import axios from "axios";

export default async function register (data) {
    try {
        const response = await axios.post(API_URL + "register", data, { 
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}