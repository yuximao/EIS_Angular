import { Component, OnInit } from '@angular/core';
import {InsuranceService} from '../../../shared/services/insuranceService';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.scss']
})
export class ClaimListComponent implements OnInit {

  constructor(private insur: InsuranceService, private ar: ActivatedRoute) { }
  id: number;
  claim: any;
  ngOnInit(): void {
    this.ar.paramMap
      .pipe(switchMap(params => {
        this.id = +params.get('id');
        return this.insur.getClaim(this.id);
      }))
      .subscribe(c => {
        this.claim = c;
      });
  }
}
