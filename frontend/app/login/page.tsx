'use client'

import Link from 'next/link';
import api from '../axios/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { handleAxiosError } from '../axios/handleAxiosError';
import { IUserLogin } from '../interfaces/user.interface';

export default function Login() {
  const schema = yup.object({
    email: yup.string().required('Email é obrigatório').email('Email precisa ser válido'),
    password: yup.string().required('Senha é obrigatória').min(4, 'Senha precisa ter pelo menos 4 caracteres').max(30, 'Senha pode ter no máximo 30 caracteres'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const router = useRouter();

  const handleLogin = async (userRegister: IUserLogin) => {
    try {
      const { data: { message: token } } = await api.post('/users/login', userRegister);
      localStorage.setItem('token', JSON.stringify(token));
      router.push('/');
    } catch (error) {
      handleAxiosError(error as AxiosError);
    }
  }

  return (
    <main className='h-screen flex items-center justify-center bg-slate-100'>
      <form onSubmit={handleSubmit(handleLogin)} className="max-w-md mx-auto my-4 p-6 bg-white rounded-md shadow-md flex flex-col w-full gap-4">
        <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>Login</h1>
        <input
          type="email"
          {...register("email")}
          placeholder='Email'
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.email && <p className='text-red-600 text-sm mt-1'>{errors.email?.message}</p>}
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.password && <p className='text-red-600 text-sm mt-1'>{errors.password?.message}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">Enviar</button>
        <Link href='/register' className='text-center text-blue-500 text-sm hover:underline'>Não tem uma conta? Faça registro aqui.</ Link>
      </form>
    </main>
  )
}