import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EmailValidator } from 'src/app/shared/validators/email.validators';
import { AlertComponent } from '../../common/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(AlertComponent) alertChild: any

  loginForm!: FormGroup;
  

  constructor(private auth: AuthService, private router: Router, private alertService: AlertService
    ) { }

  ngOnInit(): void {

    if(this.auth.isLoggedIn()) {
     
      this.router.navigate([''])
    }
    
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, EmailValidator]),
      password: new FormControl('',[Validators.required ])
    
    })
  
  }

  get f() {
    return this.loginForm.controls
  }

  onSubmit() {
    

    this.auth.loginUser(this.loginForm.value).subscribe({
      next: (res:any) => {
        
        
        localStorage.setItem('token', res['token'])
        this.router.navigate([''])
        this.alertService.alertDismisal("success", "Logged In Successfully")

      },
      error: (err) => {
        
        this.alertService.alertDismisal("danger", err.error)

      }
    })


  }

}
