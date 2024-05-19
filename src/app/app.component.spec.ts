import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    const matDialogStub = () => ({
      open: () => {
        return {
          afterClosed: () => of({ id: 1, name: 'Existing User' })
        };
      }
    });
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [ FormsModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: MatDialog, useFactory: matDialogStub },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'github-copilot'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Github Copilot');
  });


  it('should open dialog and update user on close', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const matDialogStub: MatDialog = fixture.debugElement.injector.get(
      MatDialog
    );
    spyOn(matDialogStub, 'open').and.callThrough();
    app.users = new MatTableDataSource<any>([{ id: 1, name: 'Existing User' }]);
    app.openUser();

    expect(app.users.data[0].name).toEqual('Existing User');
  });

  it('should open dialog and add user on close', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    
    const matDialogStub: MatDialog = fixture.debugElement.injector.get(
      MatDialog
    );
    spyOn(matDialogStub, 'open').and.callThrough();

    app.users = new MatTableDataSource<any>([{ id: 1, name: 'Existing User' }]);
    app.openUser();

    expect(app.users.data.length).toEqual(2);
    expect(app.users.data[1].name).toEqual('Existing User');
  });

  it('should delete user', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.users = new MatTableDataSource<any>([{ id: 1, name: 'Existing User' }]);
    app.deleteUser({ id: 1, name: 'Existing User' });

    expect(app.users.data.length).toEqual(1);
  });
});
