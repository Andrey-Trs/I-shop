import { Component, OnInit, Input } from '@angular/core';
import { NewProduct } from '../../shared/new-product';
import { UserProductsService } from '../../services/user-products.service';

@Component({
  selector: 'app-users-products-item',
  templateUrl: './users-products-item.component.html',
  styleUrls: ['./users-products-item.component.css']
})
export class UsersProductsItemComponent implements OnInit {

  @Input() product: NewProduct;
  @Input() index: number;

  constructor( private userService: UserProductsService ) { }

  onDelete() {
    this.userService.deleteProduct(this.product.id);
    this.userService.usersProducts.splice(this.index, 1);
  }

  ngOnInit() {
  }

}
