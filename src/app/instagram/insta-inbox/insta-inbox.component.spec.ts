import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaInboxComponent } from './insta-inbox.component';

describe('InstaInboxComponent', () => {
  let component: InstaInboxComponent;
  let fixture: ComponentFixture<InstaInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstaInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
