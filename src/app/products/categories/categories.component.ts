import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { slideOneByOne } from '../../animations/animations';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  animations: [ slideOneByOne ]
})
export class CategoriesComponent implements OnInit {
  @ViewChild('toFindProduct') name: ElementRef;
  isActive = false;

  categories = ['All categories', 'Animals', 'Books', 'Clothes', 'Electronics',  'Furniture',  'Sports & entertainment'];

  constructor( private filterService: FilterService ) { }

  chosenCategory(category) {
    this.filterService.category.next(category);
    this.filterService.searchProduct.next('');
  }

  findProduct() {
    const searchItem = this.name.nativeElement.value;
    this.filterService.searchProduct.next(searchItem);
    this.name.nativeElement.value = '';
  }

  ngOnInit() {
  }
}
