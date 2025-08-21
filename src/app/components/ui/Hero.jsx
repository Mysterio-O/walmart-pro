import React from 'react'

export default function Hero() {
    return (
        <div className="hero bg-base-200 py-12 px-8">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <img
                        src="/images.jpeg"
                        className=" rounded-lg h-72 shadow-2xl"
                    />
                </div>
                <div className='flex-1'>
                    <h1 className="text-5xl font-bold">Sale is ON!</h1>
                    <p className="py-6">
                        WalmartPro makes shopping easy and convenient. Enjoy our wide range of products at unbeatable prices. Don't miss out on our exclusive offers and discounts!
                    </p>
                    <button className="btn bg-gradient-to-b from-cyan-400 via-blue-400 to-white shadow-2xl hover:bg-white hover:text-white hover:border-cyan-400 hover:border-2 transition-all duration-200 rounded-xl">Products</button>
                </div>
            </div>
        </div>
    )
}
