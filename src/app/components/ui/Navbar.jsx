import Link from 'next/link'
import React from 'react'

export default function Navbar() {

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
            name: "About",
            to: "/about"
        },
        {
            name: "Login",
            to: "/login"
        }
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
                                <Link href={link.to}>{link.name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
