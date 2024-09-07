import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuePostComponent } from './queue-post.component';

describe('QueuePostComponent', () => {
  let component: QueuePostComponent;
  let fixture: ComponentFixture<QueuePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueuePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
