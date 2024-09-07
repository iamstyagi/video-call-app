import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { BlankComponent } from './blank/blank.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppMainComponent } from './app.main.component';
// import { MailAppComponent } from './mail/mail.app.component';
// import { MailArchiveComponent } from './mail/mail-archive/mail-archive.component';
// import { MailComposeComponent } from './mail/mail-compose/mail-compose.component';
// import { MailDetailComponent } from './mail/mail-detail/mail-detail.component';
// import { MailDraftComponent } from './mail/mail-draft/mail-draft.component';
// import { MailImportantComponent } from './mail/mail-important/mail-important.component';
// import { MailInboxComponent } from './mail/mail-inbox/mail-inbox.component';
// import { MailOutboxComponent } from './mail/mail-outbox/mail-outbox.component';
// import { MailRepliedComponent } from './mail/mail-replied/mail-replied.component';
// import { MailSentComponent } from './mail/mail-sent/mail-sent.component';
// import { MailSpamComponent } from './mail/mail-spam/mail-spam.component';
// import { MailStarredComponent } from './mail/mail-starred/mail-starred.component';
// import { MailTrashComponent } from './mail/mail-trash/mail-trash.component';

import { TwitterComponent } from './twitter/twitter.component';
import { NewTweetComponent } from './twitter/new-tweet/new-tweet.component';
import { InboxComponent } from './twitter/inbox/inbox.component';
import { OutboxComponent } from './twitter/outbox/outbox.component';
import { QueueComponent } from './twitter/queue/queue.component';
import { SentComponent } from './twitter/sent/sent.component';
import { ChatAppComponent } from './chat/chat.app.component';
import { ChatBoxComponent } from './chat/chat-box/chat-box.component';
import { UserCardComponent } from './chat/user-card/user-card.component';
import { ChatSidebarComponent } from './chat/chat-sidebar/chat-sidebar.component';
import { AprdashboardComponent } from './apr-dashboard/aprdashboard.component';
import { FacebookComponent } from './facebook/facebook.component';
import { InboxPostComponent } from './facebook/inbox-post/inbox-post.component';
import { NewPostComponent } from './facebook/new-post/new-post.component';
import { DeletedPostComponent } from './facebook/deleted-post/deleted-post.component';
import { OutboxPostComponent } from './facebook/outbox-post/outbox-post.component';
import { QueuePostComponent } from './facebook/queue-post/queue-post.component';
import { SentPostComponent } from './facebook/sent-post/sent-post.component';
import { InstagramComponent } from './instagram/instagram.component';
import { InstaInboxComponent } from './instagram/insta-inbox/insta-inbox.component';
import { SmsComponent } from './sms/sms.component';
import { NewSmsComponent } from './sms/new-sms/new-sms.component';
import { SmsBoxComponent } from './sms/sms-box/sms-box.component';
import { SidebarComponent } from './sms/sidebar/sidebar.component';
// import { MailComposeComponent } from './mail/mail/mail-compose/mail-compose.component';
// import { MailDraftComponent } from './mail/mail/mail-draft/mail-draft.component';
// import { MailInboxComponent } from './mail/mail/mail-inbox/mail-inbox.component';
// import { MailOutboxComponent } from './mail/mail/mail-outbox/mail-outbox.component';
// import { MailRepliedComponent } from './mail/mail/mail-replied/mail-replied.component';
// import { MailSentComponent } from './mail/mail/mail-sent/mail-sent.component';
// import { MailSpamComponent } from './mail/mail/mail-spam/mail-spam.component';
// import { MailTrashComponent } from './mail/mail/mail-trash/mail-trash.component';
// import { MailAppComponent } from './mail/mail/mail.app.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { MailComposeComponent } from './mail/mail-compose/mail-compose.component';
import { MailDraftComponent } from './mail/mail-draft/mail-draft.component';
import { MailInboxComponent } from './mail/mail-inbox/mail-inbox.component';
import { MailOutboxComponent } from './mail/mail-outbox/mail-outbox.component';
import { MailRepliedComponent } from './mail/mail-replied/mail-replied.component';
import { MailSentComponent } from './mail/mail-sent/mail-sent.component';
import { MailSpamComponent } from './mail/mail-spam/mail-spam.component';
import { MailTrashComponent } from './mail/mail-trash/mail-trash.component';
import { MailAppComponent } from './mail/mail.app.component';
import { NewPostInstaComponent } from './instagram/new-post-insta/new-post-insta.component';
import { WebChatDetailsComponent } from './web-chat-details/web-chat-details.component';
import { WebChatBoxComponent } from './web-chat-details/web-chat-box/web-chat-box.component';
import { WebChatUserCardComponent } from './web-chat-details/web-chat-user-card/web-chat-user-card.component';
import { WebChatSidebarComponent } from './web-chat-details/web-chat-sidebar/web-chat-sidebar.component';
import { WebChatAgentDashboardComponent } from './web-chat-details/web-chat-agent-dashboard/web-chat-agent-dashboard.component';
import { AgentWebchatDashboardComponent } from './agent-webchat-dashboard/agent-webchat-dashboard.component';
import { Blank2Component } from './blank2/blank2.component';
import { DeletedInstaPostComponent } from './instagram/deleted-insta-post/deleted-insta-post.component';

const routes: Routes = [
    { path: 'login.html', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'iCallMate-cCP/customForm', component: CustomFormComponent },
    { path: 'iCallMate-cCP/blank', component: BlankComponent },
    { path: 'iCallMate-cCP/blank2', component: Blank2Component },

    // added by rajat
    { path: 'iCallMate-cCP/dashboard', component: DashboardComponent },
    { path: 'iCallMate-cCP/webchat-dashboard', component: AgentWebchatDashboardComponent },
    { path: 'iCallMate-cCP/APRDashboard', component: AprdashboardComponent },
    { path: 'customFormm', component: CustomFormComponent },
    { path: 'blank', component: CustomFormComponent },
    { path: 'iCallMate-cCP/chat', component: ChatAppComponent },
    { path: 'iCallMate-cCP/webchat', component: WebChatDetailsComponent},
    // {
    //     path: 'iCallMate-cCP/new-home',
    //     loadChildren: () => import('./modules/home/home.module').then(h => h.HomeModule)
    //   },
    {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(h => h.HomeModule)
      },
      {
        path: 'call/:roomId',
        loadChildren: () => import('./modules/call/call.module').then(c => c.CallModule)
      },
    //   {
    //     path: '**',
    //     loadChildren: () => import('./modules/not-found/page-not-found.module').then(n => n.PageNotFoundModule)
    //   },
    {
        path: 'iCallMate-cCP/email', component: MailAppComponent,
        children: [
            { path: '', component: MailInboxComponent },
            { path: 'compose', component: MailComposeComponent },
            { path: 'inbox', component: MailInboxComponent },
            { path: 'replied', component: MailRepliedComponent },
            { path: 'outbox', component: MailOutboxComponent },
            { path: 'sent', component: MailSentComponent },
            { path: 'draft', component: MailDraftComponent },
            { path: 'spam', component: MailSpamComponent },
            { path: 'trash', component: MailTrashComponent },
        ]
    },
    {
        path: 'iCallMate-cCP/instagram', component: InstagramComponent,
        children: [
            { path: '', component: InstaInboxComponent },
            { path: 'insta-inbox', component: InstaInboxComponent },
            { path: 'insta-post', component: NewPostInstaComponent },
            { path: 'insta-deleted', component: DeletedInstaPostComponent },
        ]
    },
    {
        path: 'iCallMate-cCP/twitter', component: TwitterComponent,
        children: [
            { path: '', component: NewTweetComponent },
            { path: 'tweet', component: NewTweetComponent },
            { path: 'inbox', component: InboxComponent },
            { path: 'outbox', component: OutboxComponent },
            { path: 'queue', component: QueueComponent },
            { path: 'sent', component: SentComponent },
        ]
    },
    {
        path: 'iCallMate-cCP/chat', component: ChatAppComponent,
        children: [
            { path: 'chatBox', component: ChatBoxComponent },
            { path: 'chatUsers', component: UserCardComponent },
            { path: 'chatSidebar', component: ChatSidebarComponent },
        ]
    },
    {
        path: 'iCallMate-cCP/webchat', component: WebChatDetailsComponent,
        children: [
            { path: 'webchatBox', component: WebChatBoxComponent },
            { path: 'webchatUsers', component: WebChatUserCardComponent },
            { path: 'webchatSidebar', component: WebChatSidebarComponent },
		    { path: 'webchatAgentDashbord', component: WebChatAgentDashboardComponent },

        ]
    },
    {
        path: 'iCallMate-cCP/facebook', component: FacebookComponent,
        children: [
            { path: '', component: InboxPostComponent },
            { path: 'inbox-post', component: InboxPostComponent },
            { path: 'new-post', component: NewPostComponent },
            { path: 'deleted-post', component: DeletedPostComponent },
            { path: 'outbox-post', component: OutboxPostComponent },
            { path: 'queue-post', component: QueuePostComponent },
            { path: 'sent-post', component: SentPostComponent },
        ]
    },
    // {
    //     path: 'iCallMate-cCP/instagram', component: InstagramComponent,
    //     children: [
    //         { path: '', component: InstaInboxComponent },
    //         { path: 'insta-inbox', component: InstaInboxComponent }
    //     ]
    // },
    {
        path: 'iCallMate-cCP/sms', component: SmsComponent,
        children: [
            { path: 'sms-sidebar', component: SidebarComponent },
            { path: 'new-sms', component: NewSmsComponent },
            { path: 'sms-box', component: SmsBoxComponent },
        ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'iCallMate-cCP', component: AppMainComponent,
        children: [
            { path: '', component: BlankComponent },
            { path: 'customFormm', component: CustomFormComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'webchat-dashboard', component: AgentWebchatDashboardComponent },
            { path: 'APRDashboard', component: AprdashboardComponent },
        ]
    },
    {
        path: 'iCallMate-cCP/whatsapp', component: WhatsappComponent
    },
    { path: 'facebook', loadChildren: () => import('./facebook/facebook.module').then(m => m.FacebookModule) },
    { path: 'instagram', loadChildren: () => import('./instagram/instagram.module').then(m => m.InstagramModule) },
    { path: 'sms', loadChildren: () => import('./sms/sms.module').then(m => m.SmsModule) },
    { path: 'whatsapp', loadChildren: () => import('./whatsapp/whatsapp.module').then(m => m.WhatsappModule) },
    { path: 'web-chat-details', loadChildren: () => import('./web-chat-details/web-chat-details.module').then(m => m.WebChatDetailsModule) },
    

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes,{ relativeLinkResolution: 'legacy' })
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }





// {
//     path: 'email', component: MailAppComponent,
//     children: [
//         { path: 'inbox', component: MailInboxComponent },
//         { path: 'detail/:id', component: MailDetailComponent },
//         // { path: 'compose', component: MailComposeComponent },
//         { path: 'archived', component: MailArchiveComponent },
//         { path: 'important', component: MailImportantComponent },
//         { path: 'sent', component: MailSentComponent },
//         { path: 'spam', component: MailSpamComponent },
//         { path: 'starred', component: MailStarredComponent },
//         { path: 'trash', component: MailTrashComponent },
//         { path: 'compose', component: MailComposeComponent },
//         { path: 'replied', component: MailRepliedComponent },
//         { path: 'outbox', component: MailOutboxComponent },
//         { path: 'draft', component: MailDraftComponent },
//     ]
// },
// {
//     path: 'twitter', component: TwitterComponent,
//     children: [
//         { path: 'tweet', component: NewTweetComponent },
//         { path: 'inbox', component: InboxComponent },
//         { path: 'outbox', component: OutboxComponent },
//         { path: 'queue', component: QueueComponent },
//         { path: 'sent', component: SentComponent },
//     ]
// },
// {
//     path: 'chat', component: ChatAppComponent,
//     children: [
//         { path: 'chatBox', component: ChatBoxComponent },
//         { path: 'chatUsers', component: UserCardComponent },
//         { path: 'chatSidebar', component: ChatSidebarComponent },
//     ]
// },
// {
//     path: 'facebook', component: FacebookComponent,
//     children: [
//         { path: 'inbox-post', component: InboxPostComponent },
//         { path: 'new-post', component: NewPostComponent },
//         { path: 'deleted-post', component: DeletedPostComponent },
//         { path: 'outbox-post', component: OutboxPostComponent },
//         { path: 'queue-post', component: QueuePostComponent },
//         { path: 'sent-post', component: SentPostComponent },
//     ]
// },
// { path: 'sms', component: SmsComponent }