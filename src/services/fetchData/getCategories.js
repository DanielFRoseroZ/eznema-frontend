import axiosInstance from "./axiosInterceptor";

export default async function getCategories () {
    return axiosInstance.get("categories", {
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.log(error.message);
    });
}