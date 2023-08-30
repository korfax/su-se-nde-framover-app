import * as msal from '@azure/msal-node';

const authConfig: msal.Configuration = {
	auth: {
		clientId: 'xxx',
		authority: `xxx`,
		clientSecret: 'xxx',
	},
};

export default authConfig;
