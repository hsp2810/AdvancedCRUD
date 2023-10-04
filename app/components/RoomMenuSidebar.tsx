import { Room } from "@prisma/client";
import RoomTabs from "../dashboard/RoomTabs";
import prisma from "@/prisma/setup";
import AddRoomModal from "../dashboard/[roomslug]/AddRoomModal";
import { useLoginUser } from "@/lib/useLoginUser";

const RoomMenuSidebar = async () => {
  const user = await useLoginUser();

  const rooms: Room[] = await prisma.room.findMany({
    where: {
      userId: user?.id,
    },
  });

  return (
    <nav className='menu bg-gray-2 p-2 rounded-md'>
      <section className='menu-section'>
        {rooms.length === 0 ? (
          <>
            <h1 className='text-center text-xl'>Create a new room</h1>
            <div className='w-fit mt-5 m-auto'>
              <AddRoomModal />
            </div>
          </>
        ) : (
          <RoomTabs rooms={rooms} />
        )}
      </section>
    </nav>
  );
};

export default RoomMenuSidebar;
