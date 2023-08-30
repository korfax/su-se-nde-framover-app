import authprovider from '@/app/providers/AuthProvider';

export async function GET() {
	return new Response(await authprovider.getLoginUrl());
}
