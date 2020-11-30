import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/authService';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {AdminService} from '../../shared/services/adminService';

@Component({
  selector: 'app-check-history',
  templateUrl: './check-history.component.html',
  styleUrls: ['./check-history.component.scss']
})
export class CheckHistoryComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router, private ar: ActivatedRoute, private admin: AdminService) { }

  id: number;
  historylist: any;

  ngOnInit(): void {
    if (this.auth.role != 2) {
      this.router.navigateByUrl('/home');
    }
    this.ar.paramMap
      .pipe(switchMap(params => {
        this.id = +params.get('id');
        return this.admin.getHistory(this.id);
      }))
      .subscribe(c => {
        this.historylist = c;
      });

  }

}
