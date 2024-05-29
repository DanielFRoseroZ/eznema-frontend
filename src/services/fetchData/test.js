import axiosInstance from "./axiosInterceptor";

export default async function fetchData () {
    return axiosInstance.get("admin_only", {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
}