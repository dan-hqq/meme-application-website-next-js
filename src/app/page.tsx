"use client"

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { useEffect, useState } from "react";
import { RealMemeCard } from "@/components/realmemecard";

export default function Home() {

  const [memes, setMemes] = useState<any[]>([]);

  useEffect(() => {
    const fetchMemes = async () => {
      const response = await fetch(`/api/list-meme`,{
        method: "GET",
        cache: "no-store"
      });
      const data = await response.json();
      setMemes(data.data);
    };
    fetchMemes();
  }, []);

  return (
    <>
    <Navbar />
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-1 gap-4 w-full max-w-screen-lg">
          {memes.map((meme, index) => (
            <RealMemeCard key={index} meme={meme} />
          ))}
        </div>
    </main>
    </>
  );
}
