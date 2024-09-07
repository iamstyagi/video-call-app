import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSmsComponent } from './new-sms.component';

describe('NewSmsComponent', () => {
  let component: NewSmsComponent;
  let fixture: ComponentFixture<NewSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
