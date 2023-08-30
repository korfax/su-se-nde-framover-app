'use client';
import { useRouter } from 'next/navigation';

export default function SignOut() {
	const router = useRouter();
	const getLogoutUrl = async () => {
		return await fetch('/api/auth/logout', { method: 'DELETE' }).then((res) => res.text());
	};

	return (
		<button type="button" onClick={async () => router.push(await getLogoutUrl())}>
			Sign out
		</button>
	);
}
