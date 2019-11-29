import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {

  // {{ name | custom }} => y

  transform(value: string, ...args: any[]): any {
    // return value.substring(0, 1);
    return '฿' + value.replace(/,/g, '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}
