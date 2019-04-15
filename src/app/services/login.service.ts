import { Injectable } from '@angular/core';
import {MsalService} from '@azure/msal-angular';
import {OfficeOAuthSettings} from '../utils/utils';
import { Client } from '@microsoft/microsoft-graph-client';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(private msal: MsalService) { }

	studentSignIn() {
		return this.msal.loginPopup(OfficeOAuthSettings.scopes)
			.then(() => {
				const graphClient = Client.init({
					authProvider: (done) => this.getAccessToken().then(result => done(null, result), error => done(error, null))
				});
				return graphClient.api('/me').get();
			}).then(student => {
				return student;
			})
			.catch(console.error);
	}

	getAccessToken() {
		return this.msal.acquireTokenSilent(OfficeOAuthSettings.scopes);
	}

}
