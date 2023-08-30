'use client';
import { useRouter } from 'next/navigation';

export default function SignIn() {
	const router = useRouter();
	const getLoginUrl = async () => {
		return await fetch('api/auth/login').then((res) => res.text());
	};

	return (
		<button type="button" onClick={async () => router.push(await getLoginUrl())}>
			Sign in
		</button>
	);
}
