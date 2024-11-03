import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${environment.baseURL}`;
  http = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}/api/auth/register`, registerObj);
  }

  
  registerAdminService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}/api/auth/register-admin`, registerObj);
  }

  loginService(loginObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}api/auth/login`, loginObj, {withCredentials: true});
  }

  sendEmailService(email: string){
    return this.http.post<any>(`${apiUrls.authServiceApi}send-email`, {email: email});
  }

  resetPasswordService(resetObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}reset-password`, resetObj);
  }

  isLoggedIn(){
    return !!localStorage.getItem("user_id");
  }
}
