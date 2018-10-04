import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent implements OnInit {
  @Input() items: Array<any> = [];
  @Output() closed =  new EventEmitter<boolean>();

  constructor( private productService: ProductService) {}

  showSlider() {
    this.closed.emit(false);
  }

  ngOnInit() {
  }

}


