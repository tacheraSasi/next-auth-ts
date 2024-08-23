import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"


export async function POST(request:Request){
    const {name, email, password, src} = await request.json()

    if(!name || !email || !password){
        return NextResponse.json({error:"all input fields are required"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

}