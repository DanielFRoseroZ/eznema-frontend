import { DeleteIcon } from "@/utils/icons";

export default function DeleteIconBtn({ onClick }) {
    return (
        <button onClick={onClick} className="bg-red-600 p-2 rounded-md flex items-center">
            <h2 className="text-white text-center text-xl font-bold hidden md:block">
                Eliminar
            </h2>
            <DeleteIcon className="text-white w-10 h-10" />
        </button>
    );
}