'use client';

import React from "react";
import CreateMovieForm from "@/components/Forms/Create/CreateMovieForm";
import CreateCategorie from "@/components/Forms/Create/CreateCategorie";
import { anton } from "@/utils/fonts";


export default function CreateMovie() {
    return (
        <div className="flex flex-col justify-center items-center md:mx-40 md:px-20 2xl:mx-72 2xl:px-32 md:py-10">
            <CreateMovieForm />
            <div className="w-full md:w- bg-oxford-blue p-10">
                <h1 className={`${anton.className} text-4xl mb-5 text-white text-center font-bold`}>
                    Crear Categoria
                </h1>
                <CreateCategorie />
            </div>
        </div>
    );
}