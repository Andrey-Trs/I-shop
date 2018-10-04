import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Subject } from '../../../node_modules/rxjs';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  currentDate: string;
  commentsArr: Object[];

  addedComments = new Subject <Object[]>();
  newComment = new Subject <Object>();
  changeMode = new Subject <any>();

  constructor( private httpClient: HttpClient) { }

  sortByDate(a, b) {
      return new Date (b.date).getTime() - new Date(a.date).getTime();
  }

  addNewComment(name, comment, productKey) {
    const key = firebase.database().ref('products/toSellProducts/' + productKey + '/comments').push().key;
    const newComment = {
      name: name,
      comment: comment,
      date: new Date()
    };
    const products = {};
    products['products/toSellProducts/' + productKey + '/comments/' + key] = newComment;
    firebase.database().ref().update(products);
    this.newComment.next(newComment);
  }

  fetchProductComments(productKey) {
    // tslint:disable-next-line:max-line-length
    this.httpClient.get<string[]>('https://start-project-fa021.firebaseio.com/products/toSellProducts/' + productKey + '/comments.json')
    .map(
      (comments) => {
        return comments;
      }
    )
    .subscribe(
      (comments: string[]) => {
        const allComments = [];
        if (comments) {
          const keys = Object.keys(comments);
          for (const key of keys) {
            allComments.push({
              name: comments[key].name,
              date: comments[key].date,
              comment: comments[key].comment
            });
          }
        }
        this.commentsArr = allComments.sort(this.sortByDate);
        console.log(this.commentsArr);
        this.addedComments.next(this.commentsArr);
      }
    );
  }



}
