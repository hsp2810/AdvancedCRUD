"use client";

import { RegisterUser } from "@/types";
import { User } from "@prisma/client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const defUser: RegisterUser = {
  name: "",
  email: "",
  password: "",
};

interface Response {
  message?: string;
  error?: string;
  user?: User;
}

export default function Signup() {
  const [registerUser, setRegisterUser] = useState<RegisterUser>(defUser);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const { email, name, password } = registerUser;

      if (!email || !name || !password) return;

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(registerUser),
      });
      const data: Response = await response.json();

      await signIn("credentials", {
        email: registerUser.email,
        password: registerUser.password,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mx-auto flex w-full max-w-sm flex-col gap-6 mt-10'>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-semibold'>Sign up</h1>
        <p className='text-sm'>Fill this form to register to the application</p>
      </div>
      <div className='form-group'>
        <div className='form-field'>
          <label className='form-label'>Email address</label>
          <input
            placeholder='Type here'
            type='email'
            className='input max-w-full'
            value={registerUser.email}
            name='email'
            onChange={handleChange}
          />
        </div>
        <div className='form-field'>
          <label className='form-label'>Name</label>
          <div className='form-control'>
            <input
              placeholder='Type here'
              type='text'
              className='input max-w-full'
              value={registerUser.name}
              name='name'
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='form-field'>
          <label className='form-label'>Password</label>
          <div className='form-control'>
            <input
              placeholder='Type here'
              type='password'
              className='input max-w-full'
              name='password'
              value={registerUser.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='form-field'>
          <div className='form-control'>
            <div className='flex gap-2 items-center'>
              <input type='checkbox' id='terms' className='checkbox text-sm' />
              <label className='text-xs cursor-pointer' htmlFor='terms'>
                By registering, you agree to our terms and conditions
              </label>
            </div>
          </div>
        </div>
        <div className='form-field pt-5'>
          <div className='form-control justify-between'>
            <button
              type='button'
              className='btn btn-primary w-full'
              onClick={handleRegister}
            >
              Sign up
            </button>
          </div>
        </div>

        <div className='form-field'>
          <div className='form-control justify-center'>
            <Link
              href='/login'
              className='link link-underline-hover link-primary text-sm'
            >
              Already have an account yet? Sign in.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
