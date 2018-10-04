import { Injectable, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { NewProduct } from '../shared/new-product';
import { Subject } from '../../../node_modules/rxjs';
import { UserProductsService } from './user-products.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  toBucketProduct = new EventEmitter<string>();

  imagesUrl = [];
  chosenObj: NewProduct;
  product = new  Subject <NewProduct>();

  constructor( private userService: UserProductsService,
               private authService: AuthService) { }


  addNewProduct( name: string, category: string, description: string, price: number, images,  userKey, key) {
     const productTitle = {};
     const productDescription = {};
     const productCategory = {};
     const productPrice = {};
     const productKey = {};
     const productOwner = {};
     productTitle['/products/toSellProducts/' + key + '/name'] = name;
     productDescription['/products/toSellProducts/' + key + '/description'] = description;
     productCategory['/products/toSellProducts/' + key + '/category'] = category;
     productPrice['/products/toSellProducts/' + key + '/price'] = price;
     productOwner['/products/toSellProducts/' + key + '/owner'] = userKey;
     productKey['/products/toSellProducts/' + key + '/id'] = key;
     firebase.database().ref().update(productTitle);
     firebase.database().ref().update(productDescription);
     firebase.database().ref().update(productCategory);
     firebase.database().ref().update(productPrice);
     firebase.database().ref().update(productKey);
     firebase.database().ref().update(productOwner);
   }


   addPhoto(name: string, category: string, description: string, price: number, images, userKey) {
    this.authService.newUser = false;
    const userId = this.authService.userId;
    const key = firebase.database().ref('products/toSellProducts').push().key;
    images.forEach( img => {
      if (img.file) {
        const date = new Date().getTime();
        const ref = firebase.storage().ref(`Product_images/${date}`);
        ref.put(img.file).on('state_changed',
        () => {},
        () => {},
        () => {
          ref.getDownloadURL().then(url => {
              this.imagesUrl.push(url);
              const products = {};
              products['/products/toSellProducts/' + key + '/images'] = this.imagesUrl;
              firebase.database().ref().update(products).then(
                () => {
                  this.addNewProduct(name, category, description, price, images, userKey, key);
                });
          });
        });
    }});
    return this.imagesUrl = [];
  }

}
