import React, { ReactNode } from "react";
import RoomMenuNav from "../components/RoomMenuSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className='flex my-10 mx-4 items-center'>
      <section className='flex-[15]'>
        <RoomMenuNav />
      </section>
      {children}
    </main>
  );
}
