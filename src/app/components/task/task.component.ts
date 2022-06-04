import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators ,FormArray, FormControl} from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
declare var $: any;
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
   formData!: FormGroup;
   loading = false;  
   action="";
   submitted = false; submitted1 = false;userDataGet:any;
   error = '';
  fields: any;  options = new FormArray([]);getData:any[];
  langArr = [{name: 'Angular',},{name: 'React',},{name: 'C#',},{name: 'Other',}]
  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar,
    private router: Router,private _FB: FormBuilder) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit(): void {
    this.getData=JSON.parse(localStorage.getItem('setData'));
    if(this.route.snapshot.params['answers']=='answers' && this.route.snapshot.params['answers']!=undefined){
    
    this.action="aa";
  this.userDataGet=JSON.parse(localStorage.getItem('userData'));
    }
   
    

    this.formData = this._FB.group({
      about: ['', Validators.required],
      langArray: this._FB.array([])
    
      
    })

    this.fields = {
      options: [
        {
          answer: '',
          
        }
      ]
 };

    this.DataForm = this._FB.group({
      languages:['',[Validators.required]],
      question:['',[Validators.required]],
      options: this._FB.array([])
      });
      const control = <FormArray>this.DataForm.get('options');
      this.fields.options.forEach(x => {
          control.push(this.patchValues(x.value))
      })

      this.options = this._FB.array([]);
  }
 
  DataForm = this._FB.group({
    languages:['',[Validators.required]],
    question:['',[Validators.required]],
   
  });
  get f() { return this.DataForm.controls; }
  onSubmit(){
    this.submitted = true;
    
    if (this.DataForm.invalid) {
      $("#exampleModal").modal('show');
      return;
    }
    var prm=this.DataForm.value;

    type NumberArray = Array<{languages: string, 
      question: string,options: [string]
     
      }>;
 
    var  dataArr: NumberArray = [
      {
"languages":this.DataForm.controls['languages'].value,
"question":this.DataForm.controls['languages'].value,
"options":this.DataForm.controls['options'].value,

      }
        ];


     this.getData=JSON.parse(localStorage.getItem('setData'));
    if(this.getData?.length > 0){
      this.getData.push(dataArr);
    //localStorage.setItem('setData',JSON.stringify(prm));
    }else{
      localStorage.setItem('setData',JSON.stringify(dataArr));
    }
    this.snackBar.open("Added successfully", this.action, {
      duration: 1000,
    });
  
    $("#exampleModal").modal('hide');
    this.DataForm.reset();
    this.getData=JSON.parse(localStorage.getItem('setData'));
    
  }
  onAddRow() {
   
    const control = <FormArray>this.DataForm?.controls['options'];
   this.fields?.options.forEach(x => {
    control.push(this.patchValues(x.answer))
  })
  }
  onRemoveRow(rowIndex:number){
    const fa = (this.DataForm?.get('options')as FormArray);
    fa.removeAt(rowIndex);
 
  }
  patch() {
    const control = <FormArray>this.DataForm?.get('options');
    this.fields?.options.forEach(x => {
      control.push(this.patchValues(x.answer))
    })
  }

  patchValues(answer) {
    return this._FB.group({
      answer: [answer],
      
    })
  }


  get f1() { return this.formData.controls; }
  


  onCheckboxChange(e: any) {
    const langArray: FormArray = this.formData.get('langArray') as FormArray;
    if (e.target.checked) {
      langArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      langArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          langArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  submitForm() {
         localStorage.setItem('userData',JSON.stringify(this.formData.value));
  this.router.navigate(['/form/answers']);
    //console.log(this.formData.value);
  }

}
