import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentPostComponent } from './sent-post.component';

describe('SentPostComponent', () => {
  let component: SentPostComponent;
  let fixture: ComponentFixture<SentPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
