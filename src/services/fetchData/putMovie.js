import axiosInstance from "./axiosInterceptor";

export default async function putMovie(id, data) {
    try {
        const response = await axiosInstance.put(`update_movie/${id}`, data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}