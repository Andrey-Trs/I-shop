import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '../../../../node_modules/@angular/router';
import { UserProductsService } from '../../services/user-products.service';
import { NewProduct } from '../../shared/new-product';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-user-product-edit',
  templateUrl: './user-product-edit.component.html',
  styleUrls: ['./user-product-edit.component.css']
})
export class UserProductEditComponent implements OnInit {
   id: string;
   categories = ['Animals', 'Books', 'Clothes', 'Electronics',  'Furniture',  'Sports & entertainment'];
   retrievedObj: NewProduct;

   onRemove(i: number) {
     if (this.retrievedObj.images.length > 1) {
      this.retrievedObj.images.splice(i, 1);
     }
   }


  constructor( private route: ActivatedRoute,
               private userService: UserProductsService,
               private db: AngularFireDatabase,
               private router: Router ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.db.object('products/toSellProducts/' + this.id).valueChanges()
                   .subscribe((product: NewProduct) => {
                    this.retrievedObj = product;
                    console.log(this.retrievedObj);
                   });
      });
  }

  saveChanges( editForm: NgForm) {
      const { title, description, price, categories } = editForm.value;
      // tslint:disable-next-line:max-line-length
      this.userService.updateUsersProduct(title, description, price, this.id, this.retrievedObj.images, categories, this.retrievedObj.owner, this.retrievedObj.comments);
      this.router.navigate(['/products']);
  }

}
