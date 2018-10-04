import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductItemComponent } from './product-item/product-item.component';

const productsRoutes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'products/:id', component: ProductItemComponent },
];


@NgModule({
    imports: [
        RouterModule.forChild(productsRoutes)
    ],
    exports: [RouterModule]
})
export class ProductRoutingModule {}
