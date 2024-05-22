"use client"

import { Navbar } from "@/components/navbar"
import Head from "next/head";
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddMeme() {
    
    const router = useRouter();

    const { data: session, status } = useSession();
    
    const [sendData, setSendData] = useState({
        imageMeme: null,
        caption: '',
    });
    
    if (status === "unauthenticated") {
        router.push("/signin");
        return null; // Add return to avoid rendering the form while redirecting
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;

        if (e.target instanceof HTMLInputElement && e.target.files) {
            setSendData({
                ...sendData,
                [name]: e.target.files[0],
            });
        } else {
            setSendData({
                ...sendData,
                [name]: value,
            });
        }
    };
    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // console.log(formData);
        const isFormValid = Object.values(sendData).every((value) => {
            return value !== null && value !== undefined && value !== '';
        });

        if (!isFormValid) {
            Swal.fire('Error', 'Please Fill All Input', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('imageMeme', sendData.imageMeme ?? "");
        formData.append('caption', sendData.caption);
        try {
            const response = await fetch('/api/add-meme', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                Swal.fire('Success', 'Wiki meme added successfully', 'success');
                setSendData({
                    imageMeme: null,
                    caption: ""
                });
                router.push('/add-meme');
            }
            else {
                throw new Error('Failed to add product');
            }
        }
        catch (error) {
            Swal.fire('Error', 'Server Error', 'error');
        }
    };
    
    return (
        <>
            <Head>
                <title>Add Meme</title>
                <meta name="description" content="Upload a wiki meme" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100 dark:bg-gray-900">
                <h1 className="mt-10 mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">Add Meme</h1>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-md space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image Meme</label>
                        <input
                            type="file"
                            name="imageMeme"
                            accept="image/jpeg"
                            onChange={handleChange}
                            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-gray-700 file:text-indigo-700 dark:file:text-gray-300 hover:file:bg-indigo-100 dark:hover:file:bg-gray-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Caption</label>
                        <textarea
                            name="caption"
                            value={sendData.caption}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </main>
        </>
    );
}
