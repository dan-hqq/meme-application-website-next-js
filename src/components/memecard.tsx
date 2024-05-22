import Image from 'next/image';
import Link from 'next/link';

interface MemeCardProps {
  meme: {
    id: string;
    memename: string;
    memeimage: string;
    description: string;
  };
}

export const MemeCard = ({ meme }: MemeCardProps) => {
  return (
    <Link href={`/wiki-meme/${meme.id}`}>
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg" style={{position: "relative", zIndex: -2}}>
          <Image src={meme.memeimage} alt={meme.memename} width={500} height={500} className="w-full h-64 object-cover" style={{position: "relative", zIndex: -1}} priority/>
          <div className="p-4">
            <h3 className="text-white font-bold text-lg text-center">{meme.memename}</h3>
          </div>
        </div>
    </Link>
  );
};
