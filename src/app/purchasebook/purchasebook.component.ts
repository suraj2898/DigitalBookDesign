import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReaderService } from '../Services/reader.service';

@Component({
  selector: 'app-purchasebook',
  templateUrl: './purchasebook.component.html',
  styleUrls: ['./purchasebook.component.css']
})
export class PurchasebookComponent implements OnInit {

  constructor(private router: Router, private readerApi:ReaderService) { }
  iconWidth:number=65;
  iconMargin:number=5;
  email:any="";
  resp:any="";
  ngOnInit(): void {
    this.email=localStorage.getItem("EMAIL")?.toString();
    this.readerApi.GetPurchasedBooks(this.email).subscribe(response => {
      this.resp = response;
      if(this.resp.length==0)
      {
        alert("Record Not Found");
      }
    });  
  }
  viewDetails:boolean=false;
  book:any;
  onSubmit(book:any):void
  {
    this.viewDetails=true;
    this.book=book;
  }
  onClear():void
  {
    this.viewDetails=false;
  }

}
