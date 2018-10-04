import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { UserProductsService } from './user-products.service';
import { Subject } from '../../../node_modules/rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  userId: string;
  userEmail = '';
  newUser = false;

  newUserEmail = new Subject<string>();

  constructor(private router: Router,
              private localStorage: LocalStorageService,
              private route: ActivatedRoute,
              private userService: UserProductsService) { }

  signUp(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( (data) => {
        this.userEmail = data.user.email;
        this.userId = data.user.uid;
        this.newUserEmail.next(this.userEmail);
        this.newUser = true;
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => {
              this.token = token;
              this.userService.fetchUserProducts(this.userId);
            }
          );
      });
  }

  signIn(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      this.userEmail = response.user.email;
      this.userId = response.user.uid;
      firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']); }
      );
      return this.userId;
  }).then( () => {
      this.userService.fetchUserProducts(this.userId);
      this.newUserEmail.next(this.userEmail);
  });
  }

  sendToEmail(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken();
  }

  isAuthenticated() {
    return this.token != null;
  }

  logOut() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
    this.userService.clearUserProducts();
  }

}
