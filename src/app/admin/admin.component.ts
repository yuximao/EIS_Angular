import { Component, OnInit, Input } from '@angular/core';
import {AdminService} from '../shared/services/adminService';
import {User} from '../shared/models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  editUser = false;
  changedUser: User;
  changedId = null;
  newpassword = null;
  constructor(public admin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.admin.getAllUser()
      .subscribe(u => {
        this.admin.users = u.filter(res => res.role.id == 1);
      });
  }

  deleteUser(id) {
    this.admin.deleteUser(id)
      .subscribe(res => {
        if (res.success) {
          this.admin.getAllUser()
            .subscribe(u => {
              this.admin.users = u.filter( res => res.role.id == 1);
            });
        }
      });
  }
  initUpdateUser(id) {
    this.changedId = id;
    this.editUser = true;
    this.changedUser = this.admin.users.find(u => u.id == id);
  }

  updateUser(id) {
    this.changedUser.id = id;
    if (this.newpassword !== null && this.newpassword !== '') {
      this.changedUser.password = this.newpassword;
    } else {this.changedUser.password = null; }

    // console.log(this.changedUser);

    const user = {
      id : this.changedUser.id,
      username : this.changedUser.username,
      email : this.changedUser.email,
      password : this.changedUser.password,
    };
    this.admin.updateUser(user)
      .subscribe(res => {
        if (res. success) {
          this.admin.getAllUser()
            .subscribe(u => {
              this.admin.users = u.filter(res => res.role.id == 1);
              this.editUser = false;
              this.changedId = null;
            });
        } else {console.log(this.changedUser); }
      });
  }


  goProfile(id) {
    this.router.navigate(['./adminProfile', id]).catch();

  }

  goHistory(id) {
    this.router.navigate(['./checkHistory', id]).catch();

  }

  goInsurance(id) {
    this.router.navigate(['./checkInsurance', id]).catch();
  }

  goClaim(id) {
    this.router.navigate(['./checkClaim', id]).catch();
  }
}
