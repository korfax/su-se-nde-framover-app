import Signin from '@/components/auth/SignIn';
import { SessionProvider } from 'next-auth/react';
import { authOptions } from './api/auth/AuthConfig';

export default async function Home() {
	return (
		<>
			<h1>Home</h1>
			<Signin />
		</>
	);
}
