import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../Services/author.service';
import { ReaderService } from '../Services/reader.service';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent implements OnInit {
  iconWidth:number=65;
  iconMargin:number=5;
  resp:any="";
  constructor(private readerApi:ReaderService,private authorService:AuthorService) { }

  ngOnInit(): void {    
    this.readerApi.GetBooks().subscribe(response => {
      this.resp = response;
    });  
  }
  response:any;
  updateBook(book:any):void
  {
    this.authorService.UpdateBook(book).subscribe(response => {  
      this.response = response;    
      alert(this.response.result);      
    }); 
  }

}
