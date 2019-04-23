import { Injectable } from '@angular/core';
import {MsalService} from '@azure/msal-angular';
import {OfficeOAuthSettings} from '../utils/utils';
import { Client } from '@microsoft/microsoft-graph-client';
import {HttpService} from './http.service';
import {Router} from '@angular/router';

export interface ITeacher {
	email: string;
	name: string;
	surname: string;
	facultyCode?: string;
	departmentCode?: string;
	role: 'Teacher' | 'Supervisor' | 'Student';
	load?: number;
}

export interface IStudent {
	id: string;
	email: string;
	name: string;
	surname: string;
	facultyCode?: string;
	degreeProgramCode?: string;
	year?: number;
	role: 'Teacher' | 'Supervisor' | 'Student';
}

export interface ISupervisor {
	email: string;
	name: string;
	surname: string;
	facultyCode?: string;
	departmentCode?: string;
	role: 'Teacher' | 'Supervisor' | 'Student';
}

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(private _msal: MsalService, private _http: HttpService, private _router: Router) {}

	studentSignIn(): Promise<any> {
		return this._msal.loginPopup(OfficeOAuthSettings.scopes)
			.then(() => {
				const authProvider = this.getOfficeAccessToken.bind(this);
				const graphClient = Client.init({authProvider});
				return graphClient.api('/me').get();
			}, console.error)
			.then(student => {
				return student;
			})
			.catch(e => {
				console.error(e);
			});
	}

	getOfficeAccessToken(done) {
		return this._msal.acquireTokenSilent(OfficeOAuthSettings.scopes)
			.then(result => done(null, result), error => {
				console.error('Error while getting Office365v token', error);
				return done(error, null);
			});
	}

	register(user: ITeacher | ISupervisor | IStudent) {
		return this._http.post('/register', user)
			.then(({token}) => {
				localStorage.setItem('access_token', token);
				localStorage.setItem('role', user.role);
			})
			.catch(console.error);
	}

	login(role: 'Teacher' | 'Supervisor' | 'Student', email: string, password: string) {
		return this._http.post('/login', {role, email, password})
			.then(({token}) => {
				localStorage.setItem('access_token', token);
				localStorage.setItem('role', role);
			});
	}

	logout() {
		localStorage.removeItem('access_token');
		localStorage.removeItem('role');
		return this._router.navigateByUrl('/login');
	}

}
