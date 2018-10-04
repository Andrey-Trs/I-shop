import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../../services/auth.service';
import { formAppearence } from '../../animations/animations';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [ formAppearence ]
})
export class SignUpComponent implements OnInit {
  @ViewChild('pass') userPass: ElementRef;

  public signUpForm: FormGroup;

  reservedEmail = false;

  constructor( private authService: AuthService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'pass': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirmation': new FormControl(null, [Validators.compose([Validators.required, this.confirmPass.bind(this)])])
    });
  }

  private confirmPass(control: FormControl): {[p: string]: boolean} {
    const value = this.userPass.nativeElement.value;
    if (control.value !== value) {
      return {'mistake': true};
    }
    return null;
  }

  onSubmit() {
    const userEmail = this.signUpForm.value.email;
    const userPass = this.signUpForm.value.pass;
    this.authService.signUp(userEmail, userPass)
    .catch( error => {
      console.log(error.code);
    if (error.code === 'auth/email-already-in-use') {
        this.reservedEmail = true;
    }
  });
  this.signUpForm.reset();
  setTimeout(() => {this.reservedEmail = false; }, 3000);
  }
}
