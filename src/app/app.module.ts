import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './sign/auth.module';
import { CoreModule } from './core/core.module';
import { BasketModule } from './basket/basket.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment.prod';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { Ng2Webstorage } from 'ngx-webstorage';
import { AuthGuard } from './services/auth-guard.service';
import { NewProductModule } from './new-product/newProduct.module';
import { UserProductsModule } from './user/userProducts.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsModule,
    AuthModule,
    CoreModule,
    BasketModule,
    NewProductModule,
    UserProductsModule,
    AppRoutingModule,
    Angular2FontawesomeModule,
    Ng2Webstorage,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment),
    AngularFireDatabaseModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
