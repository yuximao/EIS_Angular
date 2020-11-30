import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/authService';
import {Router} from '@angular/router';
import {InsuranceService} from '../shared/services/insuranceService';
import {AdminService} from '../shared/services/adminService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showalert = false;

  constructor(public auth: AuthService, private router: Router, public insur: InsuranceService, public admin: AdminService) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout()
      .subscribe(res => {
        console.log(res);
        if (res.success) {
          this.auth.user = null;
          this.auth.profile = null;
          this.auth.uid = null;
          this.insur.insurance = null;
          this.auth.role = null;
          this.admin.users = null;
          this.auth.psw = null;
          this.showalert = true;
        }
        });
  }

  goHome() {
    this.showalert = false;
    this.router.navigateByUrl('/home');

  }
}
