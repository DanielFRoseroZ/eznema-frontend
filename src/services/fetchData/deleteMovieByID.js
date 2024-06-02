import axiosInstance from "./axiosInterceptor";

export default async function deleteMovieByID(id) {
    try {
        const response = await axiosInstance.delete(`delete_movie/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}