import { cookies } from "next/headers";
import HomePage from "@/components/ClientComponents/HomePage";

export default function Page() {
    const cookie = cookies();
    const token = cookie.get('eznema')?.value;

    return(
        <HomePage initial={{token}} />
    )
}