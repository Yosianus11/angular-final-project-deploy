import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PaymentComponent } from './component/payment/payment.component';
import { SignupComponent } from './component/signup/signup.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path:'', redirectTo: '/login', pathMatch:'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: SignupComponent},  
  { path: 'payment', component: PaymentComponent, canActivate:[AuthGuard]},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
