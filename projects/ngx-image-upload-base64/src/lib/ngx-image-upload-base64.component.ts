import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Image } from './ngx-image-upload-base64.model';

@Component({
  selector: 'ngx-image-upload-base64',
  templateUrl: './ngx-image-upload-base64.component.html',
  styleUrls: ['./ngx-image-upload-base64.component.css'],
})
export class NgxImageUploadBase64Component implements OnInit {


  @Input() availableExtensions = "image/png|image/jpeg";
  @Input() maxWidth = 400;
  @Input() maxHeight = 400;
  @Input() maxImagesToUpload = 10;
  @Input() loadImages: Image[];
  @Output() onAddImage: EventEmitter<Image[]> = new EventEmitter<Image[]>();
  @Output() onDeleteImage: EventEmitter<Image[]> = new EventEmitter<Image[]>();

  imagesPreview: Image[] = [];

  private extensions: string[] = [];

  constructor(private domSatinizer: DomSanitizer) { }

  ngOnInit(): void {

      this.loadImagesFromInput();
      this.getAvailableExtensions();
  }

  loadImagesFromInput() {
      if (this.loadImages != undefined && this.loadImages.length > 0) {
          this.loadImages.forEach(img => {
              let im = new Image;
              im.src = img.base64;

              if (this.imagesPreview.length < this.maxImagesToUpload) {
                  if (img.height == undefined || img.height == null) {
                      img.height = im.height;
                  }
                  if (img.width == undefined || img.width == null) {
                      img.width = im.width;
                  }

                  this.imagesPreview.push(img);
              }
          });
      }
  }

  getAvailableExtensions() {
      this.extensions = this.availableExtensions.split("|");
  }

  readFile(file: File): Observable<string> {
      const sub = new Subject<string>();
      var reader = new FileReader();

      reader.onload = () => {
          const content: string = reader.result as string;

          sub.next(content);
          sub.complete();
      };

      reader.readAsBinaryString(file);
      return sub.asObservable();
  }

  onSelectFile(ev) {
      const file = ev.target.files[0];

      if (this.extensions.includes(file.type) && this.imagesPreview.length < this.maxImagesToUpload) {
          this.readFile(file).subscribe((output) => {
              let image = btoa(output);
              this.resizeImage(file.type, image).subscribe(result => {
                  this.pushImage(result);
              });

          })
      }
  }

  pushImage(image: Image) {
      this.imagesPreview.push(image);
      this.onAddImage.emit(this.imagesPreview);
  }

  getImgContent(image: Image): SafeUrl {
      return this.domSatinizer.bypassSecurityTrustStyle(`url(${image.base64})`);
  }

  deleteImg(image: Image): void {
      if (this.imagesPreview.includes(image)) {
          let index = this.imagesPreview.indexOf(image);
          this.imagesPreview.splice(index, 1);

          this.onDeleteImage.emit(this.imagesPreview);
      }
  }

  resizeImage(type: string, image: string): Observable<Image> {
      const subject = new Subject<Image>();

      if (image) {
          var img = new Image();
          img.src = `data:${type};base64,${image}`;

          img.onload = () => {
              var canvas = document.createElement("canvas");
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);

              var MAX_WIDTH = this.maxWidth;
              var MAX_HEIGHT = this.maxHeight;
              var width = img.width;
              var height = img.height;

              if (width > height) {
                  if (width > MAX_WIDTH) {
                      height *= MAX_WIDTH / width;
                      width = MAX_WIDTH;
                  }
              } else {
                  if (height > MAX_HEIGHT) {
                      width *= MAX_HEIGHT / height;
                      height = MAX_HEIGHT;
                  }
              }
              canvas.width = width;
              canvas.height = height;
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0, width, height);

              let dataurl = canvas.toDataURL();

              let result: Image = {
                  base64: dataurl,
                  type: type,
                  width: width,
                  height: height
              }
              subject.next(result);
              subject.complete();
          }
          return subject.asObservable();
      }
  }
}
