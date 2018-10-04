import { Component, OnInit } from '@angular/core';
import { UserProductsService } from '../../services/user-products.service';
import { NewProduct } from '../../shared/new-product';

@Component({
  selector: 'app-users-products',
  templateUrl: './users-products.component.html',
  styleUrls: ['./users-products.component.css'],
})
export class UsersProductsComponent implements OnInit {
  userProducts: NewProduct[] = [];

  constructor( private userService: UserProductsService ) { }

  ngOnInit() {
    this.userProducts = this.userService.usersProducts;
  }

}
