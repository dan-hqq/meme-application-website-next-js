"use client"

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { useEffect, useState } from "react";
import { RealMemeCard } from "@/components/realmemecard";
import { Pagination } from "@/components/pagination";

export default function Home() {

  const [memes, setMemes] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMemes = async () => {
      const response = await fetch(`/api/list-meme?page=${currentPage}`);
      const data = await response.json();
      setMemes(data.data);
      setTotalPages(data.totalPages / 8 + 1);
    };
    fetchMemes();
  }, [currentPage]);

  return (
    <>
    <Navbar />
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-1 gap-4 w-full max-w-screen-lg">
          {memes?.map((meme, index) => (
            <RealMemeCard key={index} meme={meme} />
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </main>
    </>
  );
}
