import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersProductsComponent } from './users-products/users-products.component';
import { AuthGuard } from '../services/auth-guard.service';
import { UserProductEditComponent } from './user-product-edit/user-product-edit.component';


const userProductsRoutes: Routes = [
    { path: 'userProducts', component: UsersProductsComponent, canActivate: [AuthGuard] },
    { path: 'userProducts/:id', component: UserProductEditComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(userProductsRoutes) ],
    exports: [ RouterModule ]
})
export class UserProductsRoutingModule {}
