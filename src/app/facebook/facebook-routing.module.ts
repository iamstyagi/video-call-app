import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacebookComponent } from './facebook.component';
import { DeletedPostComponent } from './deleted-post/deleted-post.component';
import { InboxPostComponent } from './inbox-post/inbox-post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { OutboxPostComponent } from './outbox-post/outbox-post.component';
import { QueuePostComponent } from './queue-post/queue-post.component';
import { SentPostComponent } from './sent-post/sent-post.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: FacebookComponent, children: [
        // { path: '', redirectTo: 'inbox-post', pathMatch: 'full' },
        { path: 'inbox-post', component: InboxPostComponent },
        { path: 'new-post', component: NewPostComponent },
        { path: 'deleted-post', component: DeletedPostComponent },
        { path: 'outbox-post', component: OutboxPostComponent },
        { path: 'queue-post', component: QueuePostComponent },
        { path: 'sent-post', component: SentPostComponent },
      ]
    }
  ])],
  exports: [RouterModule]
})
export class FacebookRoutingModule { }
