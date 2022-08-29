import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { AuthorService } from '../Services/author.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private authorApi: AuthorService) { }
  user: User = {
    Userid: 0,
    Username: "",
    UserType: "--Select--",
    Password: ""
  }
  confirmpass:string="";
  response: any = "";
  ngOnInit(): void {

  }
  onSubmit():void{
    if(this.user.Username=="" || this.user.UserType=="" || this.user.Password=="" )
    {
      alert("All Fields Are Required");
      return;
    }
    if(this.user.UserType=="--Select--")
    {
      alert("Select User Type");
      return;
    }
    if(this.user.Password!=this.confirmpass)
    {
      alert("Password and Confirm Password Mismatch");
      return;
    }    
    if(this.user.UserType=="Author")
    {
      this.user.UserType="A";
    }
    else
    {
      this.user.UserType="R";
    }
    this.authorApi.SignUp(this.user).subscribe(response => {
      this.response = response;
      alert(this.response.result);
      this.router.navigate(['/Login']);   
    });
  }
}
