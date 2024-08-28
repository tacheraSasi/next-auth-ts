import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"


export async function POST(request:Request){
    const {name, email, password, src} = await request.json()

    if(!name || !email || !password){
        return NextResponse.json({error:"all input fields are required"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                src
            }
        })
        return NextResponse.json(user,{status:201})
    } catch (error) {
        return NextResponse.json({error:"user already exists"},{status:501})
    }

}