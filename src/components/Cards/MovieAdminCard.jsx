import Link from "next/link"
import { anton } from "@/utils/fonts"
import { motion } from "framer-motion"

export default function MovieAdminCard({ movie }) {
    return(
        <Link href={`/admin/update/film/${movie.id}`}>
            <motion.div 
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-cerise rounded-xl p-2.5"
            >
                <h2 className={`${anton.className} text-center text-2xl text-white font-bold`}>
                    {movie.title}
                </h2>
            </motion.div>
        </Link>
    )
}
