import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-claim-image',
  templateUrl: './claim-image.component.html',
  styleUrls: ['./claim-image.component.scss']
})
export class ClaimImageComponent implements OnInit {
  @Input() claimImages;
  constructor() { }

  ngOnInit(): void {
  }

}
