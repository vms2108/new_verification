import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-image-modal-viewer',
  templateUrl: 'image-modal-viewer.component.html',
  styleUrls: ['image-modal-viewer.component.scss']
})
export class ImageModalViewerComponent implements OnInit {
  public visible = false;
  public image: string;

  @HostBinding('class.visible')
  get isVisible() {
    return this.visible;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (this.visible && e.keyCode === 27) {
      this.close();
    }
  }

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.layoutService.zoomImage$.subscribe((value: string) => {
      if (value) {
        this.image = value;
        this.visible = true;
      } else {
        this.image = undefined;
        this.visible = false;
      }
    });
  }

  close() {
    this.layoutService.unsetZoomImage();
  }
}
