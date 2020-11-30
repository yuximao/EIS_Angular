import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/authService';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {InsuranceService} from '../shared/services/insuranceService';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})

export class LoginComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  showalert = false;
  constructor(public auth: AuthService, private insur: InsuranceService , private location: Location, private router: Router) {}
  Submit(form) {
    this.auth.login(form.value)
      .subscribe(res => {
        if (res.success) {
          this.auth.getUser()
            .subscribe(u => {
              this.auth.user = u.user;
              this.auth.uid = u.user.id;
              this.auth.role = u.user.role.id;
              this.insur.getInsurance(this.auth.uid)
                .subscribe(i => {
                  this.insur.insurance = i;
                });
              this.auth.getProfile(this.auth.uid)
                .subscribe(p => {
                  this.auth.profile = p;
                });
              this.router.navigateByUrl('/home');
            }
        );
        } else {this.showalert = true; }
      });
  }

  ngOnInit(): void {
  }
}



