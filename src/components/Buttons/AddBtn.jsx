import { motion } from "framer-motion";
import { AddIcon } from "@/utils/icons";

export default function AddBtn(){
    return(
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed flex items-center bottom-8 right-8 bg-cerise hover:bg-sandy p-3 rounded-full shadow-lg"
        >
            <h1 className="hidden md:block text-white font-bold text-center text-2xl">CREAR</h1>
            <AddIcon className="h-8 w-8 md:h-12 md:w-12 text-white"/>
        </motion.button>
    )
}