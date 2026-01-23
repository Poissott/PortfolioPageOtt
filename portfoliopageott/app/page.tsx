import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-start bg-zinc-50 font-sans dark:bg-black pl-16">
      <p className="text-9xl text-zinc-800 dark:text-zinc-200 animate-slide-in-text">
        Hello, World!
      </p>
    </div>
  );
}
