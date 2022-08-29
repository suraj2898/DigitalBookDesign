import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReaderService } from '../Services/reader.service';

@Component({
  selector: 'app-searchbook',
  templateUrl: './searchbook.component.html',
  styleUrls: ['./searchbook.component.css']
})
export class SearchbookComponent implements OnInit {

  constructor(private apiService:ReaderService,private router: Router) { }
  iconWidth:number=65;
  iconMargin:number=5;
  searchbook:any={
    price:"",
    category:"",
    publisher:""
  }
  resp:any={};
  ngOnInit(): void {
  }
  onSearch(): void {
    if(this.searchbook.price=="" && this.searchbook.category=="" && this.searchbook.publisher=="")
    {
      alert("At least one field required.")
      return;
    }
    if(this.searchbook.price=="")
    {
      this.searchbook.price=0;
    }
    this.apiService.searchBook(this.searchbook).subscribe(response=>{
      this.resp= response;
      if(this.resp.length==0)
      {
        alert("Books Not Found");
      }
    });    
  }
  purchaseBookData:any={
    email:"",
    userid:0,
    bookid:0,
    title:"",
    price:0
  }
  purchasing:boolean=false;
  onSubmit(book:any): void {
    this.purchaseBookData.userid=localStorage.getItem("USERID")?.toString();
    this.purchaseBookData.bookid=book.bookid;
    this.purchasing=true;
    this.purchaseBookData.title=book.title;
    this.purchaseBookData.price=book.price;
  }

  OnPurahase():void
  {
    this.apiService.Buy(this.purchaseBookData).subscribe(response => {
      this.purchaseResp = response;
      alert(this.purchaseResp.result);      
      this.router.navigate(['/Bought']);   
    });   
  }
  purchaseResp:any;
  getValue():any
  {
    return localStorage.getItem("STATUS")?.toString();
  }

  onClear():void
  {
    this.purchasing=false;
  }
}
