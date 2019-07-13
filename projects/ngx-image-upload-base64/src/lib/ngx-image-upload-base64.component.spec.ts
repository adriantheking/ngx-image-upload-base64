import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxImageUploadBase64Component } from './ngx-image-upload-base64.component';

describe('NgxImageUploadBase64Component', () => {
  let component: NgxImageUploadBase64Component;
  let fixture: ComponentFixture<NgxImageUploadBase64Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxImageUploadBase64Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxImageUploadBase64Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
