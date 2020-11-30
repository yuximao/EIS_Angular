import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/authService';
import {User} from '../../shared/models/user';
import {AdminService} from '../../shared/services/adminService';
import {Router} from '@angular/router';
import {InsuranceService} from '../../shared/services/insuranceService';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  repass: '';
  user: User;
  oldPass: any;
  newPass: any;
  showalert = false;
  showalert2 = false;

  constructor(private auth: AuthService, private admin: AdminService,
              private router: Router, private insur: InsuranceService) {
  }

  ngOnInit(): void {
    this.user = this.auth.user;
  }

  Update() {
    if (this.oldPass == this.auth.psw) {
      const user = {
        id: this.auth.uid,
        username: this.user.username,
        email: this.user.email,
        password: this.newPass,
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
