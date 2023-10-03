"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data, status } = useSession();

  if (status === "loading") return <>Loading...</>;

  return (
    <div className='navbar rounded-lg'>
      <div className='navbar-start'>
        <Link href={"/dashboard"} className='navbar-item'>
          HomeNventory{" "}
        </Link>
        {status === "authenticated" && data?.user?.name && (
          <span className='ml-2 text-green-600'>Hello, {data?.user?.name}</span>
        )}
      </div>
      {status === "authenticated" && (
        <div className='navbar-end mt-3'>
          <div className='avatar-lg rounded-full'>
            <div className='dropdown-container'>
              <div className='dropdown'>
                <div className='flex'>
                  <label
                    className='btn btn-ghost flex cursor-pointer px-0'
                    tabIndex={0}
                  >
                    <img
                      src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
                      alt='avatar'
                      className='rounded-full'
                    />
                  </label>
                </div>
                <div className='dropdown-menu dropdown-menu-bottom-left'>
                  <Link
                    href={"/profile"}
                    className='dropdown-item text-sm text-center'
                  >
                    Profile
                  </Link>

                  <button
                    tabIndex={-1}
                    className='dropdown-item text-sm'
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
