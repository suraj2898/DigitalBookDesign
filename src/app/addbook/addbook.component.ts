import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../Services/author.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  constructor(private authorApi: AuthorService) { }
  book:any={
    title:"",
    category:"",
    publisher:"",
    price:0,
    bookcontent:"",
    createddate:new Date()
  }
  ngOnInit(): void {
  }
  response:any;
  onSubmit():void{
    this.authorApi.AddBook(this.book).subscribe(response => {
      this.response = response;
      this.book.title="";
      this.book.category="";
      this.book.price="";
      this.book.publisher="";
      this.book.bookcontent="";
      alert(this.response.result);      
    });    
  }
}
