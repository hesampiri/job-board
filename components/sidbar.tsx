"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Sidbar = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='sm:hidden'>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            <Menu className="w-6 h-6" />
        </button>
        <nav className={`fixed top-0 right-0 h-screen transition-all duration-300 ${isOpen ? "w-52" : "w-0"} overflow-hidden bg-black`}>
            <div className="p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Menu</h2>
                <button onClick={() => setIsOpen(false)} className="p-2">
                    <X className="w-6 h-6" />
                </button>
            </div>
            <ul className="flex flex-col gap-4 p-4">
                <li>
                    <Link href="/" className="hover:text-gray-700 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
                </li>
                <li>
                    <Link href="/dashboard" className="hover:text-gray-700 transition-colors" onClick={() => setIsOpen(false)}>Dashboard</Link>
                </li>
                <li>
                    <Link href="/contact" className="hover:text-gray-700 transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Sidbar