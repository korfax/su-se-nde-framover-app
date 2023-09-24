'use client';

import SignOut from '@/components/auth/SignOut';
import { AccountInfo } from '@azure/msal-node';
import { useEffect, useState } from 'react';
import { useUserContext } from './providers/UserProvider';

export default function Home() {
	const { user, setUser } = useUserContext();

	useEffect(() => {
		(async () => {
			const res = await fetch('http://localhost:3000/api/auth/me');
			const resJson = await res.json();
			if (resJson === null) {
				return;
			} else {
				setUser(JSON.stringify(resJson));
			}
		})();
	}, [user]);

	return (
		<div>
			<h2>Home</h2>
		</div>
	);
}
