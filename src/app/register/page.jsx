'use client';

import RegisterForm from "@/components/Forms/Access/RegisterForm";
import Link from "next/link";

export default function Register() {
    return(
        <main className="w-full overflow-y-auto">
            <section className="px-5 py-10 md:px-64 2xl:mx-80">
                <div className="bg-oxford-blue text-white text-center p-10 flex flex-col gap-5 rounded-xl">
                    <h2 className=" text-4xl 2xl:text-6xl font-bold">Regístro</h2>
                    <p className="2xl:text-xl">¡Únete a EZnema y no te pierdas nungún estreno!</p>
                </div>
                <div className="my-5">
                    <RegisterForm />
                </div>
                <div className="text-center 2xl:text-xl">
                    <h2>
                        ¿Ya tienes cuenta? <Link href="/"><span className="text-ultramarine hover:underline font-bold">Inicia sesión</span></Link>
                    </h2>
                </div>
            </section>
            <section className="w-full bg-oxford-blue text-white p-10 text-center">
                <h2 className="text-xl 2xl:text-2xl font-semibold flex flex-col gap-3">
                    Estas a un paso de disfrutar de las mejores experiencias que el cine tiene para ti.  <p className="text-sandy text-2xl">¡Regístrate ya!</p> Recuerda que para poder comprar tus boletos, necesitas tener una cuenta en EZnema.
                </h2>
            </section>
        </main>
    )
}