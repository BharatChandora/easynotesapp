import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://localhost:4200',
    }),
  };

  username!:string

  
  
  

  constructor(private httpClient: HttpClient) { }

  registerUser(registerationInfo: any) {
    const url = `${environment.ApiBaseUrl}/auth/register`;
    
    return this.httpClient.post(url, registerationInfo, this.httpOptions).pipe(catchError(this.handleError))
  
  }

  loginUser(loginInfo: any) {

    // const url = 'http://localhost:3000/auth/login';
    const url = `${environment.ApiBaseUrl}/auth/login`;

    return this.httpClient.post(url, loginInfo, this.httpOptions).pipe(catchError(this.handleError))


  }

  getToken(): string {
    if (this.isLoggedIn()) {
      
      return localStorage.getItem('token') || ""
    }

    return ""
  }

  isLoggedIn = function():boolean {
   
    return (!!localStorage.getItem('token'))
  }

  

  handleError(err: any) {
    
    let errorMsg = '';
    if (err.error instanceof ErrorEvent) {
      
      errorMsg = err.error.message;
    } else {
      
      errorMsg = err
      // console.log(err)
      
         
    }

    return throwError(()=>{

      return errorMsg;

    })

  }





}



