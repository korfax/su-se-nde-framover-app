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

	async isLoggedIn(accId: string): Promise<boolean> {
		const res = await this.#msalInstanse.getTokenCache().getAccountByHomeId(accId);
		return res !== null;
	}

	/**
	 * Fjerner all referanser til brukeren i appen
	 *
	 * Det er en liten raritet, der brukeren noen ganger ikke finnes i cachen når dem er logget ut i azure.
	 * Mens andre ganger finnes den :shrug: Wrapper derfor bare i en try/catch og gjør en best effort
	 */
	async logOut(accId: string) {
		try {
			const res = await this.#msalInstanse.getTokenCache().getAccountByHomeId(accId);
			if (res === null) {
				return;
			}

			await this.#msalInstanse.getTokenCache().removeAccount(res);
		} catch (error) {
			console.log('Brukerens account finnes ikke i token cachen');
		}
	}

	async getAccountInfo(accId: string) {
		return await this.#msalInstanse.getTokenCache().getAccountByHomeId(accId);
	}
}

const authprovider = new Authprovider(authConfig);

export default authprovider;
