import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categories',
  pure: false
})
export class CategoriesPipe implements PipeTransform {

  transform(value: any, chosenCategory: string): any {
    if (chosenCategory === 'All categories') {
      return value;
    }
    const resultArray = [];
    const propName = 'category';
    for (const item of value) {
      if (item[propName] === chosenCategory) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
