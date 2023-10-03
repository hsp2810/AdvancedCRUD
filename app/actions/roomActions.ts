"use server";

import { useLoginUser } from "@/lib/useLoginUser";
import prisma from "@/prisma/setup";
import { z } from "zod";

export const createRoom = async (formData: FormData) => {
  const schema = z.object({
    roomName: z.string().nonempty(),
    roomDescription: z.string().nonempty(),
  });

  const data = schema.parse({
    roomName: formData.get("roomName"),
    roomDescription: formData.get("roomDescription"),
  });

  try {
    const slug = data.roomName
      .split(" ")
      .map((room) => {
        return room.toLowerCase();
      })
      .join("-");

    const session = await useLoginUser();
    console.log(session?.user?.email);

    // await prisma.room.create({
    //   data: {
    //     name: data.roomName,
    //     description: data.roomDescription,
    //     slug: slug,
    //     // userId: ,
    //   },
    // });
  } catch (error) {
    console.log(error);
  }
};
