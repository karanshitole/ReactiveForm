import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from './shared/validators/patterns.validators';
import { Icountry } from './shared/model/country.interface';
import { COUNTRIES_META_DATA } from './shared/validators/countryData';
import { EmpValidator } from './shared/validators/empid.validatirs';
import { AsyncEmailValidator } from './shared/validators/password.validatirs';
import { NpSpaceValidators } from './shared/validators/nsSpaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ReactiveForm';
  SingUpForm !: FormGroup;
  countriesArr : Array <Icountry>= COUNTRIES_META_DATA;
  gendersArr :  Array <string>=["Male","female","others"]
  constructor(){

  }

  ngOnInit(): void {
    this.createForm();
    this.isAddSameHandler();
    this.patchPerAddHandler();

    this.f['password'].valueChanges
        .subscribe(res=>{
         this.f['password'].valid? this.f['confirmPassword'].enable():this.f['confirmPassword'].disable()
        
        })
  }
  patchPerAddHandler(){
    this.f['isAddSame'].valueChanges
        .subscribe(res=>{
          // console.log(res);
          if(res){
            let currentAddObj = this.f['currentAddress'].value
            console.log(currentAddObj);
            this.f['permanentAddress'].patchValue(currentAddObj)
            this.f['permanentAddress'].disable()
          }else{
            this.f['permanentAddress'].enable()
            this.f['permanentAddress'].reset()
          }
        })
  }
  isAddSameHandler(){
    this.f['currentAddress'].valueChanges
         .subscribe((res)=>{console.log(res);
          this.f['currentAddress'].valid ? this.f['isAddSame'].enable():this.f['isAddSame'].disable()

         }
         
        )
  }
  createForm(){
    this.SingUpForm = new FormGroup({
      userName : new FormControl(null,[
        Validators.required,
        Validators.pattern(CustomRegex.username),
        Validators.minLength(5),
        Validators.maxLength(12),NpSpaceValidators.npSpace
        
      ]),
      email: new FormControl <string|null>(null,[
        Validators.required,
        Validators.pattern(CustomRegex.email)
      ],[AsyncEmailValidator.isEmailAvaible]),
      empId : new FormControl(null,[Validators.required,EmpValidator.isEmpldValid]),
      gender : new FormControl(null,[Validators.required]),
      isAddSame : new FormControl({value :false,disabled:true},[Validators.required]),
      currentAddress : new FormGroup({
        country : new FormControl('India',[Validators.required]),
        state : new FormControl(null,[Validators.required]),
        city : new FormControl(null,[Validators.required]),
        pincode : new FormControl(null,[Validators.required]),
      }),
      permanentAddress : new FormGroup({
        country : new FormControl('India',[Validators.required]),
        state : new FormControl(null,[Validators.required]),
        city : new FormControl(null,[Validators.required]),
        pincode : new FormControl(null,[Validators.required]),
      }),
      skills : new FormArray([new FormControl(null)]),
      password : new FormControl(null,[Validators.required, Validators.pattern(CustomRegex.password)]),
      confirmPassword : new FormControl({value:null, disabled:true},[Validators.required])

    })
    
  }
  onsingUp(){
   if(this.SingUpForm.valid){
    console.log(this.SingUpForm.value);
    // console.log(this.SingUpForm);
   }
    
  }
  onSkillAdd(){
  if(this.skillsFormArray.length<5){
    let contro = new FormControl(null);
    this.skillsFormArray.push(contro);
  }
  }
  onskillRemove(i:number){
    console.log(i);
    this.skillsFormArray.removeAt(i)
    
  }
  get f(){
    return this.SingUpForm.controls
  }
  get email(){
    return this.SingUpForm.get('email') as FormControl
  }
  get userName(){
    return this.SingUpForm.get('userName') as FormControl
  }
  get empId(){
    return this.SingUpForm.get('empId') as FormControl
  }
  get skillsFormArray(){
    return this.SingUpForm.get('skills')as FormArray
  }
}
