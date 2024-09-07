import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebChatBoxComponent } from './web-chat-box.component';

describe('WebChatBoxComponent', () => {
  let component: WebChatBoxComponent;
  let fixture: ComponentFixture<WebChatBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebChatBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebChatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
