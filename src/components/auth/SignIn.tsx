'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Component() {
	const { data } = useSession();
	if (data?.user) {
		return (
			<>
				Signed in as {data.user.name} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn('azure-ad')}>Sign in</button>
		</>
	);
}
