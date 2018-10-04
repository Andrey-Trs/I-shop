import { Component, OnInit} from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '../../../node_modules/@angular/router';
import { slideUp } from '../animations/animations';
import { UserProductsService } from '../services/user-products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  animations: [ slideUp ]
})
export class NewProductComponent implements OnInit {

  categories = ['Animals', 'Books', 'Clothes', 'Electronics',  'Furniture',  'Sports & entertainment'];
  images = [];
  base64Images = [];
  userKey: string;

  constructor(
              private productService: ProductService,
              private router: Router,
              private userService: UserProductsService) {}

  ngOnInit() {
    this.userKey = this.userService.userKey;
  }

  onAdd( productForm: NgForm) {
    const { newName, newDescription, newPrice, categories } = productForm.value;
    const newImages = this.images;
    this.productService.addPhoto(newName, categories, newDescription, newPrice, newImages, this.userKey);
    productForm.reset();
    this.images = [];
    this.router.navigate(['/newProduct/successMessage']);
  }

  onAddImg(event) {
    const file = event.srcElement.files;
    if (file[0]) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = ($event: any) => {
          const imgUrl = $event.target.result;
          this.base64Images.push(imgUrl);
          this.images.push({
            imgUrl, file: file[0]});
        };
      reader.readAsDataURL(event.target.files[0]);
      }
    }
  }
}
