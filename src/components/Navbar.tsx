import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

async function Navbar() {
  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <nav className='flex justify-between items-center bg-gray-950 text-white px-24 py-3'>
        <h1 className='text-xl font-bold'>Sistema de Aeropuerto</h1>

        <ul className='flex gap-x-2'>
            {!session?.user ? (
              <>
              <li>
                <Link  href="/">Página principal</Link>
              </li>
              <li>
                  <Link href="/auth/login">Iniciar Sesión</Link>
              </li>
              <li>
                  <Link href="/auth/register">Registrar</Link>
              </li>
              </>
            ):(
              <>
              <li>
                <Link  href="/dashboard">Página principal</Link>
            </li>
            <li>
                <Link href="/register">Registrar vuelo</Link>
            </li>
            <li>
              <Link href="/dashboard/vuelosview">Ver Vuelos </Link>
            </li>
            <li>
              <Link href="/dashboard/vuelosedit">Editar Vuelos </Link>
            </li> 
              </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar