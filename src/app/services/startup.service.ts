import { Injectable } from '@angular/core';
import {Location} from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class StartupService {

	constructor(private _location: Location) { }

	start(): Promise<any> {
		console.log('startup runs');
		this.navigateToDesiredScreen();
		return Promise.resolve();
	}

	private navigateToDesiredScreen() {
		if (this._location.path()) { return; }
		setTimeout(() => {
			const token = localStorage.getItem('access_token');
			const role = localStorage.getItem('role');

			if (role && token) {
				this._location.go(`/${role.toLowerCase()}`);
			} else {
				localStorage.removeItem('access_token');
				localStorage.removeItem('role');
				this._location.go('/login');
			}
		}, 0);
	}
}
