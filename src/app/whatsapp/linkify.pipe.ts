import { Pipe, PipeTransform } from '@angular/core';
import { WhatsappServiceService } from './service/whatsapp-service.service';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

// transform(value: string): string {
//   if (!value) return value;

//   // Regular expression to find URLs
//   const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
//   const wwwPattern = /(^|[^\/])(www\.[\S]+(\b|$))/ig;

//   // Regular expression to find email addresses
//   const emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/ig;

//   // Replace URLs with anchor tags
//   let transformedText = value
//     .replace(urlPattern, '<a href="$1" target="_blank">$1</a>')
//     .replace(wwwPattern, '$1<a href="http://$2" target="_blank">$2</a>');

//   // Replace email addresses with mailto links and add a click event
//   transformedText = transformedText.replace(emailPattern, (match) => {
//     // return `<a class="email-link" data-email="${match}">${match}</a>`;
//     return `<span style="padding: 8px 8px 0px 8px;">
//   <a  class="email-link" data-email="${match}">${match}</a>
// </span>`;
//   });

//   return transformedText;
// }
transform(value: string): string {
  if (!value) return value;

  // Regular expression to find URLs
  const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  const wwwPattern = /(^|[^\/])(www\.[\S]+(\b|$))/ig;

  // Regular expression to find email addresses
  const emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/ig;

  // Regular expressions for bold, italic, strikethrough, and other text formatting
  const boldPattern = /\*(.*?)\*/g;          // *text* => <b>text</b>
  const italicPattern = /_(.*?)_/g;          // _text_ => <i>text</i>
  const strikethroughPattern = /~(.*?)~/g;   // ~text~ => <s>text</s>
  const underlinePattern = /__(.*?)__/g;     // __text__ => <u>text</u>
  const codePattern = /`(.*?)`/g;            // `text` => <code>text</code>

  // Replace URLs with anchor tags
  let transformedText = value
    .replace(urlPattern, '<a href="$1" target="_blank">$1</a>')
    .replace(wwwPattern, '$1<a href="http://$2" target="_blank">$2</a>');

  // Replace email addresses with mailto links and add a click event
  transformedText = transformedText.replace(emailPattern, (match) => {
    return `<span style="padding: 8px 8px 0px 8px;">
      <a class="email-link" data-email="${match}">${match}</a>
    </span>`;
  });

  // Replace *text* with <b>text</b> for bold formatting
  transformedText = transformedText.replace(boldPattern, '<b>$1</b>');

  // Replace _text_ with <i>text</i> for italic formatting
  transformedText = transformedText.replace(italicPattern, '<i>$1</i>');

  // Replace ~text~ with <s>text</s> for strikethrough formatting
  transformedText = transformedText.replace(strikethroughPattern, '<s>$1</s>');

  // Replace __text__ with <u>text</u> for underline formatting
  transformedText = transformedText.replace(underlinePattern, '<u>$1</u>');

  // Replace `text` with <code>text</code> for inline code formatting
  transformedText = transformedText.replace(codePattern, '<code>$1</code>');

  return transformedText;
}

}