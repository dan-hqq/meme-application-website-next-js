'use client'

import { useState, useEffect } from 'react';
import Error from 'next/error';
import { Navbar } from '@/components/navbar';
import Image from 'next/image';
import { redirect, useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

interface Meme {
  memename: string;
  memeimage: string;
  description: string;
  memeexample: string;
}

export default function EditWikiMeme() {

  const router = useRouter();
  
  const {data: session, status } = useSession();

  if(status === "unauthenticated") redirect("/");

  const params = useParams<{ id: string }>()

  if(params.id === "") redirect('/list-wiki-meme');

  const [meme, setMeme] = useState<Meme | null>(null);
  const [updatedMeme, setUpdatedMeme] = useState<Meme | null>(null);
  const [nameDescChanged, setNameDescChanged] = useState(false);

  useEffect(() => {
    const fetchMeme = async () => {
      try {
        const response = await fetch(`/api/wiki-meme/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        })

        const responseData = await response.json();

        if (responseData.status === 200) {
          setMeme(responseData.data);
          setUpdatedMeme(responseData.data);
        } else {
          console.error("Error at fetching");
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchMeme();
  }, [params.id]);

  const handleFieldChange = (field: keyof Meme, value: string) => {
    if (updatedMeme) {
      setUpdatedMeme({
        ...updatedMeme,
        [field]: value
      });
      setNameDescChanged(true);
    }
  };

  const handleUpdate = async () => {
    try {

      const formData = new FormData();
      formData.append('memeName', updatedMeme!.memename);
      formData.append('description', updatedMeme!.description);

      const response = await fetch(`/api/edit-wiki-meme/text/${params.id}`, {
        method: 'PUT',
        body: formData
      });

      const responseData = await response.json();

      if (responseData.status == 200) {
        setNameDescChanged(false);
        Swal.fire('Success', 'Edit meme successfully', 'success');
        router.push(`/edit-wiki-meme/${params.id}`);
      } 
      else {
        Swal.fire('Error', 'Server Error', 'error');
      }
    } 
    catch (error) {
      Swal.fire('Error', 'Server Error', 'error');
    }
  };

  const handleMemeImageChange = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("memeImage", file);

      try {
        const response = await fetch(`/api/edit-wiki-meme/image-meme/${params.id}`, {
          method: 'PUT',
          body: formData,
        });

        const responseData = await response.json();
        if (responseData.status == 200) {
          Swal.fire('Success', 'Edit meme successfully', 'success');
          router.push(`/edit-wiki-meme/${params.id}`);
        } 
        else {
          Swal.fire('Error', 'Server Error', 'error');
        }
      } 
      catch (error) {
        Swal.fire('Error', 'Server Error', 'error');
      }
    }
  };

  const handleMemeExampleChange = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("memeExample", file);

      try {
        const response = await fetch(`/api/edit-wiki-meme/example-meme/${params.id}`, {
          method: 'PUT',
          body: formData,
        });

        const responseData = await response.json();
        if (responseData.status == 200) {
          Swal.fire('Success', 'Edit meme successfully', 'success');
          router.push(`/edit-wiki-meme/${params.id}`);
        } 
        else {
          Swal.fire('Error', 'Server Error', 'error');
        }
      } 
      catch (error) {
        Swal.fire('Error', 'Server Error', 'error');
      }
    }
  };

  if (meme === null) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Edit Wiki Meme
            </h1>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Edit Name and Description</h2>
              <div className="mb-4">
                <label htmlFor="memename" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  Meme Name
                </label>
                <input
                  type="text"
                  id="memename"
                  name="memename"
                  value={updatedMeme!.memename}
                  onChange={(e) => handleFieldChange('memename', e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={updatedMeme!.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                onClick={handleUpdate}
                disabled={!nameDescChanged}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 ${!nameDescChanged ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Update
              </button>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Edit Meme Image</h2>
              <div className="relative w-full mb-4">
                <Image
                  src={updatedMeme!.memeimage}
                  alt={updatedMeme!.memename}
                  layout="responsive"
                  width={800}
                  height={0}
                  className="rounded-lg"
                  style={{position: "relative", zIndex: -1}}
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleMemeImageChange(e, 'memeimage')}
                className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700"
              />
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Edit Meme Example</h2>
              <div className="relative w-full mb-4">
                <Image
                  src={updatedMeme!.memeexample}
                  alt="Example"
                  layout="responsive"
                  width={800}
                  height={0}
                  className="rounded-lg"
                  style={{position: "relative", zIndex: -1}}
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleMemeExampleChange(e, 'memeexample')}
                className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
