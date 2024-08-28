import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'your-secret-key'

export function middleware(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')

  if (token) {
    try {
      jwt.verify(token, SECRET_KEY)
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  } else {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/profile/:path*'],
}
