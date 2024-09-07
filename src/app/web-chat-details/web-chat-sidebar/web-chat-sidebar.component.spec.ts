import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebChatSidebarComponent } from './web-chat-sidebar.component';

describe('WebChatSidebarComponent', () => {
  let component: WebChatSidebarComponent;
  let fixture: ComponentFixture<WebChatSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebChatSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebChatSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
