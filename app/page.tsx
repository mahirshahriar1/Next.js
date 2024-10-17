import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "./api/auth/authOptions";

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);
  
  return (
    <main>
      <h1>Hello {session?.user?.name ? <span>{session.user.name}</span> : "Guest"}</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
    </main>
  );
}
