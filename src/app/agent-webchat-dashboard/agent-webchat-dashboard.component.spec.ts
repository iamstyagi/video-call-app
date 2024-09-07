import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentWebchatDashboardComponent } from './agent-webchat-dashboard.component';

describe('AgentWebchatDashboardComponent', () => {
  let component: AgentWebchatDashboardComponent;
  let fixture: ComponentFixture<AgentWebchatDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentWebchatDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentWebchatDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
