import { NgModule } from '../../node_modules/@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProductsModule } from './user/userProducts.module';
import { NewProductModule } from './new-product/newProduct.module';

import { SignInComponent } from './sign/sign-in/sign-in.component';
import { SignUpComponent } from './sign/sign-up/sign-up.component';
import { BasketComponent } from './basket/basket.component';




const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    // { path: 'userProducts', loadChildren: () => UserProductsModule},
    // { path: 'newProduct', loadChildren: () => NewProductModule},
    { path: 'signIn', component: SignInComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'basket', component: BasketComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
