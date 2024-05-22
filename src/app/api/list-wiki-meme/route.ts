// import { sql } from '@vercel/postgres';
import pool from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {

    const { searchParams } = req.nextUrl;
    const queryString = searchParams.get("search") ?? "";
    const page = searchParams.get("page") ?? 1;

    try {
        const result = await pool.query(`SELECT * FROM wikimemes WHERE memename ILIKE '%${queryString}%' ORDER BY memename OFFSET (${page} - 1) * 8 LIMIT 8;`);
        // console.log(result);
        const count = await pool.query(`SELECT COUNT(*) FROM wikimemes WHERE memename ILIKE '%${queryString}%'`);
        return NextResponse.json({status: 200, success: true, data: result.rows, totalPages: count.rowCount});
    } 
    catch (error) {
        console.error(error);
        return NextResponse.json({status: 500, success: false, error: error});
    }
}
