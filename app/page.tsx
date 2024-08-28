import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>welcome</h1>
      <a href="/login">login</a>
      <a href="/register">register</a>
      <a href="/profile">profile</a>
    </main>
  );
}
