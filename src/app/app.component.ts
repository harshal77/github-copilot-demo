import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './user-form/user-form.component';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Github Copilot';
  users: any = new MatTableDataSource<any>([]);

  displayedColumns = ['firstName', 'lastName', 'age', 'mobileNumber', 'action'];

  constructor(private dialog: MatDialog) { }

  openUser(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '250px',
      data: {} // Replace with your own data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('this.users', this.users);
        const newData = [...this.users.data, result];
        this.users = new MatTableDataSource<any>(newData);
      }
    });
  }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '250px',
      data: user // Pass the user data to prefill the form
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('this.users', this.users);
        const existingUserIndex = this.users.data.findIndex((u: any) => u.id === result.id);
        if (existingUserIndex > -1) {
          this.users.data[existingUserIndex] = result;
        } else {
          this.users.data.push(result);
        }
        this.users = new MatTableDataSource<any>(this.users.data);
      }
    });
  }

  deleteUser(user: any): void {
    const index = this.users.data.indexOf(user);
    if (index > -1) {
      this.users.data.splice(index, 1);
      this.users = new MatTableDataSource<any>(this.users.data);
    }
  }
}




