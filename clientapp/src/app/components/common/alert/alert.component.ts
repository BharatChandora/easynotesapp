import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alert:any = this.alertService.alert;
 

  constructor(public alertService: AlertService ) { }

  ngOnInit(): void {
    this.alert = this.alertService.alert;

  }

  // alertDismisal(type:string, msg:string) {

  //   this.alert = {
  //     type: type,
  //     msg: msg
  //   }

  //   setTimeout(()=> {
  //     this.alert = {
  //       type: "",
  //       msg: ""
  //     }
  //   }, 2000)
  // }


}
