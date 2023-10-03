import React from "react";
import EditItemModal from "./EditItemModal";

export default function Card() {
  return (
    <main>
      <div className='card w-[18rem]'>
        <div className='card-body p-4'>
          <h2 className='card-header text-2xl text-green-11'>Refrigerator</h2>
          <p className='text-content2 text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            ipsum nesciunt dolorem quia aliquam ad consequatur corporis ullam
            aspernatur illum.
          </p>
          <div className='card-footer flex justify-start'>
            {/* <button className='btn btn-solid-warning btn-sm'>Edit Item</button> */}
            <EditItemModal />
            <button className='btn btn-solid-error ml-2 btn-sm'>
              Remove Item
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
