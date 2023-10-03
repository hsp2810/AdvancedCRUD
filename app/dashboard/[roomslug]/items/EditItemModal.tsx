import React from "react";

const EditItemModal = () => {
  return (
    <main>
      <label className='btn btn-solid-warning btn-sm' htmlFor='modal-1'>
        Edit Item
      </label>
      <input className='modal-state' id='modal-1' type='checkbox' />
      <div className='modal'>
        <label className='modal-overlay' htmlFor='modal-1'></label>
        <div className='modal-content flex flex-col gap-5 py-[2.5rem] w-[23rem]'>
          <label
            htmlFor='modal-1'
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
          >
            ✕
          </label>

          <h1 className='font-semibold text-xl'>Edit Item</h1>

          <input
            className='input'
            placeholder='Enter the new title for the item'
          />
          <textarea
            className='textarea'
            placeholder='Enter the new description for the item'
          />
          <div className='flex gap-3'>
            <button className='btn btn-solid-success btn-sm'>Save</button>

            <label htmlFor='modal-1' className='btn btn-solid btn-sm'>
              Cancel
            </label>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditItemModal;
