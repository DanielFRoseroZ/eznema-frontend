'use client';

import MovieInfoCard from "@/components/Cards/MovieInfoCard";
import { useState, useEffect } from "react";
import { fetchMoviesService } from "@/services/fetchData";

export default function Page() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMoviesService()
        .then((data) => {
            setMovies(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return(
        <main className="max-w-[100vw]">
            <section className="md:flex md:flex-wrap md:mx-12 2xl:mx-36">
                {movies.map((movie, index) => (
                    <div key={index} className="p-6">
                        <MovieInfoCard movie={movie}/>
                    </div>
                ))}
            </section>
        </main>
    )
}