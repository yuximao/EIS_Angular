import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-claim-profile',
  templateUrl: './claim-profile.component.html',
  styleUrls: ['./claim-profile.component.scss']
})
export class ClaimProfileComponent implements OnInit {
  @Input() claim;
  constructor() { }

  ngOnInit(): void {
  }

}
