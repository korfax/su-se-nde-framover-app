'use client';
import { createContext, useContext, useState } from 'react';

const UserContext = createContext<{
	user: string | null;
	setUser: (str: string) => void;
	removeUser: () => void;
}>({
	user: null,
	setUser: (str: string) => {},
	removeUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<string | null>(null);

	return (
		<UserContext.Provider
			value={{ user, setUser: (str) => setUser(str), removeUser: () => setUser(null) }}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
