import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { NewProduct } from '../shared/new-product';
import { Subject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProductsService {

  userKey: string;
  usersProducts: NewProduct [] = [];
  addedUsersProducts = new Subject <NewProduct []>();


  constructor() { }

  clearUserProducts() {
    this.usersProducts = [];
  }

  fetchUserProducts(userId) {
    this.userKey = userId;
    const arr = [];
    firebase.database().ref('products/toSellProducts')
    .orderByChild('owner').equalTo(userId).on('child_added', function(snapshot) {
      const prodObj = snapshot.val();
        arr.push(prodObj);
      });
      this.usersProducts = arr;
  }

  deleteProduct(key) {
    firebase.database().ref('products/toSellProducts/' + key).remove();
  }

  updateUsersProduct(title, description, price, key, images, category, owner, comments) {
    const updatedProduct = {
      name: title,
      description: description,
      price: price,
      id: key,
      images: images,
      category: category,
      owner: owner,
      comments: comments
    };
    const product = {};
    product['/products/toSellProducts/' + key] = updatedProduct;
    firebase.database().ref().update(product);
  }

  }


