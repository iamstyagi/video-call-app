import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedInstaPostComponent } from './deleted-insta-post.component';

describe('DeletedInstaPostComponent', () => {
  let component: DeletedInstaPostComponent;
  let fixture: ComponentFixture<DeletedInstaPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedInstaPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedInstaPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
