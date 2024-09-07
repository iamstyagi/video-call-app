import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebChatDetailsComponent } from './web-chat-details.component';
import { WebChatBoxComponent } from './web-chat-box/web-chat-box.component';
import { WebChatSidebarComponent } from './web-chat-sidebar/web-chat-sidebar.component';
import { WebChatUserCardComponent } from './web-chat-user-card/web-chat-user-card.component';
import { WebChatAgentDashboardComponent } from './web-chat-agent-dashboard/web-chat-agent-dashboard.component';

const routes: Routes = [{ path: '', component: WebChatDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild([
		{
			path: '', component: WebChatDetailsComponent,
			children: [
				{ path: '', redirectTo: 'webchatUsers', pathMatch: 'full' },
				{ path: 'webchatBox', component: WebChatBoxComponent },
				{ path: 'webchatUsers', component: WebChatUserCardComponent },
				{ path: 'webchatSidebar', component: WebChatSidebarComponent },
				{ path: 'webchatAgentDashbord', component: WebChatAgentDashboardComponent },
			]
		},

	])],
  exports: [RouterModule]
})
export class WebChatDetailsRoutingModule { }
