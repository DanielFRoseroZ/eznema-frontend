import { CloseIcon } from "@/utils/icons";
import LoginForm from "../Forms/Access/LoginForm";
import Link from "next/link";

export default function MenuModal({ handleClose, closeFromLink }) {

    return(
        <main className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
            <div>
                <section className="bg-oxford-blue p-2 md:p-8 flex flex-col justify-center items-center relative rounded-t-xl">
                    <div onClick={handleClose} className="absolute top-2 right-2 bg-cerise rounded-full p-1 m-2 hover:cursor-pointer flex items-center justify-center">
                        <CloseIcon className="w-6 h-6 md:w-10 md:h-10 text-white cursor-pointer"/>
                    </div>
                    <img src="images/logo.jpg" alt="Logo" className="w-32 md:w-48"/>
                    <div className="flex flex-col items-center gap-2">
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
}