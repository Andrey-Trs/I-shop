import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProductsRoutingModule } from './userProducts.routing.module';

import { UsersProductsComponent } from './users-products/users-products.component';
import { UsersProductsItemComponent } from './users-products-item/users-products-item.component';
import { UserProductEditComponent } from './user-product-edit/user-product-edit.component';




@NgModule({
    declarations: [
        UsersProductsComponent,
        UsersProductsItemComponent,
        UserProductEditComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        UserProductsRoutingModule
    ]
})
export class UserProductsModule {}
