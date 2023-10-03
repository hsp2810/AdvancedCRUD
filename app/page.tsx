import Link from "next/link";

export default function Home() {
  return (
    <main>
      Logged in. <Link href={"/dashboard"}>Go to Dashboard</Link>
    </main>
  );
}
