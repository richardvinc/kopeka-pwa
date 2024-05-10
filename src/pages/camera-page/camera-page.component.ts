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
  isCameraReady: boolean = false;
  allowRetake: boolean = false;
  srcObject: MediaStream | undefined = undefined;
  src: string | undefined = undefined;

  videoWidth = 0;

  constructor(private router: Router, private reportService: ReportService) {}

  async ngOnInit() {
    this.videoWidth =
      this.cameraContainer?.nativeElement.offsetWidth || window.innerWidth;

    if (this.video) {
      this.video.nativeElement.height = this.videoWidth;
      this.video.nativeElement.width = this.videoWidth;
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        height: this.videoWidth,
        width: this.videoWidth,
        facingMode: {
          ideal: 'environment',
        },
        aspectRatio: {
          exact: 1,
        },
      },
      audio: false,
    });
    this.srcObject = stream;
    this.isCameraReady = true;
  }

  takePhoto() {
    if (this.canvas) {
      this.canvas.nativeElement.height = this.videoWidth;
      this.canvas.nativeElement.width = this.videoWidth;
    }
    const context = this.canvas?.nativeElement.getContext('2d');
    if (context && this.video?.nativeElement) {
      context.drawImage(
        this.video.nativeElement,
        0,
        0,
        this.videoWidth,
        this.videoWidth
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
    this.stopCamera();

    // if there is a history, go back
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/explore']);
    }
  }

  stopCamera() {
    if (this.video) {
      // stop video
      this.video.nativeElement.srcObject = null;
      // stop stream
      this.srcObject?.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  useImage() {
    this.reportService.setImageData(this.src);
    this.stopCamera();
    this.router.navigate(['/report']);
  }
}
