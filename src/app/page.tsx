import SignIn from '@/components/auth/SignIn';
import authprovider from './providers/AuthProvider';
import SignOut from '@/components/auth/SignOut';

export default async function Home() {
	const isLoggedIn = await authprovider.isLoggedIn();
	return (
		<div>
			<h2>Home</h2>
			{isLoggedIn ? <SignOut /> : <SignIn />}
		</div>
	);
}
