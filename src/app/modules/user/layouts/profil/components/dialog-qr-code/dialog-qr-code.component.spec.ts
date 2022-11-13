import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQrCodeComponent } from './dialog-qr-code.component';

describe('DialogQrCodeComponent', () => {
  let component: DialogQrCodeComponent;
  let fixture: ComponentFixture<DialogQrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogQrCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
