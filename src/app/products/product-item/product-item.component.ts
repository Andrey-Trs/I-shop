import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewProduct } from '../../shared/new-product';
import { ActivatedRoute, Params,  Router } from '../../../../node_modules/@angular/router';
import { DataStorageService } from '../../services/data-storage.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { BasketService } from '../../services/basket.service';
import { fadeIn } from '../../animations/animations';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
  animations: [ fadeIn ]
})
export class ProductItemComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  chosenProduct: NewProduct;
  id: string;

  items: Array<any> = [];
  commentsViewMode = false;
  sliderMode = false;
  product: string;
  currentImg;



  constructor(private route: ActivatedRoute,
              private dataStorage: DataStorageService,
              private basketSevice: BasketService) {}

  changeMainImage(i) {
    this.currentImg = this.chosenProduct.images[i];
  }

  ngOnInit() {
    this.dataStorage.fetchBasketproducts();
    this.dataStorage.fetchProducts();
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.chosenProduct = this.dataStorage.getChosenProduct(this.id);
      });
     this.subscription = this.dataStorage.addedProduct.subscribe( () => {
      this.route.params.subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.chosenProduct = this.dataStorage.getChosenProduct(this.id);
          this.currentImg = this.chosenProduct.images[0];
        }
      );
    });
    this.items = this.chosenProduct.images;
    this.currentImg = this.chosenProduct.images[0];

   }

  showSlider() {
    this.sliderMode = !this.sliderMode;
  }

  showComments() {
    this.commentsViewMode = !this.commentsViewMode;
  }

  addToBasket() {
    this.basketSevice.toMyBasket(this.chosenProduct);
    this.chosenProduct.state = 'checked';
    this.dataStorage.changeBasketAmount('increase');
    this.dataStorage.checkProductState();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
