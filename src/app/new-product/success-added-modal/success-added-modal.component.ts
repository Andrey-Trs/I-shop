import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { fadeIn } from '../../animations/animations';

@Component({
  selector: 'app-success-added-modal',
  templateUrl: './success-added-modal.component.html',
  styleUrls: ['./success-added-modal.component.css'],
  animations: [ fadeIn ]
})
export class SuccessAddedModalComponent implements OnInit {

  constructor( private router: Router) { }

  onNewProductPage() {
    this.router.navigate(['/newProduct']);
  }

  onMainPage() {
    this.router.navigate(['/products']);
  }

  ngOnInit() {
  }

}
