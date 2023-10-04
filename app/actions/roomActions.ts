"use server";

import { useLoginUser } from "@/lib/useLoginUser";
import prisma from "@/prisma/setup";
import { Room } from "@prisma/client";
import { revalidatePath } from "next/cache";
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

    const user = await useLoginUser();
    console.log(user);

    await prisma.room.create({
      data: {
        name: data.roomName,
        description: data.roomDescription,
        slug: slug,
        userId: user?.id as string,
      },
    });

    revalidatePath(`/dashboard`);
    revalidatePath(`/dashboard/${slug}`);
  } catch (error) {
    console.log(error);
  }
};

export const editRoom = async (formData: FormData) => {
  const schema = z.object({
    roomId: z.string().nonempty(),
    roomName: z.string().nonempty(),
    roomDescription: z.string().nonempty(),
  });

  const data = schema.parse({
    roomId: formData.get("roomId"),
    roomName: formData.get("roomName"),
    roomDescription: formData.get("roomDescription"),
  });

  try {
    const room = await prisma.room.update({
      where: {
        id: data.roomId,
      },
      data: {
        name: data.roomName,
        description: data.roomDescription,
      },
    });

    revalidatePath(`/dashboard/${room.slug}`);
  } catch (error) {
    console.log(error);
  }
};

export const removeRoom = async (formData: FormData) => {
  const id: string = formData.get("roomId") as string;

  try {
    const room = await prisma.room.findUnique({
      where: { id },
    });

    if (!room) return null;

    // Delete all the items in the room
    await prisma.item.deleteMany({
      where: { roomId: room.id },
    });

    // Delete the room
    await prisma.room.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/dashboard/${room.slug}`);
  } catch (error) {
    console.log(error);
  }
};
