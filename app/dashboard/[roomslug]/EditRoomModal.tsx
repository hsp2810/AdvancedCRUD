import { editRoom } from "@/app/actions/roomActions";
import { Item, Room } from "@prisma/client";
import React from "react";

interface PageProps {
  room: Room;
}

const EditRoomModal = ({ room }: PageProps) => {
  return (
    <main>
      <label className='btn btn-solid-warning' htmlFor={`modal-${room.id}`}>
        Edit Room
      </label>
      <input className='modal-state' id={`modal-${room.id}`} type='checkbox' />
      <div className='modal'>
        <label className='modal-overlay' htmlFor={`modal-${room.id}`}></label>
        <div className='modal-content flex flex-col gap-5 py-[2.5rem] w-[23rem]'>
          <label
            htmlFor={`modal-${room.id}`}
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
          >
            ✕
          </label>

          <h1 className='font-semibold text-xl'>Edit Item</h1>

          <form action={editRoom} className='flex flex-col gap-5'>
            <input className='hidden' defaultValue={room.id} name='roomId' />
            <input
              className='input'
              placeholder='Enter the new title for the room'
              defaultValue={room.name}
              name='roomName'
            />
            <textarea
              className='textarea'
              placeholder='Enter the new description for the room'
              defaultValue={room.description}
              name='roomDescription'
            />
            <div className='flex gap-3'>
              <button className='btn btn-solid-success btn-sm'>Save</button>

              <label
                htmlFor={`modal-${room.id}`}
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

export default EditRoomModal;
