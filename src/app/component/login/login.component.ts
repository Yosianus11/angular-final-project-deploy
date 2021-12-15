import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string = ''
  errmsg: any = []
  success: any = {}
  toast: boolean = false;

  errNull() {
    this.errmsg = []
    this.success = {}
    this.toast = false;
  }

  

  signinForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&_])(?=[^A-Z]*[A-Z]).{8,20}$/)]),
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(public authService: AuthService, private router: Router, public paymentService: PaymentService) { }

  ngOnInit(): void {
  }
  get password() {
    return this.signinForm.get('password')
  }

  get email() {
    return this.signinForm.get('email')
  }

  signIn() {
    this.authService.signin(this.signinForm.value)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.jwtToken.result.token,)
        localStorage.setItem('refresh_token', res.jwtToken.result.refreshToken)
        this.paymentService.getPayment().subscribe(() => {
          this.router.navigate(['payment']);
        })
        const userlogin = this.signinForm.value
        this.authService.getUser(userlogin.email).subscribe((res:any) => {
          localStorage.setItem('user', res.item.userName)
        })

        this.success = res
        console.log(this.success = res)
      }, err => {
        console.log(this.errmsg = err);
      })
    this.toast = true
    setTimeout(() => {this.toast = false}, 4000);
  }
}
