'use client';
import SignIn from '@/components/auth/SignIn';
import SignOut from '@/components/auth/SignOut';
import { AccountInfo } from '@azure/msal-node';
import { useEffect, useState } from 'react';

export default function Home() {
	const [userState, setUserState] = useState<AccountInfo | null>(null);

	useEffect(() => {
		(async () => {
			const res = await fetch('http://localhost:3000/api/auth/me');
			setUserState(await res.json());
		})();
	}, []);

	return (
		<div>
			<h2>Home</h2>
			{userState === null ? <SignIn /> : <SignOut />}
		</div>
	);
}
