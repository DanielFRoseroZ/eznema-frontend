import { anton } from "@/utils/fonts";
import { motion } from "framer-motion";
import formatDate from "@/utils/formatData";
import Link from "next/link";


export default function MovieInfoCard({ movie }) {
    const categories = movie.categories;
    const releaseDate = new Date(movie.releaseDate);
    const currentDate = new Date();

    releaseDate.setDate(releaseDate.getDate() + 1);
    const formattedDate = formatDate(releaseDate);

    const fiveDaysAfterRelease = new Date(releaseDate);
    fiveDaysAfterRelease.setDate(fiveDaysAfterRelease.getDate() + 7);


    return (
        <div className="shadow-lg shadow-gray-400 rounded-3xl md:rounded-t-3xl flex md:flex-col md:w-[250px] 2xl:w-[350px] h-full 2xl:hover:cursor-pointer">
            <section className="w-1/2 md:w-full h-[242px] 2xl:h-[400px]"> 
                <img 
                    src={movie.posterUrl} 
                    alt={movie.title}
                    className="h-full w-full object-fill rounded-l-3xl md:rounded-t-3xl md:rounded-es-none"
                />
            </section>
            <section className="bg-white w-1/2 md:w-full p-2 md:p-4 flex flex-col gap-2 rounded-r-3xl md:rounded-b-3xl">
                <div className="flex flex-col gap-1 ">
                    <h2 className={`${anton.className} text-2xl 2xl:text-3xl`}>{movie.title}</h2>
                    <h2 className="text-xs 2xl:text-base font-semibold">Titulo original: {movie.originalTitle}</h2>
                </div>
                <div className="text-white flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <span key={category.id} className="bg-cerise py-1 px-2 rounded-full text-xs 2xl:text-sm">{category.name}</span>
                    ))}
                </div>
                <div>
                    <h2 className="text-xs 2xl:text-base font-semibold">Estreno: {formattedDate}</h2>
                    <h2 className="text-xs 2xl:text-base font-semibold">Duración: {movie.duration} minutos</h2>
                </div>
                {movie.ageRestriction >= 18 ? (
                    <div className="w-full text-center p-1 bg-cerise rounded-full">
                        <h2 className="text-xs 2xl:text-base text-white font-semibold">+{movie.ageRestriction}</h2>
                    </div>
                ) : movie.ageRestriction >= 13 ? (
                    <div className="w-full rounded-full p-1 bg-sandy text-center">
                        <h2 className="text-xs 2xl:text-base text-white font-semibold">+{movie.ageRestriction}</h2>
                    </div>
                ) : (
                    <div className="w-full text-center p-1 bg-green-500 rounded-full">
                        <h2 className="text-xs 2xl:text-base text-white font-semibold">Para todo publico</h2>
                    </div>
                )}
                <div className="text-center bg-sandy p-1 text-white">
                    {(currentDate > releaseDate && currentDate <= fiveDaysAfterRelease) ? (
                        <h2 className="text-xs 2xl:text-base font-semibold">Esteno</h2>
                    ) : currentDate < releaseDate ?(
                        <h2 className="text-xs 2xl:text-base font-semibold">Proximamente</h2>
                    ) : (
                        <h2 className="text-xs 2xl:text-base font-semibold">En cines</h2>
                    )}
                </div>
            </section>
        </div>
    );
}
