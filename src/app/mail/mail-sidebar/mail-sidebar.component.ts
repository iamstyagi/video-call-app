import { Component, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';
// import { Mail } from 'src/app/model/mail';
import { Mail } from 'src/app/model/mail'
// import { MailService } from 'src/app/demo/components/apps/mail/service/mail.service';
import { MailService } from '../service/mail.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
declare function openEmailInbox()

@Component({
    selector: 'app-mail-sidebar',
    templateUrl: './mail-sidebar.component.html',
    styleUrls: ['./mail-sidebar.component.scss']
})
export class MailSidebarComponent implements OnDestroy, OnInit {

    items: MenuItem[] = [];
    badgeValues: any;
    mailSubscription: Subscription;
    routeSubscription: Subscription;
    url: string = '';
    selectedIndex: number | null = null;
    loginData: any;
    agentid: any;
    userDetails: any;
    campid: any;
    FromID: any;
    smtpid: any;
    userType: any;


    constructor(private router: Router, private mailService: MailService, private zone: NgZone) {
        const inboxIndex = this.items.findIndex(item => item.routerLink === 'inbox');
        // Set selectedIndex to inboxIndex
        this.selectedIndex = inboxIndex;

        this.mailSubscription = this.mailService.mails$.subscribe((data: any) => {
            this.getBadgeValues(data);
        });

        this.routeSubscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((params: any) => {
            this.url = params.url;
        });

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.updateSelectedIndex(event.url);
            }
        });

        sessionStorage.setItem('getSideBar','email-inbox')
        this.setSelectedIndex(1);
    }

    ngOnInit() {
        this.loginResData();
    }

    compose() {

        this.mailService.composeEmail(this.campid).subscribe((res: any) => {


            this.smtpid = res.smtpid;
            this.FromID = res.FromID
            this.mailService.shareComposeEmail1(res);
            this.router.navigate(["/iCallMate-cCP/email/compose"]);
        }, err => {

        })
    }
    

    loginResData() {
        if (localStorage.getItem("loginData")) {
            this.loginData = JSON.parse(localStorage.getItem("loginData"));
            for (let i = 0; i < this.loginData['value'].length; i++) {
                this.campid = this.loginData['value'][i]['campid'];
                this.userType = this.loginData['value'][i]['userType'];
            }

            this.getUserDetails();
        }
    }

    getUserDetails() {
        this.agentid = sessionStorage.getItem('agentid');
    }

    updateSelectedIndex(url: string) {
        const selectedItem = this.items.find(item => url.includes(item.routerLink));
        if (selectedItem) {
            const selectedIndex = this.items.indexOf(selectedItem);
            this.setSelectedIndex(selectedIndex);
        }
    }

    getBadgeValues(data: Mail[]) {
        let inbox = [],
            starred = [],
            spam = [],
            important = [],
            archived = [],
            trash = [],
            sent = []

        for (let i = 0; i < data.length; i++) {
            let mail = data[i];

            if (!mail.archived && !mail.trash && !mail.spam && !mail.hasOwnProperty('sent')) {
                inbox.push(mail);
            }
            if (mail.starred && !mail.archived && !mail.trash) {
                starred.push(mail);
            }
            if (mail.spam && !mail.archived && !mail.trash) {
                spam.push(mail);
            }
            if (mail.important && !mail.archived && !mail.trash) {
                important.push(mail);
            }
            if (mail.archived && !mail.trash) {
                archived.push(mail);
            }
            if (mail.trash) {
                trash.push(mail);
            }
            if (mail.sent && !mail.archived && !mail.trash) {
                sent.push(mail);
            }
        }

        this.badgeValues = {
            inbox: inbox.length,
            starred: starred.length,
            spam: spam.length,
            important: important.length,
            archived: archived.length,
            trash: trash.length,
            sent: sent.length
        };

        this.updateSidebar();
    }

    updateSidebar() {
        this.items = [
            // { label: 'Compose New', icon: 'pi pi-pencil', badge: this.badgeValues.inbox, routerLink: 'iCallMate-cCP/email/compose' },
            // { label: 'Inbox', icon: 'pi pi-envelope', badge: this.badgeValues.inbox, routerLink: 'iCallMate-cCP/email/inbox' },
            // { label: 'Replies', icon: 'pi pi-reply', badge: this.badgeValues.replied, routerLink: 'iCallMate-cCP/email/replied' },
            // { label: 'Outbox', icon: 'pi pi-folder-open', badge: this.badgeValues.outbox, routerLink: 'iCallMate-cCP/email/outbox' },
            // // { label: 'Starred', icon: 'pi pi-star', badge: this.badgeValues.starred, routerLink: 'iCallMate-cCP/email/starred' },
            // { label: 'Sent', icon: 'pi pi-send', badge: this.badgeValues.sent, routerLink: 'iCallMate-cCP/email/sent' },
            // // { label: 'Important', icon: 'pi pi-bookmark', badge: this.badgeValues.important, routerLink: 'iCallMate-cCP/email/important' },
            // // { label: 'Archived', icon: 'pi pi-book', badge: this.badgeValues.archived, routerLink: 'iCallMate-cCP/email/archived' },
            // { label: 'Draft', icon: 'pi pi-inbox', badge: this.badgeValues.draft, routerLink: 'iCallMate-cCP/email/draft' },
            // { label: 'Spam', icon: 'pi pi-ban', badge: this.badgeValues.spam, routerLink: 'iCallMate-cCP/email/spam' },
            // { label: 'Trash', icon: 'pi pi-trash', badge: this.badgeValues.trash, routerLink: 'iCallMate-cCP/email/trash' }


            { label: 'Compose Mail', icon: 'pi pi-pencil', badge: this.badgeValues.inbox },
            { label: 'Inbox', icon: 'pi pi-envelope', badge: this.badgeValues.inbox },
            { label: 'Replies', icon: 'pi pi-reply', badge: this.badgeValues.replied },
            { label: 'Outbox', icon: 'pi pi-folder-open', badge: this.badgeValues.outbox },
            { label: 'Sent', icon: 'pi pi-send', badge: this.badgeValues.sent },
            { label: 'Draft', icon: 'pi pi-inbox', badge: this.badgeValues.draft },
            { label: 'Spam', icon: 'pi pi-ban', badge: this.badgeValues.spam },
            // { label: 'Trash', icon: 'pi pi-trash', badge: this.badgeValues.trash }
        ];
    }

    setSelectedIndex(index: number) {
        this.mailService.hideShowOutbod(index);

        this.zone.run(() => {
            this.selectedIndex = index;
        });
    }

    navigate(item: MenuItem) {


        switch (item.label) {
            case "Compose Mail":
                this.router.navigate(['iCallMate-cCP/email/compose']);
                break;

            case "Inbox":
                sessionStorage.setItem('getSideBar','email-inbox')
                this.router.navigate(['iCallMate-cCP/email/inbox']);
                break;

            case "Replies":
                sessionStorage.setItem('getSideBar','email-replied')
                this.router.navigate(['iCallMate-cCP/email/replied']);
                break;

            case "Outbox":
                sessionStorage.setItem('getSideBar','email-outbox')
                this.router.navigate(['iCallMate-cCP/email/outbox']);
                break;

            case "Sent":
                sessionStorage.setItem('getSideBar','email-sent')
                this.router.navigate(['iCallMate-cCP/email/sent']);
                break;

            case "Draft":
                sessionStorage.setItem('getSideBar','email-draft')
                this.router.navigate(['iCallMate-cCP/email/draft']);
                break;

            case "Spam":
                sessionStorage.setItem('getSideBar','email-spam')
                this.router.navigate(['iCallMate-cCP/email/spam']);
                break;

            // case "Trash":
            //     sessionStorage.setItem('getSideBar','email-deleted')
            //     this.router.navigate(['iCallMate-cCP/email/trash']);
            //     break;
        }
    }



    ngOnDestroy() {
        this.mailSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }


}
