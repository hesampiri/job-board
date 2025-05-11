import Link from 'next/link'
import React from 'react'
import Sidbar from './sidbar'
import { Switch } from "@/components/ui/switch"
import SigninDialog from './signinDialog'


const Navbar = () => {
  return (
    <div className='flex sm:flex-row justify-between items-center bg-black text-white p-4 container mx-auto sticky top-0 z-10'>
        <Link href="/">
        <h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-0'>Job Board</h1>
        </Link>
        <ul className='sm:flex hidden flex-col sm:flex-row gap-2 sm:gap-4 text-sm sm:text-base items-center'>
            <li>
                <Switch />
            </li>
            <li>
                <Link href="/" className='hover:text-gray-300 transition-colors'>Home</Link>
            </li>
            <li>
                <Link href="/dashboard" className='hover:text-gray-300 transition-colors'>Dashboard</Link>
            </li>
            <li>
                <Link href="/contact" className='hover:text-gray-300 transition-colors'>Contact</Link>
            </li>
            {/* <li>
                <SigninDialog />
            </li> */}
        </ul>
        <Sidbar />
    </div>
  )
}

export default Navbar
