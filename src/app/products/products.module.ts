import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './products.routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { ProductsComponent } from './products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductImagesComponent } from './product-images/product-images.component';
import { CommentsComponent } from './comments/comments.component';
import { NewCommentComponent } from './comments/new-comment/new-comment.component';
import { CategoriesComponent } from './categories/categories.component';
import { FilterNamePipe } from '../pipes/filter-name.pipe';
import { CategoriesPipe } from '../pipes/categories.pipe';
import { FormsModule } from '@angular/forms';




@NgModule({
    declarations: [
        ProductsComponent,
        ProductItemComponent,
        ProductImagesComponent,
        CommentsComponent,
        NewCommentComponent,
        CategoriesComponent,
        FilterNamePipe,
        CategoriesPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ProductRoutingModule,
        NgxPaginationModule,
        Ng2CarouselamosModule,
    ]
})
export class ProductsModule {}
