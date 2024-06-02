import axiosInstance from "./axiosInterceptor";

export default async function putCategories (data) {
    return axiosInstance.post("create_categorie", data, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => {
        console.log(response.data);
        return response.data;
    })
    .catch((error) => {
        console.log(error.message);
    });
}