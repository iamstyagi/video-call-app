import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsBoxComponent } from './sms-box.component';

describe('SmsBoxComponent', () => {
  let component: SmsBoxComponent;
  let fixture: ComponentFixture<SmsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
