"use client"

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { MemeCard } from '@/components/memecard';
import { Pagination } from '@/components/pagination';

interface Meme {
    id: string;
    memename: string;
    memeimage: string;
    description: string;
}
  

export default function Home () {
    const [memes, setMemes] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchMemes = async () => {
        setIsLoading(true);
        const response = await fetch(`/api/list-wiki-meme?page=${currentPage}&search=${searchQuery}`);
        const data = await response.json();
        setMemes(data.data);
        setTotalPages(data.totalPages);
        setIsLoading(false);
      };

      const debounceFetch = setTimeout(fetchMemes, 300); // Debounce search

      return () => clearTimeout(debounceFetch);
    }, [searchQuery, currentPage]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1); // Reset to page 1 on search
    };

    return (
      <>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="flex-col justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-center">Wiki Memes</h1>
            <br/>
            <input
              type="text"
              placeholder="Search memes..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-gray-800 border border-gray-700 text-gray-300 rounded px-4 py-2"
            />
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
              {memes?.map((meme) => (
                <MemeCard key={meme.id} meme={meme as Meme} />
              ))}
            </div>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </main>
      </>
    );
};