import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    const matDialogStub = () => ({
      open: () => {
        return {
          afterClosed: () => of({ id: 1, name: 'Existing User' })
        };
      }
    });
    const matDialogRefStub = () => ({ close: () => ({}) });

    await TestBed.configureTestingModule({
      declarations: [ UserFormComponent ],
      imports: [ FormsModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: MAT_DIALOG_DATA, useValue: { } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize form with provided data', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      age: '30',
      mobileNumber: '1234567890'
    };
    component.data = data;
    component.ngOnInit();
    expect(component.userForm.value).toEqual(data);
  });
  
  it('should not submit form when form is invalid', () => {
    const matDialogRefStub: MatDialogRef<UserFormComponent> = fixture.debugElement.injector.get(
      MatDialogRef
    );
    spyOn(matDialogRefStub, 'close').and.callThrough();
    component.submitForm();
    expect(matDialogRefStub.close).not.toHaveBeenCalled();
  });
  
  it('should submit form when form is valid', () => {
    const matDialogRefStub: MatDialogRef<UserFormComponent> = fixture.debugElement.injector.get(
      MatDialogRef
    );
    component.userForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      age: '30',
      mobileNumber: '1234567890'
    });
    component.submitForm();
    expect(matDialogRefStub.close).toHaveBeenCalledWith({
      id: jasmine.any(Number),
      firstName: 'John',
      lastName: 'Doe',
      age: '30',
      mobileNumber: '1234567890'
    });
  });
});
