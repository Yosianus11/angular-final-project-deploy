import { Injectable } from '@angular/core';
import { User } from '../models/user'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Payment } from '../models/payment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  endpoint: string = "https://payment-a.herokuapp.com";
  headers = new HttpHeaders().set('Content-Type','application/json');

  payments: Payment[] = [];

  constructor(private http: HttpClient, private router: Router, public auth: AuthService) { }

  getPayment(): Observable<any> {
    return (
      this.http
        .get(`${this.endpoint}/api/payment`)
        .pipe(catchError(this.auth.handleError))
    )
  }

  addNewPayment(payment: Payment): Observable<any> {
    return (
      this.http
      .post(`${this.endpoint}/api/payment`, payment)
      .pipe( catchError(this.auth.handleError) )
    )
  }

  updatePayment(payment: Payment): Observable<any> {
    const { paymentDetailId } = payment
    return (
      this.http
      .put(`${this.endpoint}/api/payment/${paymentDetailId}`, payment)
      .pipe( catchError(this.auth.handleError) )
    )
  }

  deletePayment(id: number): Observable<any> {
    return (
      this.http
      .delete(`${this.endpoint}/api/payment/${id}`)
      .pipe( catchError(this.auth.handleError) )
    )
  }
}
