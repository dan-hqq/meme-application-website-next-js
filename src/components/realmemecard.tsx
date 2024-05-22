"use client"

import Image from 'next/image';

interface MemeCardProps {
  meme: {
    username: string;
    image: string;
    imagememe: string;
    caption: string;
  };
}

export const RealMemeCard = ({ meme }: MemeCardProps) => {
  return (
    <div className="bg-transparent rounded-lg overflow-hidden shadow-lg p-4">
      <div className="flex items-center mb-4">
        <Image src={meme.image} alt={meme.username} width={40} height={40} className="rounded-full mr-4" priority/>
        <h3 className="text-white font-bold">{meme.username}</h3>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 pr-2 mb-4 md:mb-0">
          <Image src={meme.imagememe} alt={meme.caption} width={300} height={300} className="object-cover w-full" priority />
        </div>
        <div className="md:w-1/3 pl-2 flex flex-col justify-start">
          <p className="text-gray-300">{meme.caption}</p>
        </div>
      </div>
    </div>
  );
};
