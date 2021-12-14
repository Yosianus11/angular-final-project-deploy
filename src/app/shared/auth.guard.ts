import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (!this.authService.isLoggedIn()) {
      window.alert("Access denied Please Login");
      this.router.navigate(['login'])
    } else {
      let result: any = await this.authService.refreshToken().toPromise();
      console.log(result.result.success);
      if (!result.result.success) {
        window.alert("Login Session Expired, Please Login");
        this.router.navigate(['login'])
      }
    }
    return true
  }
}
