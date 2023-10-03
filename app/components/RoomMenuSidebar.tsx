import { Room } from "@prisma/client";
import RoomTabs from "../dashboard/RoomTabs";
import prisma from "@/prisma/setup";

const RoomMenuSidebar = async () => {
  const rooms: Room[] = await prisma.room.findMany();

  return (
    <nav className='menu bg-gray-2 p-2 rounded-md'>
      <section className='menu-section'>
        <RoomTabs rooms={rooms} />
      </section>
    </nav>
  );
};

export default RoomMenuSidebar;
