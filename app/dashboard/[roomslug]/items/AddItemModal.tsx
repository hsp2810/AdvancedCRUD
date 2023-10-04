import { createItem } from "@/app/actions/itemActions";

const AddItemModal = ({ roomslug }: { roomslug: string }) => {
  return (
    <main>
      <label className='btn btn-solid-secondary' htmlFor='modal-addItem'>
        Add Item
      </label>
      <input className='modal-state' id='modal-addItem' type='checkbox' />
      <div className='modal'>
        <label className='modal-overlay' htmlFor='modal-addItem'></label>
        <div className='modal-content flex flex-col gap-5 py-[2.5rem] w-[23rem]'>
          <label
            htmlFor='modal-addItem'
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
          >
            ✕
          </label>

          <h1 className='font-semibold text-xl ml-1 underline uppercase'>
            Add an item to the room
          </h1>

          <form action={createItem} className='flex flex-col gap-5'>
            <input
              className='input'
              type='hidden'
              name='roomslug'
              value={roomslug}
            />
            <input
              className='input'
              type='text'
              placeholder='Set a name for the item'
              name='itemName'
            />
            <textarea
              className='textarea'
              placeholder='Set the description for the item'
              name='itemDescription'
            />
            <div className='flex gap-3'>
              <button className='btn btn-solid-success btn-sm'>
                Create Item
              </button>

              <label htmlFor='modal-addItem' className='btn btn-solid btn-sm'>
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddItemModal;
