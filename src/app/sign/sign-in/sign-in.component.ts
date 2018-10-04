import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../../services/auth.service';
import { formAppearence } from '../../animations/animations';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  animations: [ formAppearence]
})
export class SignInComponent implements OnInit {
  @ViewChild('email') email: ElementRef;

  token: string;

  wrongUserEmail =  false;
  wrongUserPass = false;
  forgotMenu = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignIn(f: NgForm) {
    const { email, pass } = f.value;
    this.authService.signIn(email, pass)
    .catch(error => {
     if (error.code === 'auth/wrong-password') {
      this.wrongUserPass = true;
     }
     if (error.code === 'auth/user-not-found') {
      this.wrongUserEmail = true;
     }
    });
    setTimeout(() => {this.wrongUserEmail = false; this.wrongUserPass = false; }, 5000);
  }

  sendNewPass() {
    const userEmail = this.email.nativeElement.value;
    this.authService.sendToEmail(userEmail);
  }

}
