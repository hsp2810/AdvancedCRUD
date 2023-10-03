import Link from "next/link";
import React from "react";
import AddRoomModal from "./AddRoomModal";
import { Room } from "@prisma/client";
import prisma from "@/prisma/setup";

interface PageProps {
  params: {
    roomslug: string;
  };
}

export default async function Room({ params: { roomslug } }: PageProps) {
  const room: Room | null = await prisma.room.findUnique({
    where: {
      slug: roomslug,
    },
  });

  if (!room)
    return (
      <main className='flex-[80] ml-5 rounded-md'>
        <h1 className='text-center text-xl'>
          Select a room to view information.
        </h1>
        <div className='divider divider-horizontal text-xs w-1/2 my-5 mx-auto'>
          OR
        </div>
        <h1 className='text-center text-xl'>Create a new room</h1>
        <div className='w-fit mt-5 m-auto'>
          <AddRoomModal />
        </div>
      </main>
    );

  return (
    <main className='flex-[80] ml-5 rounded-md'>
      <div className='absolute right-[1em] top-[6em]'>
        <AddRoomModal />
      </div>
      <section className='p-5 bg-gray-2 mt-[2em] rounded-md'>
        <h1 className='text-3xl font-bold text-green-11'>{room.name}</h1>
        <p className='text-sm my-2'>{room.description}</p>
        <Link
          href={`/dashboard/${roomslug}/items`}
          className='btn btn-solid-success mt-10'
        >
          View added items
        </Link>
        <button className='btn btn-solid-error mx-3'>Remove room</button>
        <button className='btn btn-solid-warning'>Edit room</button>
      </section>
    </main>
  );
}
