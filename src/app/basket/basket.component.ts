import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewProduct } from '../shared/new-product';
import { BasketService } from '../services/basket.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {

  productsSubscription: Subscription;
  updatedTotalPriceSubscr: Subscription;

  toBuyProducts: NewProduct[];

  totalPrice = 0;
  amountOfItems = 0;

  constructor( private basketService: BasketService) {}

 ngOnInit() {
    this.basketService.fetchBasketproducts();
    this.basketService.toBuyProducts.subscribe(
      (chosenProducts: NewProduct[]) => {
        this.toBuyProducts = chosenProducts;
        this.totalPrice = this.basketService.totalPrice;
        this.updatedTotalPriceSubscr = this.basketService.newTotalPrice.subscribe(
          (updatedTotalPrice: number) => {
            this.totalPrice = updatedTotalPrice;
          });
      });
  }




  ngOnDestroy() {
    // this.productsSubscription.unsubscribe();
    this.updatedTotalPriceSubscr.unsubscribe();
  }


}
