import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../../shared/services/authService';
import {ActivatedRoute, Router} from '@angular/router';
import {InsuranceService} from '../../shared/services/insuranceService';

@Component({
  selector: 'app-check-insurance',
  templateUrl: './check-insurance.component.html',
  styleUrls: ['./check-insurance.component.scss']
})
export class CheckInsuranceComponent implements OnInit {
  isShowCar = false;
  ChangedId: number;
  constructor(private auth: AuthService, private insur: InsuranceService, private ar: ActivatedRoute, private router: Router) {
  }

  id: number;
  insurancelist = [];

  ngOnInit(): void {
    if (this.auth.role != 2) {
      this.router.navigateByUrl('home');
    }
    this.ar.paramMap
      .pipe(switchMap(params => {
        this.id = +params.get('id');
        return this.insur.getInsurance(this.id);
      }))
      .subscribe(i => {
        this.insurancelist = i;
        console.log(this.insurancelist);
      });
  }

  showCar(id) {
    if (this.isShowCar == false) {
      this.isShowCar = true;
      this.ChangedId = id;
      console.log(id);
    } else {
      this.isShowCar = false;
      this.ChangedId = null;
      }
  }

}
