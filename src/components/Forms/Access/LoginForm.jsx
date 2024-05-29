import ShowPasswordBtn from "@/components/Buttons/ShowPassword"
import { validateEmail, validatePassword } from "@/services/validateFields"
import { useState } from "react"
import { loginService } from "@/services/fetchData";

export default function LoginForm({ handleToggle }) {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.username === "" || data.password === "") {
            setError("Todos los campos son obligatorios")
            return;
        }
        if(!validateEmail(data.username)) {
            setError("Correo electrónico inválido")
            return;
        }
        if(!validatePassword(data.password)) {
            setError("La contraseña debe tener al menos 8 caracteres")
            return;
        }
        try{
            loginService(data)
        } catch (error) {
            setError("Usuario o contraseña incorrectos")
            console.log(error)
        }

    }
        

    return(
        <main>
            <section className="bg-white md:p-3">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
                    <label className="flex flex-col gap-1">
                        <input 
                            type="text" 
                            name="username"
                            placeholder="Correo electrónico"
                            onChange={handleChange}
                            className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                        />
                    </label>
                    <label className="flex gap-1 px-1 items-center">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            placeholder="Contraseña"
                            onChange={handleChange}
                            className="w-full border-2 border-black border-opacity-20 p-2 md:text-lg rounded-xl focus:outline-none focus:border-ultramarine"
                        />
                        <ShowPasswordBtn visible={showPassword} setVisible={handleShowPassword}/>
                    </label>
                    <button type="submit" className="bg-oxford-blue text-white p-3 rounded-xl text-base md:text-xl font-bold hover:bg-ultramarine">Iniciar sesión</button>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                </form>
            </section>
        </main>
    )
}