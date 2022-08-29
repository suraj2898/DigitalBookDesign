import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../Models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  baseUrl: string = "https://localhost:7290/";
  constructor(private http: HttpClient) { }

  GetToken(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + "Authenticate", user);
  }

  Login(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + "Login", user);
  }

  SignUp(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + "Signup", user);
  }

  AddBook(book: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "Book/Create", book,
      {
        headers: new HttpHeaders
          (
            {
              'Authorization': 'Bearer ' + localStorage.getItem("TOKEN")?.toString(),
              'Content-Type': 'application/json'
            }
          )
      });
  }

  UpdateBook(book: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "Book/Update", book,
      {
        headers: new HttpHeaders
          (
            {
              'Authorization': 'Bearer ' + localStorage.getItem("TOKEN")?.toString(),
              'Content-Type': 'application/json'
            }
          )
      });
  }

}
