import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPhoneNo'
})
export class FilterPhoneNoPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
        return [];
    }
    if (!searchText) {
        return items;
    }

    searchText = searchText.toLowerCase();
    return items.filter(item => item.phoneNo.toLowerCase().includes(searchText));
}

}
