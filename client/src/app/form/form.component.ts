import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { SelectOptionInterface } from "../select/select.component";


@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.css"]
})

export class FormComponent implements OnInit, OnDestroy{
    form: FormGroup = new FormGroup("");
    formSubscription: Subscription|null = null;
    options: SelectOptionInterface[] = [
        {value: "", text: ""},
        {value: "1", text: "London"},
        {value: "2", text: "Madrid"},
        {value: "3", text: "Tahiti"},
        {value: "4", text: "Paris"},
      ];

    ngOnInit(): void {
        this.form = new FormGroup({
          name: new FormControl("",[Validators.required]),
          email: new FormControl("",[Validators.email, Validators.required]),
          password: new FormControl("",[Validators.required]),
          confirmPassword: new FormControl("", [Validators.required]),
          city: new FormControl("", [Validators.required])
        });

        this.form.setValidators(this.matchingPasswordsValidator());
    
        this.formSubscription = this.form.valueChanges.subscribe(value=>{
          //console.log(value);
        })
    
      }
    
      matchingPasswordsValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const password = control.get('password');
          const confirmPassword = control.get('confirmPassword');
      
          if (!password || !confirmPassword) {
            return null;
          }
      
          return password.value === confirmPassword.value ? null : { matchingPasswordsValidator: true };
        };
      }

      getCityFormControl (){
        return this.form.controls['city'] as FormControl; 
      }

      ngOnDestroy(): void {
        this.formSubscription?.unsubscribe();
      }
      
      submit(){
        console.log(this.form);
      }
}