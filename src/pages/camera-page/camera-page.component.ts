import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '@app/shared/services/report/report.service';

@Component({
  selector: 'app-camera-page',
  standalone: true,
  templateUrl: './camera-page.component.html',
})
export class CameraPageComponent implements OnInit {
  @ViewChild('cameraContainer') cameraContainer:
    | ElementRef<HTMLDivElement>
    | undefined = undefined;
  @ViewChild('video') video: ElementRef<HTMLVideoElement> | undefined =
    undefined;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | undefined =
    undefined;
  @ViewChild('photo') photo: ElementRef<HTMLImageElement> | undefined =
    undefined;
  videoHidden: boolean = false;
  imgHidden: boolean = true;
  allowRetake: boolean = false;
  srcObject: MediaStream | undefined = undefined;
  src: string | undefined = undefined;

  videoWidth = 0;
  videoHeight = 0;

  constructor(private router: Router, private reportService: ReportService) {}

  async ngOnInit() {
    this.videoHeight = window.innerHeight;
    this.videoWidth =
      this.cameraContainer?.nativeElement.offsetWidth || window.innerWidth;

    if (this.video) {
      this.video.nativeElement.height = this.videoHeight;
      this.video.nativeElement.width = this.videoWidth;
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        height: this.videoHeight,
        width: this.videoWidth,
      },
      audio: false,
    });
    this.srcObject = stream;
  }

  takePhoto() {
    if (this.canvas) {
      this.canvas.nativeElement.height = this.videoHeight;
      this.canvas.nativeElement.width = this.videoWidth;
    }
    const context = this.canvas?.nativeElement.getContext('2d');
    if (context && this.video?.nativeElement) {
      context.drawImage(
        this.video.nativeElement,
        0,
        0,
        this.videoWidth,
        this.videoHeight
      );
    }

    const data = this.canvas?.nativeElement.toDataURL('image/png');
    this.src = data;
    this.video?.nativeElement.pause();
    this.videoHidden = true;
    this.imgHidden = false;
    this.allowRetake = true;
  }

  retake() {
    this.allowRetake = false;
    this.videoHidden = false;
    this.video?.nativeElement.play();
    this.imgHidden = true;
    this.src = undefined;
  }

  navigateAway() {
    if (this.video) {
      // stop video
      this.video.nativeElement.srcObject = null;
      // stop stream
      this.srcObject?.getTracks().forEach((track) => {
        track.stop();
      });
    }

    // if there is a history, go back
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/explore']);
    }
  }

  useImage() {
    this.reportService.setImageData(this.src);
    this.router.navigate(['/report']);
  }
}
