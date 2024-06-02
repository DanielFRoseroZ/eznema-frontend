'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMovieByIdService } from "@/services/fetchData";
import { anton } from "@/utils/fonts";
import formatDate from "@/utils/formatData";
import { motion } from "framer-motion";
import { PlayIcon, CalendarIcon } from "@/utils/icons";

export default function MovieDetails({ params }) {
    const [movie, setMovie] = useState(null);
    const id = useSearchParams().get("id");

    useEffect(() => {
        getMovieByIdService(id)
        .then((data) => {
            setMovie(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const releaseDate = formatDate(movie?.releaseDate);
    const categories = movie?.categories.map((category) => category.name);
    const lenguages = [movie?.language];

    if(lenguages[0] !== "Español") {
        lenguages.push("Español");
        lenguages.push("Subtitulado");
    }

    return (
        <main className="md:w-full">
            <section className="relative items-center flex justify-center">
                <img
                    src={movie?.posterUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-oxford-blue to-transparent to-80%"/>
                <div className="text-white absolute bottom-0 flex items-center px-4 w-[340px]">
                    <div className="flex flex-col">
                        <p>{releaseDate}</p>
                        <h1 className={`${anton.className} text-5xl py-2`}>{movie?.title}</h1>
                    </div>
                </div>
                <a href={movie?.trailerUrl} target="_blank">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex justify-center items-center bg-cerise rounded-full w-14 2xl:w-20 h-14 2xl:h-20 p-2 absolute right-[700px] bottom-2"
                    >
                        <PlayIcon className="h-14 w-14 text-white" />
                    </motion.div>
                </a>
            </section> 
            <section className="bg-oxford-blue flex flex-col 2xl:px-80">
                <div className="flex gap-4 p-1 px-4 2xl:px-40">
                    {categories?.map((category, index) => (
                        <span key={index} className="text-white rounded-full text-base py-0.5 px-2 bg-cerise">{category}</span>
                    ))}
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent my-5"/>
                <div className={`${anton.className} flex text-white justify-between items-center px-20 py-5`}>
                    <div className="text-white flex items-end justify-center 2xl:mx-80">
                        <h2 className="text-3xl flex">{movie?.points}</h2>
                        <p className="text-base text">/10</p>
                    </div>                   
                    <div className="h-11 w-[1px] bg-gradient-to-b from-transparent via-gray-500 to-transparent mx-2"/>
                    <div className="flex items-end justify-center 2xl:mx-60">
                        <h2 className="text-white text-3xl">{movie?.duration}</h2>
                        <p className="text-xs text-center">MIN</p>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent my-5"/>
                <div className="px-5">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex justify-center w-full items-center bg-sandy rounded-full h-14 p-2 hover:cursor-pointer"
                    >
                        <h2 className={`${anton.className} text-white text-2xl`}>FUNCIONES</h2>
                        <CalendarIcon className="h-8 w-8 text-white mx-2"/>
                    </motion.div>
                </div>
                <div className="mb-6">
                    <h2 className={`${anton.className} text-white text-3xl px-10 pt-5`}>Sinopsis</h2>
                    <p className="text-white px-10">{movie?.synopsis}</p>
                </div>
            </section>
            <section className="flex flex-col gap-4 my-5">
                <div>
                    <h2 className={`${anton.className} text-xl px-10`}>Titulo original:</h2>
                    <div className="flex flex-wrap text-base gap-4 px-10">
                        {movie?.originalTitle}
                    </div>
                </div>
                <div>
                    <h2 className={`${anton.className} text-xl px-10`}>Idiomas:</h2>
                    <div className="flex flex-wrap text-base gap-4 px-10">
                        {lenguages?.map((lenguage, index) => (
                            <span key={index} className="rounded-full bg-cerise text-white py-0.5 px-2">{lenguage}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className={`${anton.className} text-xl px-10`}>Director:</h2>
                    <div className="flex flex-wrap text-base gap-4 px-10">
                        {movie?.director}
                    </div>
                </div>
                <div>
                    <h2 className={`${anton.className} text-xl px-10`}>Reparto:</h2>
                    <div className="flex flex-wrap text-base gap-4 px-10">
                        {movie?.cast}
                    </div>
                </div>
            </section>          
        </main>
    );
}