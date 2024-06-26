import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NpSpaceValidators{
    static npSpace(control :AbstractControl)
    :ValidationErrors | null
    {
 
     let val = control.value as string;
    if(!val){
     return null
 
    }
    if(val.includes(" ")){
     return {
         npSpaceErr : "Space is not allowed !!!"
     }
    }else{
     return null
    }
    
     }
 }