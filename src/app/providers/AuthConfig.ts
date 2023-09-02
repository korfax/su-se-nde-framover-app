import * as msal from '@azure/msal-node';

const authConfig: msal.Configuration = {
	auth: {
		clientId: process.env.AZURE_AD_CLIENT_ID!,
		authority: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}`,
		clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
	},
};

export default authConfig;
