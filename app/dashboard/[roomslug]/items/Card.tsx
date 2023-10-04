import React from "react";
import EditItemModal from "./EditItemModal";
import { Item, Room } from "@prisma/client";
import prisma from "@/prisma/setup";
import { revalidateTag } from "next/cache";
import { removeItem } from "@/app/actions/itemActions";

interface PageProps {
  item: Item;
  room: Room;
}

export default function Card({ item, room }: PageProps) {
  return (
    <main>
      <div className='card w-[18rem]'>
        <div className='card-body p-4'>
          <h2 className='card-header text-2xl text-green-11'>{item.name}</h2>
          <p className='text-content2 text-sm'>{item.description}.</p>
          <div className='card-footer flex justify-start'>
            {/* <button className='btn btn-solid-warning btn-sm'>Edit Item</button> */}
            <EditItemModal item={item} />

            <form action={removeItem}>
              <input type='hidden' name='itemId' value={item.id} />
              <button className='btn btn-solid-error ml-2 btn-sm'>
                Remove Item
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
