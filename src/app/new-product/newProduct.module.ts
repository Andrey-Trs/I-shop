import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewProductRoutingModule } from './newProduct.routing.module';

import { NewProductComponent } from './new-product.component';
import { SuccessAddedModalComponent } from './success-added-modal/success-added-modal.component';

@NgModule({
    declarations: [
        NewProductComponent,
        SuccessAddedModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NewProductRoutingModule
    ]
})
export class NewProductModule {}
