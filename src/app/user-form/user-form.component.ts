import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: ['', Validators.required],
    mobileNumber: ['']
  });


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    if (this.data) {
      this.userForm.patchValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        age: this.data.age,
        mobileNumber: this.data.mobileNumber
      });
    }
  }


  submitForm(): void {
    if (!this.userForm.valid) return;
  
    const { id, firstName, lastName, age, mobileNumber } = this.userForm.value;
    const newUser = this.data ? { id, firstName, lastName, age, mobileNumber } : {
      id: this.generateId(),
      firstName,
      lastName,
      age,
      mobileNumber
    };
  
    this.closePopup(newUser);
  }
  
  generateId(): string {
    return Math.random().toString(36).substring(7);
  }
  

  closePopup(user: any): void {
    // Implement the logic to close the popup or perform any other action with the new user object
    this.dialogRef.close(user);
  }
}




