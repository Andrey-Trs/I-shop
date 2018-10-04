import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  category = new Subject<string>();
  searchProduct = new Subject<string>();

  constructor() { }
}
