import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/authService';
import {Router} from '@angular/router';
import {InsuranceService} from '../shared/services/insuranceService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {
    username: '',
    password: '',
    email: ''
  };
  repass: '';
  showalert = false;

  constructor(private auth: AuthService, private router: Router, private insur: InsuranceService
  ) {
  }

  ngOnInit(): void {
  }

  register(form) {
    this.auth.newUser(form.value)
      .subscribe(res => {
        if (res.success) {
          this.auth.login(form.value)
            .subscribe(ress => {
              if (ress.success) {
                this.auth.getUser()
                  .subscribe(u => {
                    this.auth.user = u.user;
                    this.auth.uid = u.user.id;
                    this.auth.role = u.user.role.id;
                    this.auth.psw = this.user.password;
                    this.insur.getInsurance(this.auth.uid)
                      .subscribe(i => {
                        this.insur.insurance = i;
                      });
                    this.auth.getProfile(this.auth.uid)
                      .subscribe(p => {
                        this.auth.profile = p;
                      });
                    this.showalert = true;
                  });
              } else {
                // alert('login wrong!');
              }
            });
        } else {
          // alert('sorry, not success!');
        }
      });
  }

  goHome() {
    this.showalert = false;
    this.router.navigateByUrl('/home');
  }
}
