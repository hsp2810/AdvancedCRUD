import { editItem } from "@/app/actions/itemActions";
import { Item, Room } from "@prisma/client";
import React from "react";

interface PageProps {
  item: Item;
}

const EditItemModal = ({ item }: PageProps) => {
  return (
    <main>
      <label
        className='btn btn-solid-warning btn-sm'
        htmlFor={`modal-${item.id}`}
      >
        Edit Item
      </label>
      <input className='modal-state' id={`modal-${item.id}`} type='checkbox' />
      <div className='modal'>
        <label className='modal-overlay' htmlFor={`modal-${item.id}`}></label>
        <div className='modal-content flex flex-col gap-5 py-[2.5rem] w-[23rem]'>
          <label
            htmlFor={`modal-${item.id}`}
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
          >
            ✕
          </label>

          <h1 className='font-semibold text-xl'>Edit Item</h1>

          <form action={editItem} className='flex flex-col gap-5'>
            <input className='hidden' defaultValue={item.id} name='itemId' />
            <input
              className='input'
              placeholder='Enter the new title for the item'
              defaultValue={item.name}
              name='itemName'
            />
            <textarea
              className='textarea'
              placeholder='Enter the new description for the item'
              defaultValue={item.description}
              name='itemDescription'
            />
            <div className='flex gap-3'>
              <button className='btn btn-solid-success btn-sm'>Save</button>

              <label
                htmlFor={`modal-${item.id}`}
                className='btn btn-solid btn-sm'
              >
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditItemModal;
