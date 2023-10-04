import React from "react";
import Card from "./Card";
import Link from "next/link";
import AddItemModal from "./AddItemModal";
import prisma from "@/prisma/setup";
import { Room } from "@prisma/client";

interface PageProps {
  params: {
    roomslug: string;
  };
}

export default async function RoomItems({ params: { roomslug } }: PageProps) {
  const room = await prisma.room.findUnique({ where: { slug: roomslug } });
  const items = await prisma.item.findMany({});

  return (
    <main className='flex-[85] ml-5 rounded-md'>
      <div className='flex justify-between items-center mb-5'>
        <Link
          href={`/dashboard/${roomslug}`}
          className='btn btn-primary btn-xs'
        >
          Back
        </Link>
        <div className=''>
          <AddItemModal roomslug={roomslug} />
        </div>
      </div>
      <section>
        <h1 className='text-3xl font-semibold ml-1'>
          {room?.name.toUpperCase()} ITEMS
        </h1>
      </section>
      <section className='my-4  h-[60vh] overflow-y-scroll'>
        {items.length === 0 ? (
          <>No items found. Add one</>
        ) : (
          <div className='grid grid-cols-4 gap-4'>
            {items.map((item) => {
              return <Card key={item.id} item={item} room={room as Room} />;
            })}
          </div>
        )}
      </section>
    </main>
  );
}
