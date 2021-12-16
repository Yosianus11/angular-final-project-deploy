import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errmsg: any = []

  success:any = {}

  toast:boolean = false;
  constructor(public authService: AuthService, public router: Router) { }

  signupForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&_])(?=[^A-Z]*[A-Z]).{8,20}$/)]),
    email: new FormControl('', [Validators.required, Validators.email])
  })

  get userName() {
    return this.signupForm.get('userName')
  }

  get password() {
    return this.signupForm.get('password')
  }

  get email() {
    return this.signupForm.get('email')
  }

  ngOnInit(): void {
  }

  errNull(){
    this.errmsg=[]
    this.success={}
    this.toast = false;
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
        this.signupForm.reset()
        this.success= res
        console.log(this.success= res)
    },
      err => {
        console.log(this.errmsg = err);
       
      })
      this.toast = true;
      setTimeout(() => {this.toast = false, this.errNull()}, 5000);
      setTimeout(() => {this.router.navigate(['login'])}, 7000);
  }
  

}
