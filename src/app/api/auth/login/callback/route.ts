import authprovider from '@/app/providers/AuthProvider';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const code = new URL(request.url).searchParams.get('code');

	if (!code) {
		throw new Error('Url inneholder ikke code param for å hente token');
	}

	const token = await authprovider.getTokenByAuthCode(code);

	//console.log(token);

	return NextResponse.redirect('http://localhost:3000/', {
		status: 302,
		headers: {
			'Set-cookie': `su-fram-app-acc-id=${
				token.account?.homeAccountId ?? 'random-id'
			};HttpOnly;path=/;SameSite=strict`,
		},
	});
}
