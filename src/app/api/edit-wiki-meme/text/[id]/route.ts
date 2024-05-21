// import { sql } from '@vercel/postgres';
import pool from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth';
import { NextResponse, NextRequest } from 'next/server';

export async function PUT(req: NextRequest, { params } : { params: { id: string } }, res: NextResponse) {

    const { id } = params;

    console.log(id);

    const formData = await req.formData();
    const memeName = formData.get("memeName") as string;
    const description = formData.get("description") as string;

    try {
        const session = await getServerSession(authConfig);
        
        if(session){
            const result = await pool.query(`UPDATE wikimemes SET memename = '${memeName}', description = '${description}' WHERE id = ${id}`);
            console.log(result);
            return NextResponse.json({status: 200, success: true, message: 'Meme edited Succesfully'});
        }
    } 
    catch (error) {
        console.error(error);
        return NextResponse.json({status: 500, success: false, error: error});
    }
}

// export const config = {
//     api: {
//       bodyParser: false,
//     },
// };