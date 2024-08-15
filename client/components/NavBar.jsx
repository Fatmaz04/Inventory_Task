import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../Images/logo.png"
import { useAuth } from '@/contexts/AuthContext'

function NavBar() {
    const {logout} = useAuth();
    function handleLogOut(){
        logout();
    }
  return (
    <div className='grid grid-cols-3 bg-light p-2'>
        <Image src={logo} height={100} className='mt-1' alt='logo'/>
        <ul className='flex flex-row justify-center'>
            <li className='m-10 text-orgblue text-xl font-bold'>
            <Link href="/Home">Home</Link>
            </li>
            <li className='m-10 text-orgblue text-xl font-bold'>
            <Link href="/Add">Add</Link>
            </li>
        </ul>
        <div className='flex justify-center align-center'> 
        <button
        onClick={handleLogOut}
        className="text-[#fff]  h-10 border m-7 px-6 border-orgblue bg-orgblue rounded-md hover:bg-[#fff] hover:text-orgblue transition duration-300"
        >Log Out</button>
        </div>
    </div>
  )
}

export default NavBar
