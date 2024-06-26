import { AbstractControl, ValidationErrors } from "@angular/forms";




export class EmpValidator {
    static isEmpldValid(control :AbstractControl) :ValidationErrors |null{
        let val = control.value as string;
        if(val){
            let regxp = /^[A-Z]\d{3}$/;
            let isvalid=regxp.test(val)
            if(isvalid){
                return null
            }else{
                return {
                    invalidEmPid :'Empld should be start with 1 albhabet and ends with 3 digit'
                }
            }
        }
        return null
    }
}