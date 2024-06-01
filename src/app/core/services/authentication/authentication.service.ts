import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  /**
   * Function is used to Login.
   * @param login 
   * @returns 
   */
  login(login: any) {
    return this.http.post(environment.AUTH_BASE_URL + 'login/', login);
  }

  // logout() {
  //   return this.http.post(environment.AUTH_BASE_URL + 'logout/', {});
  // }
}
