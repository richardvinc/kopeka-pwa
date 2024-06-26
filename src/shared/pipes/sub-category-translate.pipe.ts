import { Pipe, PipeTransform } from '@angular/core';
import { ReportUtils } from '@app/libs/reports/utils/report.utils';

@Pipe({
  name: 'subCategoryTranslate',
  standalone: true,
})
export class SubCategoryTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return ReportUtils.translateSubCategory(value);
  }
}
