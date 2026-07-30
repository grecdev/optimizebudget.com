import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatName',
})
export class FormatNamePipe implements PipeTransform {
  transform(value: string): string {
    const VALUE_FORMATTED = value
      .split(' ')
      .slice(0, 2)
      .map(item => item[0])
      .join('');

    return VALUE_FORMATTED;
  }
}
