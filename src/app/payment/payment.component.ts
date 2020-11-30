import {Component, OnInit} from '@angular/core';
import {InsuranceService} from '../shared/services/insuranceService';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../shared/services/authService';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(public insur: InsuranceService, private ar: ActivatedRoute, private router: Router, private auth: AuthService) {
  }

  insurance: any;
  id: number;

  ngOnInit(): void {
    this.ar.paramMap
      .pipe(switchMap(params => {
        this.id = +params.get('id');
        return this.insur?.insurance?.filter(i => i.id === this.id);
      }))
      .subscribe(c => {
        this.insurance = c;
      });
  }

  PaySwitch1 = true;
  PaySwitch2 = false;
  PaySwitch3 = false;
  showalert = false;

  pay1() {
    this.PaySwitch1 = true;
    this.PaySwitch2 = false;
    this.PaySwitch3 = false;
  }

  pay2() {
    this.PaySwitch1 = false;
    this.PaySwitch2 = true;
    this.PaySwitch3 = false;
  }

  pay3() {
    this.PaySwitch1 = false;
    this.PaySwitch2 = false;
    this.PaySwitch3 = true;
  }

  pay() {
    this.insurance.price = -(this.insurance.price);
    this.insur.updateInsurance(this.insurance)
      .subscribe(res => {
        if (res.success) {
          this.insur.getInsurance(this.auth.uid)
            .subscribe(i => {
              this.insur.insurance = i;
            });
          this.showalert = true;
        }
      });
  }

  goHome() {
    this.showalert = false;
    this.router.navigateByUrl('/home');

  }
}
