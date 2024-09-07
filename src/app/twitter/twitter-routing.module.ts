import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwitterComponent } from './twitter.component';
import { NewTweetComponent } from './new-tweet/new-tweet.component';
import { InboxComponent } from './inbox/inbox.component';
import { OutboxComponent } from './outbox/outbox.component';
import { QueueComponent } from './queue/queue.component';
import { SentComponent } from './sent/sent.component';


@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: TwitterComponent, children: [
        { path: '', component: NewTweetComponent },
        { path: 'tweet', component: NewTweetComponent },
        { path: 'inbox', component: InboxComponent },
        { path: 'outbox', component: OutboxComponent },
        { path: 'queue', component: QueueComponent },
        { path: 'sent', component: SentComponent },
      ]
    }
  ])],
  exports: [RouterModule]
})
export class TwitterRoutingModule { }
