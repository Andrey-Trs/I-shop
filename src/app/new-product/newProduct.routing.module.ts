import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewProductComponent } from './new-product.component';
import { SuccessAddedModalComponent } from './success-added-modal/success-added-modal.component';
import { AuthGuard } from '../services/auth-guard.service';

const newProductRoutes: Routes = [
    { path: 'newProduct', component: NewProductComponent, canActivate: [AuthGuard], children: [
        { path: 'successMessage', component: SuccessAddedModalComponent }
    ] },
];

@NgModule({
    imports: [ RouterModule.forChild(newProductRoutes) ],
    exports: [ RouterModule ]
})
export class NewProductRoutingModule {}
