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
    const memeExampleTemp = formData.get("memeExample") as File;
    const memeExampleBuffer = Buffer.from(await memeExampleTemp.arrayBuffer());

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
            const memeExampleUrl = await uploadToCloudinary(memeExampleBuffer);
            const result = await pool.query(`UPDATE wikimemes SET memeexample = '${memeExampleUrl}' WHERE id = ${id}`);
            console.log(result);
            return NextResponse.json({status: 200, success: true, message: 'Meme edited Succesfully'});
        }
    } 
    catch (error) {
        console.error(error);
        return NextResponse.json({status: 500, success: false, error: error});
    }
}

export const config = {
    api: {
      bodyParser: false,
    },
};