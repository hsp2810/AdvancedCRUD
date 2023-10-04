import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/setup";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export const useLoginUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
  });

  return user;
};
