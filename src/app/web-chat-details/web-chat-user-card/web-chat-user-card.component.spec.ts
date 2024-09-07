import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebChatUserCardComponent } from './web-chat-user-card.component';

describe('WebChatUserCardComponent', () => {
  let component: WebChatUserCardComponent;
  let fixture: ComponentFixture<WebChatUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebChatUserCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebChatUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
