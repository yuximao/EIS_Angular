import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/authService';

@Component({
  selector: 'app-quote-block',
  templateUrl: './quote-block.component.html',
  styleUrls: ['./quote-block.component.scss']
})
export class QuoteBlockComponent implements OnInit {

  constructor(public auth: AuthService) { }
  ngOnInit(): void {
  }

}
