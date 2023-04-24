import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to striga assignment</h1>
      <Link href="/auth/login">Go to /auth/login page</Link>
    </main>
  );
}
