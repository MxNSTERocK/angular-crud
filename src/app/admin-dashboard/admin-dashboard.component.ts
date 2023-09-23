import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { AdminModel } from './admin-dashboard.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  formValue !: FormGroup; 
  AdminModelObj : AdminModel = new AdminModel();
  AdminData!:any;

  constructor(private formBuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',Validators.required],
      contact: ['',Validators.required],
      salary: ['',Validators.required]
    })
    this.getAllAdmin();
  }
  
  postAdminDetails() {
    this.AdminModelObj.firstname= this.formValue.value.firstname;
    this.AdminModelObj.lastname= this.formValue.value.lastname;
    this.AdminModelObj.email= this.formValue.value.email;
    this.AdminModelObj.contact= this.formValue.value.contact;
    this.AdminModelObj.salary= this.formValue.value.salary;    

    this.api.postAdmin(this.AdminModelObj)
    .subscribe(res=> {      
      console.log(res);
      alert("Admin Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllAdmin();
    },
    err=>{
      alert("Somenthing went wrong");
    })
  }

  getAllAdmin(){
    this.api.getAdmin()
    .subscribe(res=>{
      this.AdminData = res;
    })
  }

  deleteAdmin(row : any){
    this.api.deleteAdmin(row.id)
    .subscribe(res => {
      alert("Admin Deleted");
      this.getAllAdmin();
    })
  }
  
  onEdit(row :any){
    this.AdminModelObj.id = row.id;
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['contact'].setValue(row.contact);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateAdminDetails(){
    this.AdminModelObj.firstname= this.formValue.value.firstname;
    this.AdminModelObj.lastname= this.formValue.value.lastname;
    this.AdminModelObj.email= this.formValue.value.email;
    this.AdminModelObj.contact= this.formValue.value.contact;
    this.AdminModelObj.salary= this.formValue.value.salary;    
    this.api.updateAdmin(this.AdminModelObj,this.AdminModelObj.id)
    .subscribe(res=>{
      alert("Successfully Updated")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllAdmin();
    })
  }
}


