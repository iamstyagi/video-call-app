import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebChatAgentDashboardComponent } from './web-chat-agent-dashboard.component';

describe('WebChatAgentDashboardComponent', () => {
  let component: WebChatAgentDashboardComponent;
  let fixture: ComponentFixture<WebChatAgentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebChatAgentDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebChatAgentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
