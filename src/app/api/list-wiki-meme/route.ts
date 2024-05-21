// import { sql } from '@vercel/postgres';
import pool from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {

    try {
        const result = await pool.query(`SELECT * FROM wikimemes`);
        console.log(result);
        return NextResponse.json({status: 200, success: true, data: result.rows});
    } 
    catch (error) {
        console.error(error);
        return NextResponse.json({status: 500, success: false, error: error});
    }
}
