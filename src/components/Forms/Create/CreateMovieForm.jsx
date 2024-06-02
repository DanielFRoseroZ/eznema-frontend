import { useState, useEffect } from "react"
import { getCategoriesService, postMovieService } from "@/services/fetchData"
import { anton } from "@/utils/fonts";
import { navigate } from "@/utils/navigation";

export default function CreateMovieForm() {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [categoriesError, setCategoriesError] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState({
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

    useEffect(() => {
        getCategoriesService()
            .then((categories) => {
                setCategories(categories);
            })
    }, [])

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
        const { name, value, type, files } = e.target;
        if (type === "file" && files.length > 0) {
            const reader = new FileReader();
            const file = files[0];
    
            reader.onloadend = () => {
                setMovie({
                    ...movie,
                    [name]: file,
                });
                setImagePreviewUrl(reader.result); // Establecer la URL de la vista previa
            };
    
            reader.readAsDataURL(file);
        } else {
            setMovie({
                ...movie,
                [name]: value,
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new FormData object to send the movie data
        const formData = new FormData();
        Object.keys(movie).forEach(key => {
            formData.append(key, movie[key]);
        });

        formData.append("categories", JSON.stringify(selectedCategories));

        //Debug: Ver todos los datos en FormData
        // formData.forEach((value, key) => {
        //     console.log(`${key}: ${value}`);
        // });


        try {
            const response = await postMovieService(formData);
            if (response.status === 201) {
                console.log(response.status)
            }
        } catch (error) {
            setError("Error al crear la pelicula");
            return;
        }
        
        navigate("/");
    }

    return (
        <main className="w-full p-2">
            <h1 className={`${anton.className} text-center text-4xl 2xl:text-5xl`}>Añadir una Pelicula</h1>
            <form 
                onSubmit={handleSubmit} 
                encType="multipart/form-data"
                className="flex flex-col gap-4 p-4"
            >
                <label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Titulo"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="originalTitle"
                        placeholder="Titulo original"
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
                {categoriesError && <p className="text-red-500 text-center">{error}</p>}
                <label>
                    <input
                        type="text"
                        name="releaseDate"
                        placeholder="Fecha de estreno"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="number"
                        name="ageRestriction"
                        placeholder="Restricción de edad"
                        min={1}
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="number"
                        name="duration"
                        placeholder="Duración"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="director"
                        placeholder="Director"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="cast"
                        placeholder="Reparto"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="number"
                        name="points"
                        min={1}
                        placeholder="Puntos"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="synopsis"
                        placeholder="Sinopsis"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="language"
                        placeholder="Idioma"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label className="text-center flex flex-col gap-2">
                    <h2 className="font-semibold text-xl">
                        Portada de la pelicula
                    </h2>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="text-sm 2xl:text-lg my-10 text-grey-500 file:mr-5 file:py-3 file:px-10 file:rounded-xl file:border-0 file:text-md file:font-semibold  file:text-white file:bg-sandy file:cursor-pointer hover:file:cursor-pointer hover:file:opacity-70"
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
                        placeholder="Link al Trailer"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <button type="submit" className="bg-sandy text-white p-3 rounded-xl text-base md:text-xl font-bold hover:bg-cerise">Crear</button>
            </form>
            {error && <p className="text-red-500 text-center">{error}</p>}
        </main>
    )
}
