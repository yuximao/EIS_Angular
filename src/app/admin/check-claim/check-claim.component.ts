import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/authService';
import {InsuranceService} from '../../shared/services/insuranceService';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Claim} from '../../shared/models/claim';

@Component({
  selector: 'app-check-claim',
  templateUrl: './check-claim.component.html',
  styleUrls: ['./check-claim.component.scss']
})
export class CheckClaimComponent implements OnInit {

  id: number;
  Claims: Claim[];
  constructor(private auth: AuthService, private insur: InsuranceService,
              private ar: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (this.auth.role != 2) {
      this.router.navigateByUrl('home');
    }
    this.ar.paramMap
      .pipe(switchMap(params => {
        this.id = +params.get('id');
        return this.insur.getClaimByUser(this.id);
      }))
      .subscribe(c => {
        this.Claims = c;
      });
  }

}
