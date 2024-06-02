'use client';

import MovieInfoCard from "@/components/Cards/MovieInfoCard";
import { useState, useEffect } from "react";
import { fetchMoviesService } from "@/services/fetchData";
import isAdmin from "@/services/isAdmin";
import Link from "next/link";
import AddBtn from "../Buttons/AddBtn";


export default function HomePage({initial}) {
    const [movies, setMovies] = useState([]);
    const [isThisAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        setIsAdmin(isAdmin(initial.token));
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
                        <MovieInfoCard movie={movie} initial={initial} />
                    </div>
                ))}
            </section>
            {isThisAdmin && (
                <Link href="/admin/create/film">
                    <AddBtn />
                </Link>
            )}
        </main>
    )
}