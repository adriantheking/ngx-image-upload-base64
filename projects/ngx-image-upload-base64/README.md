[![npm version](https://img.shields.io/npm/v/ngx-image-upload-base64.svg)](https://www.npmjs.com/package/ngx-image-upload-base64)
[![licence](https://img.shields.io/npm/l/ngx-image-upload-base64.svg)](https://www.npmjs.com/package/ngx-image-upload-base64)

# NgxImageUploadBase64
Angular module for upload images to base64

# Requirements
Module need Bootstrap 4

# Installation
```npm install ngx-image-upload-base64 --save```

# Demo
[Demo](https://lukasz-galka.github.io/ngx-gallery-demo/) or [Plnkr](https://embed.plnkr.co/bzo7eOV6RtfRwPljG1k6/)
# NgxImageUploadBase64 Options
All parameters are passing by Module Input

- `maxWidth` | Type: `string` | Default: `400` - Max image width in pixels
- `maxHeight` | Type: `string` | Default: `400` - Max image height in pixels
- `availableExtensions` | Type: `string` | Default: `image/png|image/jpeg` - Available extensions to upload
- `loadImages` | Type:  `array of Image` | Default: `undefined` - List of images to load with component for preview

# NgxImageUploadBase64 Options Example
``` 
<ngx-image-upload-base64 
[maxWidth]="500" 
[maxHeight]="500" 
[availableExtensions]="image/png|image/jpeg"
[loadImages]="imagesToLoad">
</ngx-image-upload-base64>
```

# NgxImageUploadBase64 Methods
- `onAddImage($event)` | Parameter type: `array of Image` - List of already added images
- `onDeleteImage($event)` | Parameter type: `array of Image` - List of all images after deleted

# NgxImageUploadBase64 Methods Example
```
<ngx-image-upload-base64 
(onAddImage)="onAddImage($event)" 
(onDeleteImage)="onDelete($event)">
</ngx-image-upload-base64>
```

# NgxImageUploadBase64 Full Example
```
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <ngx-image-upload-base64 (onAddImage)="onAddImage($event)" (onDeleteImage)="onDelete($event)"
      [loadImages]="imagesToLoad"></ngx-image-upload-base64>
    </div>
  </div>
</div>
```
# Credits
https://adrianszen.com