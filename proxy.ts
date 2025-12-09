import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const MAIL_HOST = process.env.MAIL_HOST!
const MAIL_REDIRECT_URL = process.env.MAIL_REDIRECT_URL!

export async function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const path = request.nextUrl.pathname

  // 1. Production redirect
  if (MAIL_HOST && MAIL_REDIRECT_URL && host === MAIL_HOST) {
    return NextResponse.redirect(MAIL_REDIRECT_URL, 308)
  }

  // 2. Local development test redirect
  if (host.startsWith('localhost') && path === '/mail') {
    return NextResponse.redirect(MAIL_REDIRECT_URL, 308)
  }

  // 3. Protected dashboard routes
  if (path.startsWith('/dashboard')) {
    return updateSession(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
