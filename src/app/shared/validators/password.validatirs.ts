import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";




export class AsyncEmailValidator{
    static isEmailAvaible(control :AbstractControl):Promise<ValidationErrors | null>|Observable<ValidationErrors | null>
    {
        let val = control.value;

        const promise = new Promise <ValidationErrors | null>((resolve, reject) => {
            setTimeout(() => {
                if(val === 'karanshitole11@gmail.com'){
                    resolve({
                        emailExistErr : 'This email id already in use'
                    })
                }else{
                    resolve(null)
                }
            }, 2000);
        })
        return promise
    }
    
    
}