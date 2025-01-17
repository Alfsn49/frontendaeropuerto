"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
function LoginPage() {
  const { register, handleSubmit, formState:{errors} } = useForm<Inputs>()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res)
      if (res?.error) {
        setError(res.error)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
  });
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <img src="https://static-00.iconduck.com/assets.00/user-login-icon-1948x2048-nocsasoq.png" alt="" width="200px" className='px-10' />
      <form onSubmit={onSubmit} action="">
      {error && (
          <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">{error}</p>
        )}

      <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>
        <label htmlFor="email" className='text-slate-500 mb-2 block text-sm'>
          Email:
        </label>
        <input type="email" 
        { ...register("email", {
        required:{
          value:true,
          message:'Email is required'
        },
        })} className='border border-slate-500 p-2 mb-4 w-full text-black' />
        {errors.email && 
          (<span className="text-red-500 text-xs">
            {errors.email.message}
          </span>)
        }
        <label htmlFor="password" className='text-slate-500 mb-2 block text-sm'>
          Password:
        </label>
        <input type="password" 
        { ...register("password", {
        required:{
          value:true,
          message:'Password is required'
        },
        })} className='border border-slate-500 p-2 mb-4 w-full text-black' />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage