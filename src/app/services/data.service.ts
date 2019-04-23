import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {IStudent, ITeacher} from './login.service';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	constructor(private _http: HttpService) { }

	getCourseworks(teacherId?: string) {
		return this._http.get('/courseworks', {teacherId});
	}

	getAccount() {
		return this._http.get('/me');
	}

	getCoursework(id: string) {
		return this._http.get('/coursework', {id});
	}

	getEnrollments() {
		return this._http.get('/myEnrollments');
	}

	enroll(data) {
		return this._http.post('/enroll', data);
	}

	cancelEnrollment(courseworkID: string) {
		return this._http.post('/cancelEnrollmentRequest', {coursework: courseworkID});
	}

	acceptRequest(studentId: string, courseworkId: string) {
		return this._http.post('/accept', {studentId, courseworkId});
	}

	rejectRequest(studentId: string, courseworkId: string) {
		return this._http.post('/reject', {studentId, courseworkId});
	}

	updateCoursework(data) {
		return this._http.post('/updateCoursework', data);
	}

	deleteCoursework(courseworkId) {
		return this._http.post('/deleteCoursework', {courseworkId});
	}

	createCoursework(data) {
		return this._http.post('/createCoursework', data);
	}

	updateProfile(profile: ITeacher | IStudent) {
		return this._http.post('/updateProfile', profile);
	}

	getTeachers() {
		return this._http.get('/teachers');
	}

	getTeacher(id: string) {
		return this._http.get('/teacher', {id});
	}

	addTeacher(data) {
		return this._http.post('/addTeacher', data);
	}

	updateTeacher(data) {
		return this._http.post('/updateTeacher', data);
	}

	deleteTeacher(teacherId: string) {
		return this._http.post('/deleteTeacher', {teacherId});
	}
}
