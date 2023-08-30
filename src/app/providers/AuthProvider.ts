import * as msal from '@azure/msal-node';
import authConfig from './AuthConfig';

/**
 * Wrapper klasse for å håndtere autentisering
 */
class Authprovider {
	#msalInstanse: msal.ConfidentialClientApplication;

	constructor(authConfig: msal.Configuration) {
		this.#msalInstanse = new msal.ConfidentialClientApplication(authConfig);
	}

	/**
	 * Genererer en lenke som brukeren kan navigere til for å logge inn gjennom microsoft
	 * @param req request info
	 * @returns lenke som kan brukes for å logge brukeren inn
	 */
	async getLoginUrl(
		req: msal.AuthorizationUrlRequest = {
			scopes: ['User.Read'],
			redirectUri: 'http://localhost:3000/api/auth/login/callback',
		}
	) {
		return await this.#msalInstanse
			.getAuthCodeUrl(req)
			.then((code) => code)
			.catch((err) => {
				throw new Error(`Feil ved henting av auth-code. Original feil ${err}`);
			});
	}

	/**
	 * Etter at utloggingen har skjedd OK, blir brukeren navigert til route der {@link logOut} blir kallt, for u fullføre utloggingen helt
	 * @returns lenke som kan brukes for å logge brukeren ut
	 */
	getLogoutUrl(): string {
		return `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost:3000/api/auth/logout/callback`;
	}

	/**
	 * Etter gjennomført {@link getLoginUrl}, vil det finnes en code som url-param. Denne koden kan brukes for å hente token
	 * @param code Kode som microsoft sendte tilbake etter innlogging. se {@link getLoginUrl}
	 * @param req request info
	 * @returns innloggings-token fra microsoft
	 */
	async getTokenByAuthCode(
		code: string,
		req: msal.AuthorizationCodeRequest = {
			code: code,
			scopes: ['User.Read'],
			redirectUri: 'http://localhost:3000/api/auth/login/callback',
		}
	) {
		return await this.#msalInstanse
			.acquireTokenByCode(req)
			.then((token) => token)
			.catch((err) => {
				throw new Error(`Feil ved henting av token. Original feil ${err}`);
			});
	}

	/**
	 * @param token tokenet som ble generert i {@link getTokenByAuthCode}
	 * @returns en uuid som referer til det lagrede tokenet i redis
	 */
	//TODO - uuid
	async lagreToken(token: msal.AuthenticationResult): Promise<string> {
		throw new Error('not yet implemented');
	}

	async isLoggedIn(): Promise<boolean> {
		//TODO - burde sjekke på homeAccountId som er lagret i tokenet
		const res = await this.#msalInstanse.getTokenCache().getAllAccounts();
		return res.length > 0;
	}

	/**
	 * Fjerner all referanser til brukeren i appen
	 *
	 * Det er en liten raritet, der brukeren noen ganger ikke finnes i cachen når dem er logget ut i azure.
	 * Mens andre ganger finnes den :shrug: Wrapper derfor bare i en try/catch og gjør en best effort
	 */
	async logOut(accId: string) {
		//TODO - ta inn home account id for å hente account
		console.log('accId: ', accId);

		try {
			await this.#msalInstanse.getTokenCache().removeAccount({
				homeAccountId: 'd608639f-50f2-47e9-8de3-e60c1329393f.b990393c-028e-47d6-8d3b-e6a106b1d477',
				environment: 'login.windows.net',
				tenantId: 'b990393c-028e-47d6-8d3b-e6a106b1d477',
				username: 'testy.McTesty@raqtechsolutions.onmicrosoft.com',
				localAccountId: 'd608639f-50f2-47e9-8de3-e60c1329393f',
			});
		} catch (error) {
			console.log('Brukerens account finnes ikke i token cachen');
		}
	}
}

const authprovider = new Authprovider(authConfig);

export default authprovider;
