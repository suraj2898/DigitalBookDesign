import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Models/user';
import { AuthorService } from '../Services/author.service';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authorApi: AuthorService) { }
  statuss?:string="";
  ngOnInit(): void {
  }

  user: User = {
    Userid: 0,
    Username: "",
    UserType: "",
    Password: ""
  }
  resp: any = "";
  response: any = "";
  onSubmit(): void {    
    if(this.user.Username=="")
    {
      alert("Enter Username");
      return;
    }
    if(this.user.Password=="")
    {
      alert("Enter Password");
      return;
    }
    this.authorApi.Login(this.user).subscribe(response => {
      this.response = response;
      localStorage.setItem("STATUS", this.response.userType);
      localStorage.setItem("USERID", this.response.userid);
      if (this.response.userType == "A" || this.response.userType == "R") {
        this.authorApi.GetToken(this.user).subscribe(response => {
          this.resp = response;
          localStorage.setItem("TOKEN", this.resp.token);     
          if (this.response.userType == "A")
          {     
          this.router.navigate(['/AddBook']);     
          }
          else
          {
            localStorage.setItem("EMAIL", this.response.username);     
            this.router.navigate(['/']);     
          }     
        });
      }
      else {
        alert(this.response.userType);
      }
    });
  }
}
