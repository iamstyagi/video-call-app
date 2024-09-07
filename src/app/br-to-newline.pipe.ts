import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brToNewline'
})
export class BrToNewlinePipe implements PipeTransform {
  transform(value: string): string {
    // Replace <br> tags with newline characters (\n)
    return value.replace(/<br\s*\/?>/gi, '\n');
  }
}
