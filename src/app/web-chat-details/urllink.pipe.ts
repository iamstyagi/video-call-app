import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkifyurl'
})
export class LinkifyUrlPipe implements PipeTransform {
  // transform(value: string): string {
  //   if (!value) {
  //     return value;
  //   }

  //   const urlPattern = /((https?:\/\/|www\.)[^\s]+)/g;
  //   return value.replace(urlPattern, (url:any) => {
  //     const fullUrl = url.startsWith('www.') ? `http://${url}` : url;
  //     return `${window.open(url,'_blank')}`;
  //     // return `<a href="${fullUrl}" target="_blank">${url}</a>`;
  //   });
  // }
  transform(value: string): string {
    if (!value) return value;

    // Regular expression to find URLs
    const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const wwwPattern = /(^|[^\/])(www\.[\S]+(\b|$))/ig;

    // Replace URLs with anchor tags
    const transformedText = value
      .replace(urlPattern, '<a href="$1" target="_blank">$1</a>')
      .replace(wwwPattern, '$1<a href="http://$2" target="_blank">$2</a>');

    return transformedText !== value ? transformedText : value;
  }
}
