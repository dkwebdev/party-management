import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  storage: any = localStorage;
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const rawToken = this.storage.getItem('token');
    const token = rawToken ? JSON.parse(rawToken) : '';
    if (token) {
      return true;
    }
    else {
      this.router.navigate(['/main/login']);
      return false;
    }
  }

}
