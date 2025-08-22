'use client'
import Link from 'next/link'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Navbar() {

    const { data: session } = useSession();
    // console.log(session);

    const links = [
        {
            name: "Home",
            to: "/"
        },
        {
            name: "Products",
            to: "/products"
        },
        {
            name: "Add Product",
            to: "/dashboard/add-product"
        },
        !session?.user && { name: "Register", to: "/signup" },
        session?.user ? { name: "Logout", onclick: () => signOut() }
            : { name: "Login", onclick: () => signIn() }
    ]



    return (
        <div className="navbar bg-base-100 shadow-sm flex justify-between px-4">
            <div className="">
                <a className="btn btn-ghost text-xl">WalmartPro</a>
            </div>
            <div>
                <ul className='flex items-center justify-between gap-4 list-none'>
                    {
                        links.map((link, idx) => (
                            <li key={idx}>
                                {
                                    link.to ? <Link href={link.to}>{link.name}</Link>
                                        : link.onclick && <button onClick={link.onclick} className="btn bg-white text-black">{link.name}</button>
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div  className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
