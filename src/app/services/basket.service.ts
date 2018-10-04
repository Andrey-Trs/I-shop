import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';
import * as firebase from 'firebase';
import { NewProduct } from '../shared/new-product';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { DataStorageService } from './data-storage.service';


@Injectable({
  providedIn: 'root'
})
export class BasketService {
  newTotalPrice = new Subject<number>();
  toBuyProducts = new Subject<NewProduct[]>();
  userKey: string;
  chosenProducts: NewProduct[];
  totalPrice = 0;

  constructor(private localStorage: LocalStorageService, private httpClient: HttpClient, private dataStorage: DataStorageService) { }

  toMyBasket(chosenProduct) {
    const checkKey = this.localStorage.retrieve('userKey');
    if (checkKey === null) {
      this.createNewShoppingBasket(chosenProduct);
    } else {
      this.addToCurrentShoppingBasket(chosenProduct, checkKey);
    }
  }

  createNewShoppingBasket(toBasketProduct: NewProduct) {
    this.userKey = firebase.database().ref().child('shoppingBasket').push().key;
    this.localStorage.store('userKey', this.userKey);
    firebase.database().ref('products/shoppingBasket/' + this.userKey).push(toBasketProduct);
  }

  addToCurrentShoppingBasket(toBasketProduct: NewProduct, path) {
    firebase.database().ref('products/shoppingBasket/' + path).push(toBasketProduct);
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
        this.chosenProducts = basketArr;
        this.countTotalPrice();
        this.toBuyProducts.next(this.chosenProducts);
      }
    );
  }

  countTotalPrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.chosenProducts.length; i++) {
      this.totalPrice += (this.chosenProducts[i].price * this.chosenProducts[i].amount);
    }
  }

  changeProductAmount(index, update) {
    const toUpdateProductKey = this.chosenProducts[index].id;
    if (update === 'increase') {
       ++this.chosenProducts[index].amount;
       this.dataStorage.changeBasketAmount('increase');
    } else {
       --this.chosenProducts[index].amount;
       this.dataStorage.changeBasketAmount('decrease');
    }
    this.updateProductInDB(toUpdateProductKey, index);
  }

  updateProductInDB(productKey, index) {
    const bucketKey = this.localStorage.retrieve('userKey');
    const updatedProduct = this.chosenProducts[index];
    firebase.database().ref('products/shoppingBasket/' + bucketKey + '/' + productKey).set(updatedProduct);
  }

  updateTotalprice(price, update) {
    if (update === 'increase') {
      this.totalPrice += price;
    } else {
      this.totalPrice -= price;
    }
    this.newTotalPrice.next(this.totalPrice);
  }

  removeItem(index) {
    const sumToSubstract = (this.chosenProducts[index].amount * this.chosenProducts[index].price);
    this.dataStorage.changeBasketAmount('amountToRemove', this.chosenProducts[index].amount );
    const localKey = this.localStorage.retrieve('userKey');
    const itemKey = this.chosenProducts[index].id;
    this.totalPrice  = this.totalPrice - sumToSubstract;
    this.chosenProducts.splice(index, 1);
    firebase.database().ref('products/shoppingBasket/' + localKey + '/' + itemKey).remove();
    this.newTotalPrice.next(this.totalPrice);
  }
}
