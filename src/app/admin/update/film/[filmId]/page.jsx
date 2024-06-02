'use client';

import { useState, useEffect } from 'react';
import { deleteMovieByIdService, getMovieByIdService, getCategoriesService, putMovieService } from '@/services/fetchData';
import { anton } from '@/utils/fonts';
import { motion } from 'framer-motion';
import Link from 'next/link';

const EditMovieForm = ({ params }) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [movie, setMovie] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [error, setError] = useState(null);
    const [newMovie, setNewMovie] = useState({
        title: "",
        originalTitle: "",
        releaseDate: "",
        ageRestriction: "",
        duration: "",
        director: "",
        cast: "",
        points: "",
        synopsis: "",
        language: "",
        file: null,
        trailerUrl: ""
    });

    const movieId = params.filmId;

    useEffect(() => {
        getMovieByIdService(movieId)
            .then((data) => {
                setMovie(data);
                setSelectedCategories(data.categories);
            })
            .catch((error) => {
                setError(error);
            });

        getCategoriesService()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    // Add a category to the selected categories
    const handleSelectCategory = (category) => {
        setError(null);
        if (!selectedCategories.find(cat => cat.id === category.id)) {
            if(selectedCategories.length <= 4) {
                setSelectedCategories(prevCategories => [...prevCategories, category]);
            } else {
                setError("Solo puedes seleccionar hasta 4 categorias");
            }
        }
    };

    // Remove a category from the selected categories
    const handleRemoveCategory = (category) => {
        const updatedCategories = selectedCategories.filter(cat => cat.id !== category.id);
        setSelectedCategories(updatedCategories);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "file") {
            const file = e.target.files[0];
            setNewMovie((prevMovie) => ({
                ...prevMovie,
                file: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setNewMovie((prevMovie) => ({
                ...prevMovie,
                [name]: value
            }));
        }
    }

    const handleDelete = () => {
        deleteMovieByIdService(movieId)
            .then(() => {
               window.location.href = "/admin/dashboard";
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for(let key in newMovie) {
            if (newMovie.file === undefined) {
                formData.append("posterUrl", movie.posterUrl);
            } else {
                formData.append("file", newMovie.file);
            }

            if (newMovie[key] === "" || newMovie[key] === null) {
                newMovie[key] = movie[key];
            }
        }

        formData.append("title", newMovie.title);
        formData.append("originalTitle", newMovie.originalTitle);
        formData.append("releaseDate", newMovie.releaseDate);
        formData.append("ageRestriction", newMovie.ageRestriction);
        formData.append("duration", newMovie.duration);
        formData.append("director", newMovie.director);
        formData.append("cast", newMovie.cast);
        formData.append("points", newMovie.points);
        formData.append("synopsis", newMovie.synopsis);
        formData.append("language", newMovie.language);
        formData.append("trailerUrl", newMovie.trailerUrl);
        formData.append("categories", JSON.stringify(selectedCategories));

        putMovieService(movieId, formData)
            .then((data) => {
                window.location.reload();
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });

            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });
    }

    return (
        <main className="w-full p-2">
            <h1 className={`${anton.className} text-center text-4xl 2xl:text-5xl`}>Editar Pelicula</h1>
            <div className='w-full h-1 bg-black my-3'/>
            <h2 className={`${anton.className} text-center text-5xl`}>{movie?.title}</h2>
            <form 
                onSubmit={handleSubmit} 
                encType="multipart/form-data"
                className="flex flex-col gap-4 p-4"
            >
                <label>
                    <input
                        type="text"
                        name="title"
                        placeholder={movie?.title}
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="originalTitle"
                        placeholder={movie?.originalTitle}
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label className="text-center flex flex-col items-center gap-1">
                    <h2 className="text-xl font-semibold 2xl:text-2xl">
                        Añadir categorias 
                    </h2>
                    <div id="categories" className="flex flex-col gap-1 w-[300px] md:w-[450px] h-[150px] overflow-y-auto">
                        {categories.map((category) => (
                            <div onClick={() => handleSelectCategory(category)} key={category.id} className="bg-oxford-blue text-lg hover:bg-ultramarine text-center rounded-xl text-white hover:cursor-pointer">{category.name}</div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-1 w-[300px] md:w-[450px]">
                        <h2 className="text-xl font-semibold 2xl:text-2xl">
                            Categorias Seleccionadas
                        </h2>
                        {selectedCategories.map((selectedCategory) => (
                            <div onClick={() => handleRemoveCategory(selectedCategory)} key={selectedCategory.id} className="bg-cerise hover:bg-sandy text-center rounded-xl text-white hover:cursor-pointer">{selectedCategory.name}</div>
                        ))}
                    </div>
                </label>
                <label>
                    <input
                        type="text"
                        name="releaseDate"
                        placeholder={movie?.releaseDate}
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="number"
                        name="ageRestriction"
                        placeholder={movie?.ageRestriction}
                        min={1}
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="number"
                        name="duration"
                        placeholder={movie?.duration}
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="director"
                        placeholder={movie?.director}
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="cast"
                        placeholder={movie?.cast}
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="number"
                        name="points"
                        min={1}
                        placeholder={movie?.points}
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="synopsis"
                        placeholder={movie?.synopsis}
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="language"
                        placeholder={movie?.language}
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <h2 className="font-semibold text-xl text-center my-2">
                        Portada actual de la pelicula
                    </h2>
                    <img src={movie?.posterUrl}/>
                </label>
                <label className="text-center flex flex-col gap-1">
                    <h2 className="font-bold text-xl">
                        Cambiar portada de la pelicula
                    </h2>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="text-sm 2xl:text-lg my-5 text-grey-500 file:mr-5 file:py-3 file:px-10 file:rounded-xl file:border-0 file:text-md file:font-semibold  file:text-white file:bg-sandy file:cursor-pointer hover:file:cursor-pointer hover:file:opacity-70"
                    />
                    {imagePreviewUrl &&
                        <div className="w-full md:flex md:items-center md:justify-center">
                            <img
                                src={imagePreviewUrl}
                                alt="Preview"
                                className="w-full h-auto mb-4 md:w-[300px]"
                            />
                        </div>
                    }

                </label>
                <label>
                    <input
                        type="text"
                        name="trailerUrl"
                        placeholder={movie?.trailerUrl}
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <button type="submit" className="bg-sandy text-white p-3 rounded-xl text-base md:text-xl font-bold hover:bg-cerise">EDITAR</button>
                <motion.div
                    onClick={handleDelete} 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.9 }}
                    className='hover:cursor-pointer w-full bg-red-500 h-full items-center flex justify-center p-3 rounded-xl'
                >
                    <h2 className='tex-xl text-white font-bold'>ELIMINAR</h2>
                </motion.div>
            </form>         
        </main>
    );
};

export default EditMovieForm;
