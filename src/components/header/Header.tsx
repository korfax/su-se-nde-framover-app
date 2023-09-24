'use client';

import React from 'react';
import SignIn from '../auth/SignIn';
import { useUserContext } from '@/app/providers/UserProvider';
import SignOut from '../auth/SignOut';

const Header = () => {
	const { user } = useUserContext();

	return (
		<div>
			<div>
				<span className="text-3xl font-bold underline">logo</span>
				<span>logo text</span>
			</div>
			{user === null ? <SignIn /> : <SignOut />}

			{user && <p>{user}</p>}
		</div>
	);
};

export default Header;
