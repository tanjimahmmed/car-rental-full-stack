import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#0558fe] to-[#a9cfff] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden'>
        <div className="text-white">
            <h2 className='text-3xl font-medium'>Do you own a luxury car?</h2>
            <p className='mt-2'>Monetize your vehicle effortlessly by listing it on CarRental</p>
            <p className='max-w-130'>We take care of insurance, driver verification and secure payments - so you can earn passive income, stress-free</p>

            <button className='px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer'>List your cars</button>
        </div>
        <img src={assets.banner_car_image} alt="car" className='max-h-45 mt-10'/>
    </div>
  )
}

export default Banner