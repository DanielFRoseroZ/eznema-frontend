import { useState } from "react"
import { postCategoriesService } from "@/services/fetchData"

export default function CreateCategorie() {
    const [categorie, setCategorie] = useState({
        name: ""
    })

    const handleChange = (e) => {
        setCategorie({
            ...categorie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await postCategoriesService(categorie)
            .then(() => {
                window.location.reload()
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
            >
                <label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        placeholder="Nombre de la Categoria"
                        className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <button type="submit" className="bg-sandy text-white p-3 rounded-xl text-base md:text-xl font-bold hover:bg-cerise w-full">Crear</button>
            </form>
        </main>
    )
}