import NextAuth, { AuthOptions } from 'next-auth';
import AzureProvider from 'next-auth/providers/azure-ad';

export const authOptions: AuthOptions = {
	providers: [
		AzureProvider({
			clientId: process.env.AZURE_AD_CLIENT_ID!,
			clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
			tenantId: process.env.AZURE_AD_TENANT_ID!
		})
	]
};

export default NextAuth(authOptions);
