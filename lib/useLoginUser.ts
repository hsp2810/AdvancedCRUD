import { useSession } from "next-auth/react";

export const useLoginUser = async () => {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") return null;

  return session;
};
