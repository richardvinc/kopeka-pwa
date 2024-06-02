import 'moment/locale/id';

import moment from 'moment';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromNow',
  standalone: true,
})
export class FromNowPipe implements PipeTransform {
  transform(value: string): string {
    moment.locale('id');
    return moment(value).fromNow();
  }
}
