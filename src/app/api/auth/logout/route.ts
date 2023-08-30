import authprovider from '@/app/providers/AuthProvider';
import { cookies } from 'next/headers';

export async function DELETE() {
	if (cookies().has('su-fram-app-acc-id')) {
		await authprovider.logOut(cookies().get('su-fram-app-acc-id')!.value);
		cookies().delete('su-fram-app-acc-id');
	}
	return new Response(authprovider.getLogoutUrl());
}
