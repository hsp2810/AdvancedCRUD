"use client";

import { Room } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";

const RoomTabs = ({ rooms }: { rooms: Room[] }) => {
  const [tabActive, setTabActive] = useState<number>(-1);

  return (
    <ul className='menu-items'>
      {rooms.map((room, index) => {
        return (
          <Tab
            key={room.id}
            currentTab={index}
            tabName={room.name}
            tabActive={tabActive}
            setTabActive={setTabActive}
            to={room.slug}
          />
        );
      })}
    </ul>
  );
};

interface TabProps {
  tabActive: number;
  currentTab: number;
  tabName: string;
  to: string;
  setTabActive: (tabActive: number) => void;
}

const Tab = ({
  tabActive,
  tabName,
  currentTab,
  setTabActive,
  to,
}: TabProps) => {
  return (
    <Link
      href={`/dashboard/${to}`}
      className={`menu-item ${tabActive === currentTab && `menu-active`}`}
      onClick={() => setTabActive(currentTab)}
    >
      {tabName}
    </Link>
  );
};

export default RoomTabs;
