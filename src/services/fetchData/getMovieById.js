import axiosInstance from "./axiosInterceptor";

export default async function getMovieById(id) {
    return axiosInstance.get("movie_by_id/" + id, {
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