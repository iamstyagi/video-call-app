import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchvalue'
})
export class SearchvaluePipe implements PipeTransform {


  transform(items: any[], searchText: string): any[] {
    if (!items) {
        return [];
    }
    if (!searchText) {
        return items;
    }

    searchText = searchText.toLowerCase();
    return items.filter(item => item.phoneNumber.toLowerCase().includes(searchText));
}

}
