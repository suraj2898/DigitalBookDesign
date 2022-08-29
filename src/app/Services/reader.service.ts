import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  baseUrl:string="https://localhost:7290/";
  constructor(private http:HttpClient) { }

  GetBooks():Observable<any>{
    return this.http.get<any>(this.baseUrl+"Book");
  }

  searchBook(searchBook:any):Observable<any[]>{
    return this.http.post<any[]>(this.baseUrl+"Book/Search",searchBook);
  }

  Buy(Books:any):Observable<any[]>{
    return this.http.post<any[]>(this.baseUrl+"Book/Buy",Books);
  }

  GetPurchasedBooks(email:any):Observable<any[]>{
    email='"'+email+'"';
    console.log(email);
    return this.http.post<any[]>(this.baseUrl+"Book/Bought",email,
    {
      headers: new HttpHeaders
        (
          {
            'Content-Type': 'application/json'
          }
        )
    }
    );
  }

}
