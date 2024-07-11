'use client'
import React from 'react'
import {signOut} from 'next-auth/react'

function DashboardPage() {
  return (
    <div>DashboardPage

      <div>
        <button className='bg-white text-black px-4 py-2 rounded-md mt-4'
        onClick={() => signOut()}
        >Cerrar sesión</button>
      </div>
    </div>
  )
}

export default DashboardPage