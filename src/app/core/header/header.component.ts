import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';
import { Subscription } from '../../../../node_modules/rxjs';
import { DataStorageService } from '../../services/data-storage.service';
import { slideDown, slideRight } from '../../animations/animations';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [ slideDown, slideRight]
})


export class HeaderComponent implements OnInit, OnDestroy {

  userEmail = '';
  quantitySubscription: Subscription;
  toBuyItemsQuantity: number;
  isExpanded = false;
  openedUserMenu = false;

  setAuthView = {
    expandedBox: !this.isExpanded
  };

  changeState() {
    this.isExpanded = !this.isExpanded;
  }

  changeUserMenuState() {
    this.openedUserMenu = !this.openedUserMenu;
  }

  constructor(public authService: AuthService,
              private router: Router,
              private dataStorage: DataStorageService,
              private filterService: FilterService ) { }

  ngOnInit() {
    this.dataStorage.fetchBasketproducts();
    this.quantitySubscription = this.dataStorage.itemsQuantity.subscribe(
      (quantity: number) => {
        this.toBuyItemsQuantity = quantity;
      }
    );
    this.authService.newUserEmail.subscribe(
      (email) => {
        this.userEmail = email;
        console.log(this.userEmail);
      }
    );
  }

  onMainPage() {
    this.router.navigate(['/products']);
    this.filterService.searchProduct.next('');
    this.filterService.category.next('All categories');
  }

  onExit() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.quantitySubscription.unsubscribe();
  }

}
