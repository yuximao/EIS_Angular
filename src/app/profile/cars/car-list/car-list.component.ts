import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/authService';
import {InsuranceService} from '../../../shared/services/insuranceService';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  constructor(public insur: InsuranceService, private ar: ActivatedRoute, private router: Router) { }
  id: number;
  insurance: any;
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
  goPage(car) {
    this.router.navigate(['/updateCar', car.id]).catch();
  }
}
