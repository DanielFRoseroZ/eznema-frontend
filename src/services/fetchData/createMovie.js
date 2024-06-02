import axiosInstance from "./axiosInterceptor";

export default async function postMovie (data) {
    return axiosInstance.post("create_movie", data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.log(error.message);
    });
}