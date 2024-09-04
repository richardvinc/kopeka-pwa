import { environment } from 'src/environments/environment';

import { CommonModule, Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { REPORT_SUB_CATEGORIES } from '@app/libs/reports/interfaces/report.interface';
import { ReportFormService } from '@app/libs/reports/report-form.service';
import { ReportUtils } from '@app/libs/reports/utils/report.utils';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';
import {
  NotificationService,
  NotificationType,
} from '@app/shared/services/notification/notification.service';

@Component({
  selector: 'app-report-form-page',
  standalone: true,
  templateUrl: './report-form-page.component.html',
  imports: [CommonModule, ReactiveFormsModule, GoogleMap, MapMarker],
})
export class ReportFormPageComponent {
  // map properties
  @ViewChild('googleMap') mapRef: GoogleMap | undefined = undefined;
  mapId = environment.googleMapId;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 17;
  mapOption: google.maps.MapOptions = {
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    clickableIcons: false,
    gestureHandling: 'greedy',
  };
  markerOption: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false,
  };
  userPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  // form properties
  isSubmitting = false;
  isSubCategoryAllowed = true;
  isCategoryOtherSelected = false;
  isSubCategoryOtherSelected = false;
  reportForm: FormGroup = new FormGroup({
    category: new FormControl('', Validators.required),
    categoryRemark: new FormControl(''),
    subCategories: new FormControl(['']),
    subCategoryRemark: new FormControl(''),
    condition: new FormControl('', Validators.required),
  });

  categories: { id: string; name: string; selected: boolean }[] = [
    { id: 'SIDEWALK', name: 'Trotoar', selected: false },
    { id: 'ZEBRA_CROSS', name: 'Zebra Cross', selected: false },
    { id: 'PELICAN_CROSSING', name: 'Pelican Crossing', selected: false },
    { id: 'PEDESTRIAN_BRIDGE', name: 'JPO', selected: false },
    { id: 'OTHER', name: 'Lainnya', selected: false },
  ];
  subCategoryEntries: { id: string; name: string; selected: boolean }[] = [];
  imageData: string | undefined = undefined;

  constructor(
    private appConfigService: AppConfigService,
    private reportFormService: ReportFormService,
    private router: Router,
    private notificationService: NotificationService,
    private location: Location
  ) {
    this.appConfigService.setPageTitle('Buat Laporan Baru');
    this.reportFormService.$imageData().subscribe((data) => {
      if (!data) {
        this.router.navigate(['/explore']);
      }
      this.imageData = data;
    });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.userPosition = this.center;
      },
      alert,
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 15000,
      }
    );
  }

  // form getters
  get condition(): string {
    return this.reportForm.get('condition')?.value;
  }
  get category(): string {
    return this.reportForm.get('category')?.value;
  }
  get categoryRemark(): string {
    return this.reportForm.get('categoryRemark')?.value;
  }
  get subCategories(): string[] {
    return this.reportForm.get('subCategories')?.value;
  }
  get subCategoryRemark(): string {
    return this.reportForm.get('subCategoryRemark')?.value;
  }

  onCenterChanged() {
    this.userPosition = {
      lat: this.mapRef!.getCenter()?.lat() || this.userPosition.lat,
      lng: this.mapRef!.getCenter()?.lng() || this.userPosition.lng,
    };
  }

  retakePhoto() {
    // navigate back to camera page
    this.location.back();
  }

  toggleSubCategory() {
    this.isSubCategoryAllowed = !this.isSubCategoryAllowed;
  }

  selectSubCategory(id: string) {
    const selected = this.subCategoryEntries
      .map((sc) => {
        if (sc.id === id) {
          sc.selected = !sc.selected;
        }
        return sc;
      })
      .filter((sc) => sc.selected);

    this.isSubCategoryOtherSelected = selected.some((sc) =>
      sc.id.endsWith('OTHER')
    );

    this.reportForm.controls['subCategories'].setValue(
      selected.map((sc) => sc.id)
    );
  }

  selectCategory(id: string) {
    this.isSubCategoryOtherSelected = false;

    this.categories.map((category) => {
      if (category.id === id) {
        if (category.id === 'OTHER') {
          this.isCategoryOtherSelected = true;
        } else {
          this.isCategoryOtherSelected = false;
        }
        category.selected = true;
        this.reportForm.controls['category'].setValue(category.id);
      } else {
        category.selected = false;
      }
    });

    this.setSubCategories();
  }

  selectCondition(condition: 'GOOD' | 'BAD') {
    this.reportForm.controls['condition'].setValue(condition);
    this.setSubCategories();
  }

  submitForm() {
    this.cleanFormValue();

    this.isSubmitting = true;
    this.reportFormService
      .submitReport({
        category: this.category,
        condition: this.condition,
        categoryRemark: this.categoryRemark,
        subCategories: this.subCategories,
        subCategoryRemark: this.subCategoryRemark,
        latitude: this.userPosition.lat,
        longitude: this.userPosition.lng,
      })
      .subscribe({
        next: (response) => {
          this.notificationService.showNotification(
            'Laporan berhasil dikirim!',
            NotificationType.SNACKBAR_SUCCESS
          );
          this.router.navigate(['/explore']);
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error submitting report:', error);
          this.notificationService.showNotification(
            'Laporan gagal dikirim. Silakan coba lagi.',
            NotificationType.SNACKBAR_ERROR
          );
          this.isSubmitting = false;
        },
      });
  }

  private setSubCategories() {
    switch (this.category) {
      case 'SIDEWALK':
        this.subCategoryEntries =
          this.condition === 'GOOD'
            ? this.buildSubCategories([...REPORT_SUB_CATEGORIES.SIDEWALK.GOOD])
            : this.buildSubCategories([...REPORT_SUB_CATEGORIES.SIDEWALK.BAD]);
        break;
      case 'ZEBRA_CROSS':
        this.subCategoryEntries =
          this.condition === 'GOOD'
            ? this.buildSubCategories([
                ...REPORT_SUB_CATEGORIES.ZEBRA_CROSS.GOOD,
              ])
            : this.buildSubCategories([
                ...REPORT_SUB_CATEGORIES.ZEBRA_CROSS.BAD,
              ]);
        break;
      case 'PELICAN_CROSSING':
        this.subCategoryEntries =
          this.condition === 'GOOD'
            ? this.buildSubCategories([
                ...REPORT_SUB_CATEGORIES.PELICAN_CROSSING.GOOD,
              ])
            : this.buildSubCategories([
                ...REPORT_SUB_CATEGORIES.PELICAN_CROSSING.BAD,
              ]);
        break;
      case 'PEDESTRIAN_BRIDGE':
        this.subCategoryEntries =
          this.condition === 'GOOD'
            ? this.buildSubCategories([
                ...REPORT_SUB_CATEGORIES.PEDESTRIAN_BRIDGE.GOOD,
              ])
            : this.buildSubCategories([
                ...REPORT_SUB_CATEGORIES.PEDESTRIAN_BRIDGE.BAD,
              ]);
        break;
      case 'OTHER':
        this.subCategoryEntries =
          this.condition === 'GOOD'
            ? this.buildSubCategories([...REPORT_SUB_CATEGORIES.OTHER.GOOD])
            : this.buildSubCategories([...REPORT_SUB_CATEGORIES.OTHER.BAD]);
        break;
      default:
        this.subCategoryEntries = [];
        break;
    }
  }

  private cleanFormValue() {
    // we don't need category remark if category is not 'OTHER'
    if (!this.isCategoryOtherSelected) {
      this.reportForm.controls['categoryRemark'].setValue(undefined);
    }
    if (!this.isSubCategoryOtherSelected) {
      this.reportForm.controls['subCategoryRemark'].setValue(undefined);
    }

    // if sub category remark is empty and user choose OTHER, remove it from the form value
    if (this.isSubCategoryOtherSelected && !this.subCategoryRemark) {
      this.reportForm.controls['subCategories'].setValue(
        this.subCategories.filter((sc) => sc !== 'OTHER')
      );
    }
  }

  private buildSubCategories(
    values: string[]
  ): { id: string; name: string; selected: boolean }[] {
    return values.map((value) => {
      return {
        id: value,
        name: ReportUtils.translateSubCategory(value),
        selected: false,
      };
    });
  }
}
