'use client';

import MovieAdminCard from "@/components/Cards/MovieAdminCard"
import { useState, useEffect } from "react"
import { fetchMoviesService, getCategoriesService } from "@/services/fetchData"
import { anton } from "@/utils/fonts";
import { motion } from "framer-motion";

export default function Dashborad() {
    const [movies, setMovies] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchMoviesService()
        .then((data) => {
            setMovies(data)
        })
        .catch((error) => {
            console.log(error)
        })

        getCategoriesService()
        .then((data) => {
            setCategories(data)
        })
        .catch((error) => {
            console.log(error)
        })

    }, [])

    return (
        <main className="p-5 flex flex-col gap-4">
            <section className="p-4 text-center bg-oxford-blue rounded-xl">
                <h2 className={`${anton.className} text-5xl text-white m-2`}>PELICULAS</h2>
                <div className="flex flex-col gap-1 bg-white p-4 rounded-xl h-[400px] overflow-y-auto">
                    {movies.map((movie, index) => (
                        <div key={index}>
                            <MovieAdminCard movie={movie} />
                        </div>
                    ))}
                </div>
            </section>
            <section className="p-4 text-center bg-oxford-blue rounded-xl h-[250px] overflow-y-auto">
                <h2 className={`${anton.className} text-5xl text-white m-2`}>CATEGORIAS</h2>
                <div className="flex flex-col gap-2">
                    {categories.map((category, index) => (
                        <motion.div 
                            key={index} 
                            whileHover={{ scale: 0.95 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-white bg-sandy rounded-xl"
                        >
                            <p>{category.name}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main> 
    )
}