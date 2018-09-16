import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  HostListener
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-viewer',
  templateUrl: 'image-viewer.component.html',
  styleUrls: ['image-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageViewerComponent implements AfterViewInit {
  @ViewChild('container')
  containerRef: ElementRef;

  private get imageContainer() {
    return this.containerRef.nativeElement as HTMLElement;
  }

  @ViewChild('image')
  imageRef: ElementRef;

  private get displayImage() {
    return this.imageRef.nativeElement as HTMLImageElement;
  }

  public url: SafeUrl;

  private imageWidth;
  private imageHeight;

  private minScale = 1;
  private maxScale = 4;

  private containerWidth;
  private containerHeight;

  private displayImageX = 0;
  private displayImageY = 0;
  private displayImageScale = 1;

  private displayDefaultWidth;
  private displayDefaultHeight;

  private rangeX = 0;
  private rangeMaxX = 0;
  private rangeMinX = 0;

  private rangeY = 0;
  private rangeMaxY = 0;
  private rangeMinY = 0;

  private displayImageCurrentX = 0;
  private displayImageCurrentY = 0;
  private displayImageCurrentScale = 1;

  @Input()
  set image(image: string) {
    if (!image) {
      this.unsetAll();
    } else {
      this.url = this.sanitizer.bypassSecurityTrustUrl(image);
      this.setImage();
      this.resizeContainer();
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.resizeContainer();
  }

  constructor(private sanitizer: DomSanitizer, private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.resizeContainer();
    this.setHammer();
  }

  unsetAll() {
    this.url = undefined;
  }

  resizeContainer() {
    this.containerWidth = this.imageContainer.offsetWidth;
    this.containerHeight = this.imageContainer.offsetHeight;
    if (this.displayDefaultWidth !== undefined && this.displayDefaultHeight !== undefined) {
      this.displayDefaultWidth = this.displayImage.offsetWidth;
      this.displayDefaultHeight = this.displayImage.offsetHeight;
      this.updateRange();
      this.displayImageCurrentX = this.clamp(this.displayImageX, this.rangeMinX, this.rangeMaxX);
      this.displayImageCurrentY = this.clamp(this.displayImageY, this.rangeMinY, this.rangeMaxY);
      this.updateDisplayImage(this.displayImageCurrentX, this.displayImageCurrentY, this.displayImageCurrentScale);
    }
  }

  updateRange() {
    this.rangeX = Math.max(
      0,
      Math.round(this.displayDefaultWidth * this.displayImageCurrentScale) - this.containerWidth
    );
    this.rangeY = Math.max(
      0,
      Math.round(this.displayDefaultHeight * this.displayImageCurrentScale) - this.containerHeight
    );
    this.rangeMaxX = Math.round(this.rangeX / 2);
    this.rangeMinX = 0 - this.rangeMaxX;

    this.rangeMaxY = Math.round(this.rangeY / 2);
    this.rangeMinY = 0 - this.rangeMaxY;
  }

  clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(min, value), max);
  }

  clampScale(newScale: number) {
    return this.clamp(newScale, this.minScale, this.maxScale);
  }

  setImage() {
    this.displayImage.onload = () => {
      this.imageWidth = this.displayImage.width;
      this.imageHeight = this.displayImage.height;
      this.displayDefaultWidth = this.displayImage.offsetWidth;
      this.displayDefaultHeight = this.displayImage.offsetHeight;
      this.rangeX = Math.max(0, this.displayDefaultWidth - this.containerWidth);
      this.rangeY = Math.max(0, this.displayDefaultHeight - this.containerHeight);
    };
  }

  setHammer() {
    const Hammer = window['Hammer'];
    const hammer = new Hammer(this.imageContainer);

    hammer.get('pinch').set({ enable: true });
    hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    hammer.on('pan', ev => {
      this.displayImageCurrentX = this.clamp(this.displayImageX + ev.deltaX, this.rangeMinX, this.rangeMaxX);
      this.displayImageCurrentY = this.clamp(this.displayImageY + ev.deltaY, this.rangeMinY, this.rangeMaxY);
      this.updateDisplayImage(this.displayImageCurrentX, this.displayImageCurrentY, this.displayImageScale);
    });

    hammer.on('pinch pinchmove', ev => {
      this.displayImageCurrentScale = this.clampScale(ev.scale * this.displayImageScale);
      this.updateRange();
      this.displayImageCurrentX = this.clamp(this.displayImageX + ev.deltaX, this.rangeMinX, this.rangeMaxX);
      this.displayImageCurrentY = this.clamp(this.displayImageY + ev.deltaY, this.rangeMinY, this.rangeMaxY);
      this.updateDisplayImage(this.displayImageCurrentX, this.displayImageCurrentY, this.displayImageCurrentScale);
    });

    hammer.on('panend pancancel pinchend pinchcancel', () => {
      this.displayImageScale = this.displayImageCurrentScale;
      this.displayImageX = this.displayImageCurrentX;
      this.displayImageY = this.displayImageCurrentY;
    });
  }

  onMouseDown(e: Event) {
    e.preventDefault();
  }

  onWheel(e: WheelEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.displayImageScale = this.displayImageCurrentScale = this.clampScale(
      this.displayImageScale + e.wheelDelta / 800
    );
    this.updateRange();
    this.displayImageCurrentX = this.clamp(this.displayImageCurrentX, this.rangeMinX, this.rangeMaxX);
    this.displayImageCurrentY = this.clamp(this.displayImageCurrentY, this.rangeMinY, this.rangeMaxY);
    this.updateDisplayImage(this.displayImageCurrentX, this.displayImageCurrentY, this.displayImageScale);
  }

  updateDisplayImage(x: number, y: number, scale: number) {
    const transform = `translate3d(${x}px, ${y}px,0) scale(${scale}, ${scale})`;
    const style = this.displayImage.style as any;
    style.transform = transform;
    style.WebkitTransform = transform;
    style.msTransform = transform;
  }
}
