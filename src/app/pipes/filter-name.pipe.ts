import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterName',
  pure: false
})
export class FilterNamePipe implements PipeTransform {

  constructor() {
  }

  transform(productsList: any[], nameToFind: string): any {
    if (nameToFind === '') {
      return productsList;
    }

    return productsList.filter(product => {

      if (product.name.toLowerCase().includes(nameToFind.toLowerCase())) {
        return product;
      }
    });
  }

}
