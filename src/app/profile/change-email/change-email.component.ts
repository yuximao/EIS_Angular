import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user';
import {AuthService} from '../../shared/services/authService';
import {AdminService} from '../../shared/services/adminService';
import {Router} from '@angular/router';
import {InsuranceService} from '../../shared/services/insuranceService';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  user: User;
  oldPass: any;
  newEmail: any;
  showalert = false;
  showalert2 = false;
  constructor(private auth: AuthService, private admin: AdminService,
              private router: Router, private insur: InsuranceService) { }

  ngOnInit(): void {
    this.user = this.auth.user;
  }

  Update() {
    if (this.oldPass == this.auth.psw) {
      const user = {
        id: this.auth.uid,
        username: this.user.username,
        email: this.newEmail,
        password: this.auth.psw
      };
      this.admin.updateUser(user)
        .subscribe(res => {
          if (res.success) {
            this.showalert = true;
          }
        });
    } else {this.showalert2 = true; }
  }

  goHome() {
    this.showalert = false;
    this.auth.logout()
      .subscribe(res => {
        if (res.success) {
          console.log('logout');
          this.auth.user = null;
          this.auth.profile = null;
          this.auth.uid = null;
          this.insur.insurance = null;
          this.auth.role = null;
          this.admin.users = null;
          this.auth.psw = null;
          this.router.navigate(['/home']).catch();
        }
      });
  }
}
