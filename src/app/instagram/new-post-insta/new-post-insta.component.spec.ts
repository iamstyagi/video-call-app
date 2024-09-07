import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewPostInstaComponent } from './new-post-insta.component';

describe('NewPostInstaComponent', () => {
  let component: NewPostInstaComponent;
  let fixture: ComponentFixture<NewPostInstaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPostInstaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostInstaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
