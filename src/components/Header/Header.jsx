'use client'

import { useState } from "react";
import { MenuIcon } from "@/utils/icons";
import { anton } from "@/utils/fonts";
import Link from "next/link";
import MenuModal from "../Modals/MenuModal";

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);

    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return(
        <header className="w-full bg-oxford-blue h-[80px] md:h-[110px] flex justify-between px-5 md:px-14 sticky top-0 z-50">
            <div className="flex items-center">
                <Link href={"/"} className="flex items-center gap-2 md:gap-4">
                    <img src="images/logo.jpg" alt="Logo" className="w-14 md:w-24"/>
                    <h1 className={`${anton.className} text-4xl md:text-6xl flex text-white`}><p className="text-cerise">EZ</p>nema</h1>
                </Link>
            </div>
            <div className="flex items-center">
                <MenuIcon 
                    onClick={handleToggleMenu}
                    className="w-14 h-14 md:w-20 md:h-20 text-white rounded-full hover:bg-cerise p-2 hover:cursor-pointer"
                />
            </div>
            {showMenu && <MenuModal handleClose={handleToggleMenu} closeFromLink={() => setShowMenu(false)}/>}   
        </header>
    )
}