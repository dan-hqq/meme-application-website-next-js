import type { NextApiRequest, NextApiResponse } from 'next'
import cloudinary from '@/lib/cloudinary';
import multer from 'multer';
// import { po } from '@vercel/postgres';
import pool from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth';
import { NextResponse, NextRequest } from 'next/server';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export async function POST(req: NextRequest, res: NextResponse) {

    // const { memeName, description } = req.body;
    const formData = await req.formData();
    const memeName = formData.get("memeName") as string;
    const description = formData.get("description") as string;
    const memeImageTemp = formData.get("memeImage") as File;
    const memeExampleTemp = formData.get("memeExample") as File;
    const memeImageBuffer = Buffer.from(await memeImageTemp.arrayBuffer());
    const memeExampleBuffer = Buffer.from(await memeExampleTemp.arrayBuffer());
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
            const memeImageUrl = await uploadToCloudinary(memeImageBuffer);
            const memeExampleUrl = await uploadToCloudinary(memeExampleBuffer);
            const createResult = await pool.query(`INSERT INTO wikimemes (memename, description, memeimage, memeexample) VALUES ('${memeName}', '${description}', '${memeImageUrl}', '${memeExampleUrl}') RETURNING id`);
            const memeId = createResult.rows[0].id;
            return NextResponse.json({status: 200, success: true, message: 'Product Added Succesfully', redirectTo: `/wiki-meme/${memeId}` });
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