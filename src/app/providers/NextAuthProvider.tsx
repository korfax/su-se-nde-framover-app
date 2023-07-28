'use client';

import { SessionProvider } from 'next-auth/react';

export const NextAuthProvider = (props: { children?: React.ReactNode }) => {
	return <SessionProvider>{props.children}</SessionProvider>;
};
