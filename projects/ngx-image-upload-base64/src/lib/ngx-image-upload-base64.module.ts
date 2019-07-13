import { NgModule } from '@angular/core';
import { NgxImageUploadBase64Component } from './ngx-image-upload-base64.component';
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [NgxImageUploadBase64Component],
  imports: [FormsModule,
    ReactiveFormsModule,
    BrowserModule,
  ],
  exports: [NgxImageUploadBase64Component]
})
export class NgxImageUploadBase64Module { }
