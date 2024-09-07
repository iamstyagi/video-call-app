import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxPostComponent } from './inbox-post.component';

describe('InboxPostComponent', () => {
  let component: InboxPostComponent;
  let fixture: ComponentFixture<InboxPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
