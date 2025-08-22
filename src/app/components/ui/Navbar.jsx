'use client'
import Link from 'next/link'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import ThemeSwitch from './ThemeSwitch';

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
        session?.user ? { name: "Logout", onclick: () => signOut({ callbackUrl: '/' }) }
            : { name: "Login", onclick: () => signIn() }
    ]



    return (
        <div className="navbar bg-base-100 dark:bg-gray-500 shadow-sm flex justify-between px-4">
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
            <div>
                <ThemeSwitch />
            </div>
        </div>
    )
}
