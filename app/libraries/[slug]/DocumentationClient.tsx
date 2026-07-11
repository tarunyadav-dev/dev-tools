"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function DocumentationClient({
    sidebar,
    children,
}:{
    sidebar: React.ReactNode;
    children: React.ReactNode;
}){

    const [sidebarOpen,setSidebarOpen]=useState(false);

    return(

        <div className="relative flex h-[calc(100vh-84px)] overflow-hidden">

            {/* Mobile Menu */}

            <button
                onClick={()=>setSidebarOpen(true)}
                className="
                    fixed
                    bottom-6
                    left-6
                    z-50

                    flex
                    h-14
                    w-14

                    items-center
                    justify-center

                    rounded-2xl

                    border
                    border-white/10

                    bg-[#111827]/90

                    backdrop-blur-xl

                    shadow-2xl

                    lg:hidden
                "
            >

                <Menu size={22}/>

            </button>

            {/* Overlay */}

            {
                sidebarOpen && (

                    <div

                        onClick={()=>setSidebarOpen(false)}

                        className="
                            fixed
                            inset-0

                            z-40

                            bg-black/60

                            lg:hidden
                        "

                    />

                )
            }

            {/* Sidebar */}

            <aside

                className={`
                    fixed
                    left-0
                    top-0

                    z-50

                    h-screen
                    w-[320px]

                    bg-[#06070b]

                    transition-transform
                    duration-300

                    overflow-y-auto

                    scroll-smooth
                    scrollbar-none

                    ${
                        sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }

                    lg:relative
                    lg:flex
                    lg:h-auto
                    lg:w-80
                    lg:translate-x-0
                `}
            >

                <div className="relative h-full">

                    {/* Close */}

                    <button

                        onClick={()=>setSidebarOpen(false)}

                        className="
                            absolute
                            right-4
                            top-4

                            rounded-lg

                            p-2

                            hover:bg-white/10

                            lg:hidden
                        "
                    >

                        <X size={18}/>

                    </button>

                    {sidebar}

                </div>

            </aside>

            {/* Markdown */}

            <main

                className="
                    min-w-0
                    flex-1

                    
        overflow-y-auto

        scroll-smooth
        scrollbar-none
                "

            >

                {children}

            </main>

        </div>

    );

}