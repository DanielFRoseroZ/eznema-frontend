import axiosInstance from "./axiosInterceptor";

export default async function fetchMovies () {
    return axiosInstance.get("movies", {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        console.log(response.data);
        return response.data;
    })
    .catch((error) => {
        console.log(error.message);
        return [];
    });
}