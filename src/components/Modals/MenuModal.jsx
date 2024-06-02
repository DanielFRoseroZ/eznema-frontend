import { CloseIcon } from "@/utils/icons";
import LoginForm from "../Forms/Access/LoginForm";
import Link from "next/link";
import parseJwt from "@/utils/parseJWT";
import { motion } from "framer-motion";
import { logoutService } from "@/services/fetchData";

export default function MenuModal({ handleClose, closeFromLink, token}) {
    if(token){
        var user = parseJwt(token);
    }
    
    const handleLogout = async () => {
        await logoutService().then(() => {
            window.location.reload();
        })
    }

    if(token === undefined) {
        return(
            <main className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="z-50">
                    <section className="bg-oxford-blue z-50 p-2 md:p-8 flex flex-col justify-center items-center relative rounded-t-xl">
                        <div onClick={handleClose} className="absolute top-2 right-2 bg-cerise rounded-full p-1 m-2 hover:cursor-pointer flex items-center justify-center">
                            <CloseIcon className="w-6 h-6 z-50 md:w-10 md:h-10 text-white cursor-pointer"/>
                        </div>
                        <img src="/images/logo.jpg" alt="Logo" className="w-32 md:w-48 z-50"/>
                        <div className="flex flex-col items-center gap-2 z-50">
                            <h2 className="text-white text-xl md:text-3xl font-bold">Iniciar sesión</h2>
                            <p className="text-white text-base md:text-xl text-center">¡Bienvenido!, ingresa con tu correo y contraseña</p>
                        </div>
                    </section>
                    <LoginForm/>
                    <section className="bg-oxford-blue p-5 flex justify-center rounded-b-xl">
                        <p className="text-white text-base md:text-xl">¿No tienes cuenta? &nbsp;</p> 
                        <Link href={'/register'} onClick={closeFromLink}>
                            <span className="text-cerise md:text-xl font-bold hover:underline">Regístrate</span>
                        </Link>
                    </section>
                </div>
            </main>
        )
    } else {
        return (
            <main className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="z-50 w-[350px] bg-white rounded-xl">
                    <section className="bg-oxford-blue z-50 p-2 md:p-8 flex flex-col justify-center items-center relative rounded-t-xl">
                        <div onClick={handleClose} className="absolute top-2 right-2 bg-cerise rounded-full p-1 m-2 hover:cursor-pointer flex items-center justify-center">
                            <CloseIcon className="w-6 h-6 z-50 md:w-10 md:h-10 text-white cursor-pointer"/>
                        </div>
                        <img src="/images/logo.jpg" alt="Logo" className="w-32 md:w-48 z-50"/>
                        <div className="flex flex-col items-center gap-2 z-50"> 
                            {user.role === "ADMIN" && (
                                <h2 className="text-white text-xl md:text-3xl font-bold">¡Hola Jefe!</h2>
                            )}
                            {user.role === "USER" && (
                                <h2 className="text-white text-xl md:text-3xl font-bold">!Hola, {user.firstName}! </h2>
                            )}
                            <p className="text-white text-base md:text-xl text-center">¿Qué deseas hacer?</p>
                        </div>
                    </section>
                    <section className="p-4 flex flex-col gap-2">
                        <Link href={'/admin/dashboard'} onClick={closeFromLink}>
                            <motion.div 
                                className="bg-sandy p-3 flex justify-center rounded-xl"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <p className="text-white text-base md:text-xl font-bold">DashBoard</p>
                            </motion.div>
                        </Link>
                        {user.role === "ADMIN" && (
                            <Link href={'/admin/users'} onClick={closeFromLink}>
                               <motion.div 
                                    className="bg-green-500 p-3 flex justify-center rounded-xl"
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                   <p className="text-white text-base md:text-xl font-bold">Ver Usuarios</p>
                               </motion.div>
                           </Link>
                        )}
                        <motion.div
                            onClick={handleLogout} 
                            className="bg-cerise p-3 flex justify-center rounded-xl"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <p className="text-white text-base md:text-xl font-bold">Cerrar sesion</p>
                        </motion.div>
                    </section>
                </div>
            </main>
        )
    }
}