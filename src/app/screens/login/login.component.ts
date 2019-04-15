import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {LoginService} from '../../services/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	role: string;
	email: string;
	password: string;

	constructor(private login: LoginService, private http: HttpService) {

	}

	ngOnInit() {
	}

	studentSignIn() {
		this.login.studentSignIn().then(student => {
			return this.http.post('/signup/student', student);
		}).then(console.log);
	}

}
