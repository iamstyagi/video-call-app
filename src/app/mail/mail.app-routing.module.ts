import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MailAppComponent } from './mail.app.component';
import { MailInboxComponent } from './mail-inbox/mail-inbox.component';
import { MailComposeComponent } from './mail-compose/mail-compose.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';
import { MailArchiveComponent } from './mail-archive/mail-archive.component';
import { MailImportantComponent } from './mail-important/mail-important.component';
import { MailSentComponent } from './mail-sent/mail-sent.component';
import { MailSpamComponent } from './mail-spam/mail-spam.component';
import { MailStarredComponent } from './mail-starred/mail-starred.component';
import { MailTrashComponent } from './mail-trash/mail-trash.component';
import { MailRepliedComponent } from './mail-replied/mail-replied.component';
import { MailOutboxComponent } from './mail-outbox/mail-outbox.component';
import { MailDraftComponent } from './mail-draft/mail-draft.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: MailAppComponent, children: [
                { path: '', redirectTo: 'inbox', pathMatch: 'full' },
                { path: 'inbox', component: MailInboxComponent },
                { path: 'detail/:id', component: MailDetailComponent },
                { path: 'compose', component: MailComposeComponent },
                { path: 'archived', component: MailArchiveComponent },
                { path: 'important', component: MailImportantComponent },
                { path: 'sent', component: MailSentComponent },
                { path: 'spam', component: MailSpamComponent },
                { path: 'starred', component: MailStarredComponent },
                { path: 'trash', component: MailTrashComponent },
                { path: 'replied', component: MailRepliedComponent },
                { path: 'outbox', component: MailOutboxComponent },
                { path: 'draft', component: MailDraftComponent },
            ]
        }
    ])],
    exports: [RouterModule]
})
export class MailAppRoutingModule { }
