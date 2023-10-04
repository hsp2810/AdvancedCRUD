import { createRoom } from "@/app/actions/roomActions";

const AddRoomModal = () => {
  return (
    <main>
      <label className='btn btn-solid-secondary' htmlFor='modal-addRoom'>
        Add a room
      </label>
      <input className='modal-state' id='modal-addRoom' type='checkbox' />
      <div className='modal'>
        <label className='modal-overlay' htmlFor='modal-addRoom'></label>
        <div className='modal-content flex flex-col gap-5 py-[2.5rem] w-[23rem]'>
          <label
            htmlFor='modal-addRoom'
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
          >
            ✕
          </label>

          <h1 className='font-semibold text-xl ml-1 underline uppercase'>
            Add a new room
          </h1>

          <form action={createRoom} className='flex flex-col gap-5'>
            <input
              className='input'
              placeholder='Set a name for the room'
              name='roomName'
            />
            <textarea
              className='textarea'
              placeholder='Set the description for the room'
              name='roomDescription'
            />
            <div className='flex gap-3'>
              <button className='btn btn-solid-success btn-sm'>Create</button>

              <label htmlFor='modal-addRoom' className='btn btn-solid btn-sm'>
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddRoomModal;
