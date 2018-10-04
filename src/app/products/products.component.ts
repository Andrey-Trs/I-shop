import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataStorageService } from '../services/data-storage.service';
import { NewProduct } from '../shared/new-product';
import { BasketService } from '../services/basket.service';
import { Subscription } from '../../../node_modules/rxjs';
import { FilterService } from '../services/filter.service';
import { UserProductsService } from '../services/user-products.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  categorySubscr: Subscription;
  searchedproduct: Subscription;

  productsList: NewProduct[] = [];
  i: number;

  loading = true;

  chosenCategory = 'All categories';
  nameToFind = '';
  p = 1;

  constructor(private dataStorage: DataStorageService,
              private basketService: BasketService,
              private filterService: FilterService,
              private userProductService: UserProductsService) { }

  async ngOnInit() {
    await this.dataStorage.fetchBasketproducts();
     this.dataStorage.fetchProducts();
     this.subscription = this.dataStorage.addedProduct.subscribe( (productsList: NewProduct[]) => {
      this.productsList = productsList;
      this.dataStorage.checkProductState();
      this.loading = false;
    });
    this.categorySubscr = this.filterService.category.subscribe( (category: string) => {
      this.chosenCategory = category;
    });
    this.searchedproduct = this.filterService.searchProduct.subscribe( (value: string) => {
      this.nameToFind = value;
    });

  }

  addToBucket(id: string) {
    const key = id;
    for (let i = 0; i < this.productsList.length; i++) {
      if (this.productsList[i].id === key) {
        this.productsList[i].state = 'checked';
        this.basketService.toMyBasket(this.productsList[i]);
        this.dataStorage.changeBasketAmount('increase');
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.categorySubscr.unsubscribe();
    this.searchedproduct.unsubscribe();
  }

}
