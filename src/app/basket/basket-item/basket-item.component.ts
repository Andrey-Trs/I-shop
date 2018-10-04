import { Component, OnInit, Input } from '@angular/core';
import { NewProduct } from '../../shared/new-product';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css'],
})
export class BasketItemComponent implements OnInit {
  state = 'normal';

  @Input() productItem: NewProduct;
  @Input() id: number;
  totalPrice: number;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.totalPrice = this.productItem.price * this.productItem.amount;
  }

  onIncrease() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.basketService.updateTotalprice(this.productItem.price, 'increase');
    this.basketService.changeProductAmount(this.id, 'increase');
    this.totalPrice = this.productItem.price * this.productItem.amount;
  }

  onDecrease() {
    if (this.productItem.amount === 1) {
      this.productItem.amount = 1;
    } else {
      this.basketService.updateTotalprice(this.productItem.price, 'decrease');
      this.basketService.changeProductAmount(this.id, 'decrease');
      this.totalPrice = this.productItem.price * this.productItem.amount;
    }
  }

  onRemove() {
    this.basketService.removeItem(this.id);
  }

}
