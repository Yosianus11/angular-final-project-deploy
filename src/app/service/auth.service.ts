import { Injectable } from '@angular/core';
import { User } from '../models/user'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = "https://payment-a.herokuapp.com";
  headers = new HttpHeaders().set('Content-Type','application/json');


  constructor(private http: HttpClient, private router: Router) { }

  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/api/AuthManagement/Register`;
    return this.http
      .post(api, user)
      .pipe(catchError(this.handleError))
  }

  signin(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/api/AuthManagement/Login`, user)
      .pipe(catchError(this.handleError))
  }
 
  getToken() {
    return localStorage.getItem('access_token');
  }

  handleError(error: HttpErrorResponse) {
    let errors: any = [];
    console.log(error.error)

    if (error.error.errors) {
      errors = error.error.errors
    } else {
      errors = `Erorr Code ${errors.status}\nMessage: ${error.message}`
    }
    return throwError(errors)
  }

  getAuthorizationToken(){
    return localStorage.getItem('access_token')
  }

  getRefreshToken(){
    return localStorage.getItem('refresh_token')
  }
  refreshToken() { 
    const token = this.getAuthorizationToken(); 
    const refreshToken = this.getRefreshToken(); 
    console.log("refresh :"+refreshToken)
    console.log("Token:" + token)
    return this.http
    .post(`${this.endpoint}/api/AuthManagement/RefreshToken`,
     { token, refreshToken }) 
    .pipe(catchError(this.handleError)); 
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false
  }

}