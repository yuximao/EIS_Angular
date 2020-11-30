import {Component, Input, OnInit} from '@angular/core';
import {InsuranceService} from '../../../shared/services/insuranceService';
import {AuthService} from '../../../shared/services/authService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-insurance-profile',
  templateUrl: './insurance-profile.component.html',
  styleUrls: ['./insurance-profile.component.scss']
})
export class InsuranceProfileComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() ins;

  ngOnInit(): void {
  }

  goCar() {
    this.router.navigate(['/listCar', this.ins.id]).catch();
  }

  goClaim() {
    this.router.navigate(['/listClaim', this.ins.id]).catch();
  }

  pay() {
    this.router.navigate(['/card', this.ins.id]).catch();
  }
}
