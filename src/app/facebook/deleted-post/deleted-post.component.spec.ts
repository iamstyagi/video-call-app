import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedPostComponent } from './deleted-post.component';

describe('DeletedPostComponent', () => {
  let component: DeletedPostComponent;
  let fixture: ComponentFixture<DeletedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
