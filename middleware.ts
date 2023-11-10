import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	switch (request.nextUrl.pathname) {
		case '/upload-video':
			// If no auth token is found, redirect user to login page
			if (!request.cookies.get('token'))
				return NextResponse.redirect(new URL('/login', request.url));

		default:
			return;
	}
}
