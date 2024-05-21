import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth';
// import { sql } from '@vercel/postgres';
import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextApiRequest, { params } : { params: { id: string } }, res: NextResponse) {

    const { id } = params;

    console.log(id);

    const { rows } = await pool.query(`SELECT * FROM wikimemes WHERE id = ${id as string}`);

    // Jika pengguna ditemukan, kembalikan userId
    if (rows.length > 0) {
        return NextResponse.json({data: rows[0], status: 200});
    } 
    
    return NextResponse.json({message: "Not Found", status: 500});

}


// export default async function GET(req: NextApiRequest, res: NextApiResponse) {
//     const { id } = req.query;

//     if(req.method === "GET"){

//         const { rows } = await sql`SELECT * FROM wikimemes WHERE id = ${id as string}`;

//         // Jika pengguna ditemukan, kembalikan userId
//         if (rows.length > 0) {
//             res.status(200).send(rows[0]);
//         } 
        
//         res.status(404).send({message: "Not Found"});
//     }

// }