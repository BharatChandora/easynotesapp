import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert: any = {
    type: "",
    msg: ""
  };

  timer: any;

  constructor() { }

  alertDismisal(type:string, msg:string) {
    
    
    clearTimeout(this.timer)

    this.alert = {
      type: type,
      msg: msg
    }

    // console.log(this.alert)

    this.timer =  setTimeout(()=> {
      this.alert = {
        type: "",
        msg: ""
      }
    }, 2000)

    
  }
}
