import ShowPasswordBtn from "@/components/Buttons/ShowPassword"
import { useState } from "react"
import { validateEmail, validatePassword, validateName, validateLastName, validatePhone, validateConfirmPassword } from "@/services/validateFields"
import { registerService } from "@/services/fetchData"
import fetchData from "@/services/fetchData/test"

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState(null)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(null)

        if(data.firstName === "" || data.lastName === "" || data.phone === "" || data.username === "" || data.password === "" || data.confirmPassword === "") {
            setError("Por favor, completa todos lo campos")
            return
        }
        if(!validateName(data.firstName)) {
            setError("Nombre inválido, solo se permiten letras")
            return
        }
        if(!validateLastName(data.lastName)) {
            setError("Apellido inválido, solo se permiten letras")
            return
        }
        if(!validatePhone(data.phone)) {
            setError("Teléfono inválido, solo se permiten números y solo 10 dígitos")
            return
        }
        if(!validateEmail(data.username)) {
            setError("Correo electrónico inválido, debe tener un formato válido")
            return
        }
        if(!validatePassword(data.password)) {
            setError("La contraseña debe tener al menos 8 caracteres")
            return
        }
        if(!validateConfirmPassword(data.password, data.confirmPassword)) {
            setError("Las contraseñas no coinciden")
            return
        }

        const formatedData = {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            username: data.username,
            password: data.password
        }
        try {
            registerService(formatedData)
            .then((response) => {
                console.log(response)
                window.location.href = "/"
            })
        } catch (error) {
            setError("Ocurrió un error al registrarte, el correo electrónico ya está en uso")
            console.log(error)
        }
    }

    return(
        <div className="w-ful">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
            >
                <label className="flex flex-col gap-1">
                    <input 
                        type="text"
                        name="firstName"
                        placeholder="Nombre"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 rounded-xl 2xl:text-2xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <input 
                        type="text"
                        name="lastName"
                        placeholder="Apellido"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 rounded-xl 2xl:text-2xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Teléfono"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 rounded-xl 2xl:text-2xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <input 
                        type="text"
                        name="username"
                        placeholder="Correo electrónico"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 rounded-xl 2xl:text-2xl focus:outline-none focus:border-ultramarine"
                    />
                </label>
                <label className="flex gap-1 px-1 items-center">
                    <input 
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 rounded-xl 2xl:text-2xl focus:outline-none focus:border-ultramarine"
                    />
                    <ShowPasswordBtn visible={showPassword} setVisible={handleShowPassword}/>
                </label>
                <label className="flex gap-1 px-1 items-center">
                    <input 
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirmar contraseña"
                        onChange={handleChange}
                        className="w-full border-2 border-black border-opacity-20 p-2 rounded-xl 2xl:text-2xl focus:outline-none focus:border-ultramarine"
                    />
                    <ShowPasswordBtn visible={showConfirmPassword} setVisible={handleShowConfirmPassword}/>
                </label>
                <button
                    type="submit"
                    className="bg-oxford-blue text-white p-3 rounded-xl 2xl:text-2xl text-base font-bold hover:bg-ultramarine"
                >
                    Registrarse
                </button>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
        </div>
    )
}