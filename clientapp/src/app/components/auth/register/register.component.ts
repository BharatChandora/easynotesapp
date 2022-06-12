import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms'
import { AuthService } from 'src/app/shared/services/auth.service';
import { PasswordValidator } from '../../../shared/validators/password.validator'
import { Router } from '@angular/router';
import { EmailValidator } from 'src/app/shared/validators/email.validators';
import { AlertService } from 'src/app/shared/services/alert.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  alert = {}
  

  
  constructor(private auth: AuthService, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()) {
      
      this.router.navigate([''])
    }

    this.registrationForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(''),
      email: new FormControl('', [Validators.required, EmailValidator]),
      password: new FormControl(''),
      confirmpassword: new FormControl('')
  
  
    }, {validators:[PasswordValidator]})

  }

  get f() { return this.registrationForm.controls; }

  onSubmit() {
    
    this.auth.registerUser(this.registrationForm.value).subscribe({
      
      next: ()=>{
        // console.log(res)
        
        this.registrationForm.setValue({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmpassword: ""
        })

        this.registrationForm.reset()

        
        this.alertService.alertDismisal("success", "Account Successfully Created")
        
        this.router.navigate(['login'])
        
      },
      error: (err) => {
        
        console.log(err)
        

        this.alertService.alertDismisal("danger", err.error.errors[0].msg)

      }
      
    })

    
  }

}
