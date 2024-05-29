import { DontShowPassIcon, ShowPassIcon } from "@/utils/icons";

export default function ShowPasswordBtn({ visible, setVisible }) {
    return (
        <button
            type="button"
            className="h-full flex items-center w-10 justify-center text-gray-600 hover:text-sandy"
            onClick={setVisible}
        >
            {visible ? (
                <DontShowPassIcon className="w-8 h-8" />
            ) : (
                <ShowPassIcon className="w-8 h-8" />
            )}
        </button>
    )
}