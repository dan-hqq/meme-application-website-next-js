import type { NextApiRequest, NextApiResponse } from 'next'
import cloudinary from '@/lib/cloudinary';
import multer from 'multer';
import pool from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth';
import { NextResponse, NextRequest } from 'next/server';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export async function POST(req: NextRequest, res: NextResponse) {

    const formData = await req.formData();
    const caption = formData.get("caption") as string;
    const imageMemeTemp = formData.get("imageMeme") as File;
    const imageMemeBuffer = Buffer.from(await imageMemeTemp.arrayBuffer());
    // const buffer = Buffer.from(await image.arrayBuffer());


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

            const { rows } = await pool.query(`SELECT id FROM users WHERE email = '${session.user?.email}' AND username = '${session.user?.name}'`);

            const userId = rows[0].id;

            const imageMemeUrl = await uploadToCloudinary(imageMemeBuffer);
            const result = await pool.query(`INSERT INTO memes (userid, imagememe, caption) VALUES ('${userId}', '${imageMemeUrl}', '${caption}')`);
            return NextResponse.json({status: 200, success: true, message: 'Meme Added Succesfully'});
        }
    } 
    catch (error) {
        console.error(error);
        return NextResponse.json({status: 500, success: false, error: error});
    }
}