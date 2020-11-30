import { Component, OnInit } from '@angular/core';
import {InsuranceService} from '../../../shared/services/insuranceService';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../shared/services/authService';

@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.scss']
})
export class InsuranceListComponent implements OnInit {

  constructor(public insur: InsuranceService, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  back() {
    this.router.navigateByUrl('/profile');

  }
}
