'use client'
 
import { useParams, redirect, useRouter } from 'next/navigation'
import { useLayoutEffect, useState, useEffect } from 'react';
import Error from 'next/error';
import { Navbar } from '@/components/navbar';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

interface Meme {
    memename: string;
    memeimage: string;
    description: string;
    memeexample: string;
  }

export default function WikiMeme() {

    const router = useRouter();

    const {data: session, status } = useSession();

    const params = useParams<{ id: string }>()

    if(params.id === "") redirect('/list-wiki-meme');

    const [meme, setMeme] = useState<Meme | null>(null);

    useEffect(() => {
        const fetchMeme = async () => {
            try{
                const response = await fetch(`/api/wiki-meme/${params.id}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                })
                
                const responses = await response.json();

                if(responses.status === 200){
                    setMeme(responses.data);
                    console.log(responses.data);
                }
                else{
                    console.error("Error at fetching");
                }
            }
            catch(error){
                console.error(error);
            }
        }
        fetchMeme();
    }, [params.id]);

    const handleEdit = () => {
        router.push(`/edit-wiki-meme/${params.id}`);
    };

    const handleDelete = async () => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await fetch(`/api/delete-wiki-meme/${params.id}`, {
                method: 'DELETE'
              });
    
              const responseData = await response.json();
    
              if (responseData.status == 200) {
                Swal.fire('Deleted!', 'Your meme has been deleted.', 'success');
                router.push('/');
              } 
              else {
                Swal.fire('Error', 'Server Error', 'error');
              }
            } 
            catch (error) {
              Swal.fire('Error', 'Server Error', 'error');
            }
          }
        })
      };

    if(meme === null){
        return <Error statusCode={404} />;
    } 
        

    return (
        <>
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="container mx-auto py-8 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                            {meme.memename}
                        </h1>
                        <div className="relative w-full mb-8">
                            <Image
                                src={meme.memeimage}
                                alt={meme.memename}
                                layout="responsive"
                                width={800}
                                height={0}
                                className="rounded-lg"
                            />
                        </div>
                        <hr className="border-b-2 border-gray-300 dark:border-gray-700 mb-8" />
                        <p className="text-lg text-gray-800 dark:text-gray-300 mb-8">
                            {meme.description}
                        </p>
                        <hr className="border-b-2 border-gray-300 dark:border-gray-700 mb-8" />
                        <div className="relative w-full mb-8">
                            <Image
                                src={meme.memeexample}
                                alt="Example"
                                layout="responsive"
                                width={800}
                                height={0}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
                {
                    status === "authenticated" ? 
                    (
                        <div className="flex justify-center mt-8 space-x-4">
                            <button
                                onClick={handleEdit}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300"
                            >
                                Delete
                            </button>
                        </div>
                    )
                    :
                    (
                        <div></div>
                    )
                }
            </main>
        </>
    );
};
