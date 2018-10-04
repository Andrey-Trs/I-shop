import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { NewProduct } from '../shared/new-product';
import { Subject } from '../../../node_modules/rxjs';
import { Router } from '../../../node_modules/@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  products: NewProduct[];
  basketProducts: NewProduct[];
  imagesUrl = [];
  addedProduct = new Subject <NewProduct[]>();
  itemsQuantity = new Subject <number>();
  // changeState = new Subject <string>();
  chosenObj = NewProduct;
  toBuyItemsQuantity = 0;

  constructor( private router: Router, private localStorage: LocalStorageService,
    private httpClient: HttpClient, private authService: AuthService) { }

  fetchProducts() {
    this.httpClient.get<NewProduct[]>('https://start-project-fa021.firebaseio.com/products/toSellProducts.json')
      .map(
        (products) => {
          return products;
        }
      )
      .subscribe(
        (products: NewProduct[]) => {
          this.products = products;
          const productsArr = [];
          const keys = Object.keys(products);
          for (const key of keys ) {
            productsArr.push({
              name: products[key].name,
              id: key,
              comments: [],
              category: products[key].category,
              description: products[key].description,
              price: products[key].price,
              images: products[key].images,
              amount: 1,
              state: 'unchecked'
            });
          }
          this.products = productsArr;
          this.addedProduct.next(this.products);
          this.checkProductState();
        }
      );
  }

  fetchBasketproducts() {
    const localKey = this.localStorage.retrieve('userKey');
    this.httpClient.get<NewProduct[]>('https://start-project-fa021.firebaseio.com/products/shoppingBasket/' + localKey + '.json').map(
      (products) => {
        return products;
      }
    ).subscribe(
      (products: NewProduct[]) => {
        const basketArr = [];
        if (products) {
          const keys = Object.keys(products);
          for (const key of keys) {
            basketArr.push({
              name: products[key].name,
              id: key,
              category: products[key].category,
              description: products[key].description,
              price: products[key].price,
              images: products[key].images,
              amount: products[key].amount,
              state: 'checked'
            });
          }
        }
        this.basketProducts = basketArr;
        this.countBasketItems();
      }
    );
  }

  countBasketItems() {
    this.toBuyItemsQuantity = 0;
    for ( let i = 0; i < this.basketProducts.length; i++) {
      this.toBuyItemsQuantity += this.basketProducts[i].amount;
    }
    this.itemsQuantity.next(this.toBuyItemsQuantity);
  }

  changeBasketAmount(value, amountOfitems?) {
    if (value === 'increase') {
      ++this.toBuyItemsQuantity;
    } else if (value === 'decrease') {
      --this.toBuyItemsQuantity;
    } else if (value = 'amountToRemove') {
      this.toBuyItemsQuantity = this.toBuyItemsQuantity - amountOfitems;
    }
    this.itemsQuantity.next(this.toBuyItemsQuantity);
  }

  checkProductState() {
    const matchedProducts = [];
    for (let i = 0; i < this.products.length; i++) {
      for ( let k = 0; k < this.basketProducts.length; k++) {
        if ( this.products[i].name === this.basketProducts[k].name ) {
          this.products[i].state = 'checked';
          matchedProducts.push(this.products[i]);
        }
      }
    }
  }

  getChosenProduct(id: string) {
    const key = id;
    for ( let i = 0; i < this.products.length; i++) {
       if (key === this.products[i].id) {
          return this.products[i];
       }
    }
  }
}
