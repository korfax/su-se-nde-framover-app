import authprovider from '@/app/providers/AuthProvider';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
	const cookieStore = cookies();
	if (cookieStore.has('su-fram-app-acc-id')) {
		const accId = cookieStore.get('su-fram-app-acc-id')!.value;
		const isLoggedIn = await authprovider.isLoggedIn(accId);

		if (isLoggedIn) {
			const res = await authprovider.getAccountInfo(accId);
			if (res === null) {
				return NextResponse.json(null);
			}
			return NextResponse.json(res);
		}
	}
	return NextResponse.json(null);
}
