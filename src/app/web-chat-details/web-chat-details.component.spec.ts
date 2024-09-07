import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebChatDetailsComponent } from './web-chat-details.component';

describe('WebChatDetailsComponent', () => {
  let component: WebChatDetailsComponent;
  let fixture: ComponentFixture<WebChatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebChatDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebChatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
