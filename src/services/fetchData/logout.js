import axiosInstance from "./axiosInterceptor";

export default async function logout() {
    try {
        const response = await axiosInstance.post("my/logout");
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}