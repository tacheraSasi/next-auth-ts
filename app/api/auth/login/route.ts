import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'your-secret-key'

export async function POST(request:Request){
    const {email, password} = await request.json()

    //check if the passwd and the email are not null
    if (!email || !password){
        return NextResponse.json({error:"email and password are required"}, {status:400})
    }

    //getting the usre from the database
    const user = await prisma.user.findUnique({where:{email}})
    let isPasswordCorrect = await bcrypt.compare(password,user.password)

    if(!user || !isPasswordCorrect){
        return NextResponse.json({error:"invalid credentials"},{status:401})
    }

    const token = jwt.sign({ id: user.unique_id }, SECRET_KEY, { expiresIn: '1d' })
    
    return NextResponse.json({ token })
}