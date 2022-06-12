import { AbstractControl } from "@angular/forms";

export function EmailValidator(control?: AbstractControl):{[key:string]:boolean} | null {

    const emailPattern: RegExp =  new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");

    if(emailPattern.test(control?.value)) {
        return null
    } else {
        return {"email":true}
    }


}