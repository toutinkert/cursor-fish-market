import { NextResponse } from 'next/server';

export function middleware(request) {
  // تمرير جميع الطلبات بدون أي تغيير
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
