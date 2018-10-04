import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    const config = {
      apiKey: 'AIzaSyDp-22eXzCTOria028PzYpUx_uiezOEwF4',
      authDomain: 'start-project-fa021.firebaseapp.com',
      databaseURL: 'https://start-project-fa021.firebaseio.com',
      projectId: 'start-project-fa021',
      storageBucket: 'start-project-fa021.appspot.com',
      messagingSenderId: '576221507815'
    };
    firebase.initializeApp(config);
  }
}
