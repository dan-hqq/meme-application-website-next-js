import pool from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {

    const { searchParams } = req.nextUrl;
    const page = searchParams.get("page") ?? 1;

    try {
        const result = await pool.query(`
            SELECT users.username, users.image, memes.imagememe, memes.caption
            FROM memes
            JOIN users ON memes.userid = users.id
            ORDER BY memes.id DESC
            OFFSET (${page} - 1) * 8 LIMIT 8
        `);

        const count = await pool.query(`SELECT COUNT(*) FROM memes`);
        return NextResponse.json({status: 200, success: true, data: result.rows, totalPages: count.rows[0].count} , {
            headers: {
              'Cache-Control': 'no-store, max-age=0',
            }
        });
    } 
    catch (error) {
        console.error(error);
        return NextResponse.json({status: 500, success: false, error: error});
    }
}
