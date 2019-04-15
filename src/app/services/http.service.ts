import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(private http: HttpClient) { }

	private static getHeaders(headers: any = {}) {
		headers['Content-Type'] = 'application/json';
		return new HttpHeaders(Object.assign({}, headers));
	}

	post(url, body?, headers?) {
		if (!url.includes('http://') && !url.includes('https://')) {
			url = 'http://localhost:3000/api' + url;
		}
		return this.request('post', url, headers, body);
	}

	private request(method, url, headers, body) {
		return this.http.request(method, url, {
			body: body ? JSON.stringify(body) : null,
			headers: HttpService.getHeaders(headers)
		})
			.toPromise();
	}


}
