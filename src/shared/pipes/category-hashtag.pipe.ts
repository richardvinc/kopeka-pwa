import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryHashtag',
  standalone: true,
})
export class CategoryHashtagPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'ZEBRA_CROSS':
        return '#ZebraCross';
      case 'SIDEWALK':
        return '#Trotoar';
      case 'PELICAN_CROSSING':
        return '#PelicanCrossing';
      case 'PEDESTRIAN_BRIDGE':
        return '#JPO';
      case 'OTHER':
        return '#Lainnya';
      default:
        return '#Trotoar';
    }
  }
}
