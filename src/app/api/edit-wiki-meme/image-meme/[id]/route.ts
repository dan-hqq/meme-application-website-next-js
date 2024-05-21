// import { sql } from '@vercel/postgres';
import pool from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth';
import { NextResponse, NextRequest } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export async function PUT(req: NextRequest, { params } : { params: { id: string } }, res: NextResponse) {

    const { id } = params;

    console.log(id);

    const formData = await req.formData();
    const memeImageTemp = formData.get("memeImage") as File;
    const memeImageBuffer = Buffer.from(await memeImageTemp.arrayBuffer());

    const uploadToCloudinary = (imageBuffer: Buffer) => {
        return new Promise<string>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (error: any, result: { secure_url: string | PromiseLike<string>; }) => {
                    if (error) {
                        console.error(error);
                        reject('Failed to upload image to Cloudinary');
                    } else {
                        resolve(result.secure_url);
                    }
                }
            ).end(imageBuffer);
        });
    };

    try {
        const session = await getServerSession(authConfig);
        
        if(session){
            const memeImageUrl = await uploadToCloudinary(memeImageBuffer);
            const result = await pool.query(`UPDATE wikimemes SET memeimage = '${memeImageUrl}' WHERE id = ${id}`);
            console.log(result);
            return NextResponse.json({status: 200, success: true, message: 'Meme edited Succesfully'});
        }
    } 
    catch (error) {
        console.error(error);
        return NextResponse.json({status: 500, success: false, error: error});
    }
}