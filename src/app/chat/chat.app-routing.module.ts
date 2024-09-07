import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatAppComponent } from './chat.app.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: '', component: ChatAppComponent,
			children: [
				{ path: '', redirectTo: 'chatUsers', pathMatch: 'full' },
				{ path: 'chatBox', component: ChatBoxComponent },
				{ path: 'chatUsers', component: UserCardComponent },
				{ path: 'chatSidebar', component: ChatSidebarComponent },
			]
		},

	])],
	exports: [RouterModule]
})
export class ChatAppRoutingModule { }
