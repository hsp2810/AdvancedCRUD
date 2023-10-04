"use server";

import { useLoginUser } from "@/lib/useLoginUser";
import prisma from "@/prisma/setup";
import { revalidatePath } from "next/cache";
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

    const user = await useLoginUser();

    await prisma.item.create({
      data: {
        name: data.itemName,
        description: data.itemDescription,
        roomId: room.id,
        userId: user?.id as string,
        slug,
      },
    });

    revalidatePath(`dashboard/${data.roomslug}/${slug}`);
  } catch (error) {
    console.log(error);
  }
};

export const editItem = async (formData: FormData) => {
  try {
    const schema = z.object({
      itemId: z.string().min(1, "Item id is required").max(100),
      itemName: z.string().min(1, "Item name is required").max(100),
      itemDescription: z.string().min(1, "Description is required").max(100),
    });

    const data = schema.parse({
      itemId: formData.get("itemId"),
      itemName: formData.get("itemName"),
      itemDescription: formData.get("itemDescription"),
    });

    const item = await prisma.item.update({
      where: {
        id: data.itemId,
      },
      data: {
        name: data.itemName,
        description: data.itemDescription,
      },
    });

    const room = await prisma.room.findUnique({
      where: {
        id: item.roomId,
      },
    });

    revalidatePath(`dashboard/${room?.slug}/${item.slug}`);
  } catch (error) {
    console.log(error);
  }
};

export const removeItem = async (formData: FormData) => {
  try {
    const id = formData.get("itemId");
    const item = await prisma.item.delete({
      where: {
        id: id as string,
      },
    });

    const room = await prisma.room.findUnique({
      where: {
        id: item.roomId,
      },
    });
    revalidatePath(`dashboard/${room?.slug}/${item.slug}`);
  } catch (error) {
    console.log(error);
  }
};
