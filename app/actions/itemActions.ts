"use server";

import prisma from "@/prisma/setup";
import { z } from "zod";

export const createItem = async (formData: FormData) => {
  try {
    const schema = z.object({
      roomslug: z.string().min(1, "Room slug is required").max(100),
      itemName: z.string().min(1, "Item name is required").max(100),
      itemDescription: z.string().min(1, "Description is required").max(100),
    });

    const data = schema.parse({
      roomslug: formData.get("roomslug"),
      itemName: formData.get("itemName"),
      itemDescription: formData.get("itemDescription"),
    });

    const room = await prisma.room.findUnique({
      where: { slug: data.roomslug },
    });

    if (!room) return;

    const slug = data.itemName
      .split(" ")
      .map((item) => {
        return item.toLowerCase();
      })
      .join("-");

    await prisma.item.create({
      data: {
        name: data.itemName,
        description: data.itemDescription,
        roomId: room.id,
        slug,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
