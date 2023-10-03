"use client";

import { LoginUser } from "@/types";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const defUser: LoginUser = {
  email: "first@gmail.com",
  password: "password",
};

export default function Login() {
  const [user, setUser] = useState<LoginUser>(defUser);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await signIn("credentials", {
        email: user.email,
        password: user.password,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mx-auto flex w-full max-w-sm flex-col gap-6 mt-10'>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-semibold'>Sign In</h1>
        <p className='text-sm'>Sign in to access your account</p>
      </div>
      <div className='form-group'>
        <div className='form-field'>
          <label className='form-label'>Email address</label>

          <input
            placeholder='Type here'
            type='email'
            className='input max-w-full'
            name='email'
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className='form-field'>
          <label className='form-label'>Password</label>
          <div className='form-control'>
            <input
              placeholder='Type here'
              type='password'
              className='input max-w-full'
              name='password'
              value={user.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='form-field'>
          <div className='form-control justify-between'>
            <div className='flex gap-2'>
              <input type='checkbox' className='checkbox' />
              <a href='#'>Remember me</a>
            </div>
            <label className='form-label'>
              <a className='link link-underline-hover link-primary text-sm'>
                Forgot your password?
              </a>
            </label>
          </div>
        </div>
        <div className='form-field pt-5'>
          <div className='form-control justify-between'>
            <button
              type='button'
              className='btn btn-primary w-full'
              onClick={login}
            >
              Sign in
            </button>
          </div>
        </div>

        <div className='form-field'>
          <div className='form-control justify-center'>
            <Link
              href='/signup'
              className='link link-underline-hover link-primary text-sm'
            >
              Don't have an account yet? Sign up.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
