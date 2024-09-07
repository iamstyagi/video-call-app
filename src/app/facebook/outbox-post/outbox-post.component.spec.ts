import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboxPostComponent } from './outbox-post.component';

describe('OutboxPostComponent', () => {
  let component: OutboxPostComponent;
  let fixture: ComponentFixture<OutboxPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutboxPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutboxPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
