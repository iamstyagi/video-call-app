import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { TopbarService } from './demo/service/topbar.service';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { TwitterService } from './twitter/services/twitter.service';
import { CustomService } from './demo/service/custom.service';
import { catchError, finalize, take } from 'rxjs/operators';
import { SharedService } from './demo/service/shared.service';
import { MywebrtcDetailsService } from './demo/service/mywebrtc-details.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

declare function setlogout(manualLogout);
declare function openDashboard();
declare function openAPRDashboard();
declare function openWebChatDashboard();
declare function openCustForm();
declare function blank();
declare function sendDataToWebSocket(data);


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [ConfirmationService, MessageService],
    styleUrls: ['./app.topbar.component.scss']
})
export class AppTopBarComponent implements OnInit, OnDestroy {

    // for checkinjg two values

    newVariableFalseTrueCheck: boolean = environment.newVariableFalseTrueCheck
    newTicketValueSet: any = true
    rtmMessageDialgoue: boolean = false;
    responsiveOptions: any[] | undefined;
    chatHistoryDataTable: any = [];
    tickethistoryDataTable: any = [];
    ticketDataTable: any = [];
    customerTableData: any = [];
    activeIndex = 0;
    menu: any[];
    @ViewChild('input1') inputElement1: ElementRef;
    @ViewChild('input2') inputElement2: ElementRef;
    submitted: boolean;
    agentid: any;
    campid: any;
    userType: any;
    loginData: any;
    enddateN: any;
    startdateN: any;
    notification: any[] = [];
    liveChat: boolean = false;
    notificationItems: any[] = [];
    user: any[] = [];
    textContent: any;
    selectedChat: any;
    chatMessages: any[] = [];
    ticketTypeData: any = []
    chatUser: any;
    SourceValue: any
    // selectedAttachment: any[] = [];
    selectedAttachment: any;
    userOfChats: any;
    searchValue: any;
    searchDialogue: boolean = false;
    enableChat: boolean = false;
    enableEmail: boolean = false;
    enableFacebook: boolean = false;
    enableTwitter: boolean = false;
    enableWhatsApp: any;
    enableiIG: boolean = false;
    enableSMS: boolean = false;
    enableWEBCHAT: boolean = false;
    intervalId: any;
    emailCounter: any = "0" + "/" + "0";
    fbCounter: any = "0" + "/" + "0";
    twitterCounter: any = "0" + "/" + "0";
    twitterChatCounter: any = "0" + "/" + "0";
    instaCounter: any = "0" + "/" + "0";
    wpCounter: any = "0" + "/" + "0";
    chatCounter: any = "0" + "/" + "0";
    smsCounter: any = "0" + "/" + "0";

    ticketEnable: boolean = false;
    ticketTypeNew: any;
    countDetails: any
    maintrueVariable: boolean = true;

    sorceName = [
        { label: 'Voice', value: 0 },
        { label: 'Email', value: 1 },
        { label: 'Chat', value: 2 },
        { label: 'Twitter', value: 3 },
        { label: 'Facebook', value: 4 },
        { label: 'LinkedIn', value: 5 },
        { label: 'Whatsapp', value: 13 },
        { label: 'SMS', value: 14 },
        { label: 'Offline', value: 7 },
        { label: 'TwitterDM', value: 8 },
        { label: 'Instagram', value: 9 }
    ];
    selectVal: any
    groupedCities: MenuItem[] | undefined;
    products = [];
    // products: Product[] | undefined;
    //   groupedCities:any = []
    constructor(
        public CustomService: CustomService,
        public MessageService: MessageService,
        private datePipe: DatePipe,
        public app: AppComponent,
        public appMain: AppMainComponent,
        private agentLogout: TopbarService,
        private _route: Router,
        private twitterService: TwitterService,
        private sharedService: SharedService,
        private mywebrtcdetailsService: MywebrtcDetailsService) {

    }

    ngOnInit() {
        // this.openSocket();

        this.menu = [{
            label: 'Menu',
            items: [
                {
                    label: 'UI Kit', icon: 'pi pi-align-left',
                    items: [
                        { label: 'Form Layout', icon: 'pi pi-id-card', routerLink: ['/uikit/formlayout'] },
                        { label: 'Input', icon: 'pi pi-check-square', routerLink: ['/uikit/input'] },
                    ]
                },
                {
                    label: 'Hierarchy', icon: 'pi pi-align-left',
                    items: [
                        {
                            label: 'Submenu 1', icon: 'pi pi-align-left',
                            items: [
                                { label: 'Submenu 1.1', icon: 'pi pi-align-left' },
                                { label: 'Submenu 1.2', icon: 'pi pi-align-left' },
                            ]
                        },
                        {
                            label: 'Submenu 2', icon: 'pi pi-align-left',
                            items: [
                                { label: 'Submenu 2.1', icon: 'pi pi-align-left' },
                            ]
                        },
                    ]
                }
            ]
        }
        ];
        this.loginResData();

        // setTimeout(() => {
        //     this.getLiveChats();
        // }, 7000)

        // for every 15 min
        // this.topbar();
        // setInterval(() => {
        //     this.topbar();
        // }, 7000)

        // // // for every 1min
        this.getsocialData();
        setInterval(() => {
            this.getsocialData();
        }, 15000)
        // this.intervalId = setInterval(() => {
        //     this.getsocialData();
        //   }, 2000);

        this.alwaysCeckFunbt();
        this.getDataCount()
        this.getSetStartEndDate();
    }
    getDetailsTopar() {
        
        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 5,
                numScroll: 1
            }
        ];
    
        this.groupedCities = []; // Initialize an empty array

        if (this.ticketEnable) {
            this.groupedCities.push({ label: 'Dashboard', icon: 'pi pi-microsoft' });
        }
        if (this.enableChat) {
            this.groupedCities.push({ label: 'Web Chat Dashboard', icon: 'pi pi-microsoft' },
                { label: 'WEB CHAT', icon: 'pi pi-comments' },
            );
        }
        if (this.enableEmail) {
            this.groupedCities.push({ label: 'Email', icon: 'pi pi-envelope' });
        }
        if (this.enableFacebook) {
            this.groupedCities.push({ label: 'Facebook', icon: 'pi pi-facebook' });
        }
        if (this.enableTwitter) {
            this.groupedCities.push(
                { label: 'Twitter', icon: 'pi pi-twitter' },
                { label: 'Twitter DM', icon: 'pi pi-comment' }
            );
        }
        if (this.enableiIG) {
            this.groupedCities.push({ label: 'Instagram', icon: 'pi pi-instagram' });
        }
        if (this.enableWhatsApp) {
            this.groupedCities.push({ label: 'WhatsApp', icon: 'pi pi-whatsapp' });
        }
        if (this.enableWEBCHAT) {
            this.groupedCities.push({ label: 'Chat', icon: 'pi pi-comments' });
        }
        if (this.enableSMS) {
            this.groupedCities.push({ label: 'SMS', icon: 'pi pi-comments' });
        }

        // Adding common labels at the end
        this.groupedCities.push(
            { label: 'APR Dashboard', icon: 'pi pi-microsoft' },
            { label: 'Notification', icon: 'pi pi-bell' },
            { label: 'Logout', icon: 'pi pi-sign-out' }
        );
    }
    getDeatilsAfterMobile(valu) {
        // console.log(valu,this.selectVal,'vallll');
        let val = this.selectVal.label
        if (val == 'Logout') {
            this.logout()
            this.selectVal = ''
            val = ''
        } else if (val == 'Notification') {
            this.getRTmMessage()
            this.selectVal = ''
            val = ''
        } else if (val == 'APR Dashboard') {
            this.appMain.onLayoutClick()
            this.onAPRDashboard()
            this.selectVal = ''
            val = ''
        } else if (val == 'Dashboard') {
            this.appMain.onLayoutClick()
            this.openDashboard()
            this.selectVal = ''
            val = ''
        } else if (val == 'Web Chat Dashboard') {
            this.appMain.onLayoutClick()
            this.openWebChatDash()
            this.selectVal = ''
            val = ''
        } else if (val == 'Email') {
            this.appMain.onLayoutClick()
            this.openEmail()
            this.selectVal = ''
            val = ''
        } else if (val == 'Facebook') {
            this.appMain.onLayoutClick()
            this.openFacebook()
            this.selectVal = ''
            val = ''
        } else if (val == 'Twitter') {
            this.appMain.onLayoutClick()
            this.openTwitter()
            this.selectVal = ''
            val = ''
        } else if (val == 'Twitter DM') {
            this.twitterDM()
            this.selectVal = ''
            val = ''
        } else if (val == 'Instagram') {
            this.appMain.onLayoutClick()
            this.openInstagram()
            this.selectVal = ''
            val = ''
        } else if (val == 'WhatsApp') {
            this.appMain.onLayoutClick()
            this.openWhatsapp()
            this.selectVal = ''
            val = ''
        } else if (val == 'Chat') {
            this.appMain.onLayoutClick()
            // this.openSMS()
            this.selectVal = ''
            val = ''
        } else if (val == 'SMS') {
            this.appMain.onLayoutClick()
            this.openSMS()
            this.selectVal = ''
            val = ''
        } else if (val == 'WEB CHAT') {
            this.appMain.onLayoutClick()
            this.openWebChat()
            this.selectVal = ''
            val = ''
        } else {
            this.selectVal = ''
            val = ''
        }
        setTimeout(() => {
            this.selectVal = null; // Reset the value after a delay
        }, 100);
    
    }

    loginResData() {
        this.loginData = JSON.parse((localStorage.getItem("loginData")));


        this.campid = this.loginData.value[0].campid;
        this.userType = this.loginData.value[0].userType;
        this.agentid = sessionStorage.getItem('agentid');

        this.enableChat = this.loginData.value[0].enableChat;
        this.enableEmail = this.loginData.value[0].enableEmail;
        this.enableFacebook = this.loginData.value[0].enableFacebook;
        this.enableTwitter = this.loginData.value[0].enableTwitter;
        this.enableWhatsApp = this.loginData.value[0].enableWhatsApp;
        this.enableiIG = this.loginData.value[0].enableiIG;
        this.enableSMS = this.loginData.value[0].enableSMS;
        this.ticketEnable = this.loginData.value[0]['ticketEnable'];

        sessionStorage.setItem('enableWhatsApp', this.enableWhatsApp)

        // this.twitterDM();
        this.getDetailsTopar()
    }

    searchFocus(event) {
        if (this.appMain.search) {
            setTimeout(() => {
                this.inputElement1.nativeElement.focus();
                this.inputElement2.nativeElement.focus();
            }, 100);
        }
    }
    chanegAc(value) {

    }


    logout() {
        const result = window.confirm('Are you sure you want to log out?');

        if (result == true) {

            setlogout(result);
            localStorage.removeItem("userDetails");
            localStorage.removeItem("loginData");
            sessionStorage.removeItem("startdate");
            sessionStorage.removeItem("enddate");
            sessionStorage.removeItem("getDynamicFormFieldsCache");
            this._route.navigate(['./login']);
        }

        // for webrtc start

        this.mywebrtcdetailsService.disconnectCall();
        setTimeout(() => {
            this.mywebrtcdetailsService.unregisterUser()
        }, 2000);
        setTimeout(() => {
            window.location.reload()
        }, 3000);

        // for webrtc end
    }

    openDashboard() {
        this.appMain.onLayoutClick()
        let abc = sessionStorage.getItem('extn_set');
        if (abc == 'Idle') {
            openDashboard();
            // this.sharedService.setMessage('iCallMate-cCP/dashboard');
            // this._route.navigateByUrl('iCallMate-cCP/dashboard')
        }
        else {
            this.MessageService.add({ severity: 'warn', summary: 'Warning', detail: 'Cannot open APR while Call is Active' });
        }
    }

    onAPRDashboard() {
        this.appMain.onLayoutClick()
        if (sessionStorage.getItem('extn_set') == 'Idle') {
            openAPRDashboard();
            // this.sharedService.setMessage('iCallMate-cCP/APRDashboard')
            // this._route.navigateByUrl('iCallMate-cCP/APRDashboard');
        }
        else {
            this.MessageService.add({ severity: 'warn', summary: 'Warning', detail: 'Cannot open APR while Call is Active' });
        }
    }
    openWebChatDash() {
        this.appMain.onLayoutClick()
        if (sessionStorage.getItem('extn_set') == 'Idle') {
            openWebChatDashboard();
            // this.sharedService.setMessage('iCallMate-cCP/APRDashboard')
            // this._route.navigateByUrl('iCallMate-cCP/APRDashboard');
        }
        else {
            this.MessageService.add({ severity: 'warn', summary: 'Warning', detail: 'Cannot open APR while Call is Active' });
        }
    }

    twitterDM() {


        // this.notificationItems = [];
        let data = {
            loginUserID: this.agentid,
            campID: this.campid,
            userType: this.userType
        };


        this.twitterService.twitterDMnotification(data).subscribe(
            (res: any) => {

                res.value.forEach(element => {
                    const label = `
                <strong>From:</strong> ${element.messageFrom}<br/>
                <strong>To:</strong> ${element.messageTo}<br/>
                <strong>Message:</strong> ${element.messageText}`;

                    this.notificationItems.push({
                        label: label,
                        escape: false,
                        command: (event) => {
                            this.handleMenuItemClick(element);
                        }
                    });
                });
            },
            err => {

            }
        );
    }

    handleMenuItemClick(selectedItem: any) {

        this.selectedChat = selectedItem;
        this.getLiveChats();
        this.liveChat = true;
    }

    getLiveChats() {
        let data = {
            loginUserID: this.agentid,
            campID: this.campid,
            userType: this.userType,
            chatMessage: {
                accountid: (this.selectedChat && this.selectedChat.accountid) ? this.selectedChat.accountid : '',
                messageuserid: (this.selectedChat && this.selectedChat.messageuserid) ? this.selectedChat.messageuserid : '',
                messageFrom: (this.selectedChat && this.selectedChat.messageFrom) ? this.selectedChat.messageFrom : ''
            }
        }


        this.twitterService.getLiveChats(data).subscribe((res) => {

            this.userOfChats = res
            this.chatMessages = res.value[0].alChatMessages


            this.chatUser = res.value[0].remoteUser;
        }, err => {

        })
    }

    dealWithFiles(event: any) {


        // this.selectedAttachment = '';
        // if (event) {
        //   const fileBlob = event.currentFiles[0] as Blob;
        //   this.selectedAttachment = new File([fileBlob], event.currentFiles[0].name, { type: fileBlob.type });
        // }

        this.selectedAttachment = null;
        if (event) {
            this.selectedAttachment = event.currentFiles[0];
            this.MessageService.add({ severity: 'info', summary: event.currentFiles[0].name + ' selected', detail: '' });
        }
    }

    setMessage() {
    }

    sendMessage() {
        let data = {
            campID: this.agentid,
            userType: this.userType,
            loginUserID: this.userType,
            text: this.textContent ? this.textContent : "",
            chatMaster: {
                remoteUser: this.userOfChats.value[0].remoteUser,
                accountid: this.userOfChats.value[0].accountid,
                remoteUserid: this.userOfChats.value[0].remoteUserid
            }
        }


        if (this.selectedAttachment) {
            this.twitterService.sendDMmessages(data, this.selectedAttachment).subscribe((res) => {
                this.getLiveChats();
                this.textContent = ''
                this.selectedAttachment = '';
                setTimeout(() => {
                    this.getLiveChats();
                }, 1500)
            })
        } else {
            this.twitterService.sendDMmessages(data, '').subscribe((res) => {
                this.getLiveChats();
                this.textContent = ''
                setTimeout(() => {
                    this.getLiveChats();
                }, 1500)
            })
        }
    }



    onSubmit() {
        if (sessionStorage.getItem('extn_set') == 'Talk' || sessionStorage.getItem('extn_set') == 'ACW' || sessionStorage.getItem('extn_set') == 'OutCall') {
            this._route.navigateByUrl('iCallMate-cCP/customFormm');
        }
        else {
            this.MessageService.add({ severity: 'info', summary: 'info', detail: 'DynaForm will open when only agent is on call' }); ``
        }

    }

    onSearch() {
        this.searchDialogue = true;
        let body = {
            searchValue: this.searchValue,
            campID: this.campid
        }
        this.CustomService.onTicketSearch(JSON.stringify(body)).subscribe((res: any) => {
            if (res.status == 'Success') {
                this.customerTableData = res.value
                this.ticketDataTable = res.value;

            } else {
                this.customerTableData = []
                this.ticketDataTable = []
            }
        });
        this.CustomService.returnJsonData(this.campid).subscribe((res) => {
            if (res) {
                this.ticketTypeData = res
            }

        })
    }

    onTabChange(event: any) {

        if (event == 1) {
            let body = {
                searchValue: this.searchValue,
                campID: this.campid,
                tabname: 'CustomerForm'
            }
            this.CustomService.onTabWiseSearch(JSON.stringify(body)).subscribe((res: any) => {
                if (res) {
                    this.customerTableData = res.list;
                } else {
                    this.customerTableData = []
                }
            });
        }
        else if (event == 0) {
            let body = {
                searchValue: this.searchValue,
                campID: this.campid,
                tabname: 'TicketForm'
            }
            this.CustomService.onTabWiseSearch(JSON.stringify(body)).subscribe((res: any) => {
                if (res) {
                    this.ticketDataTable = res.list;
                } else {
                    this.ticketDataTable = []
                }
            });

        }
        else if (event == 2) {
            let body = {
                searchValue: this.searchValue,
                campID: this.campid,
                tabname: 'TicketHistoryForm'
            }
            this.CustomService.onTabWiseSearch(JSON.stringify(body)).subscribe((res: any) => {
                if (res) {
                    this.tickethistoryDataTable = res.list;
                } else {
                    this.tickethistoryDataTable = []
                }
            });
        }
        else if (event == 3) {
            let body = {
                searchValue: this.searchValue,
                campID: this.campid,
                tabname: 'ChatHistoryForm'
            }
            this.CustomService.onTabWiseSearch(JSON.stringify(body)).subscribe((res: any) => {
                if (res) {
                    this.chatHistoryDataTable = res.list;
                } else {
                    this.chatHistoryDataTable = []
                }
            });
        }

    }

    onTicketId(item: any) {
        sessionStorage.setItem('sendTicketDetails', this.newTicketValueSet)

        let data;
        if (this.activeIndex == 0) {
            data = {
                value: item.fld_CustID,
                campID: this.campid,
                tabname: 'CustomerForm'
            }
        }
        else if (this.activeIndex == 1) {
            data = {
                value: item.fld_TicketID,
                campID: this.campid,
                tabname: 'TicketForm'
            }
        }
        else if (this.activeIndex == 2) {
            data = {
                value: item.fld_TicketID,
                campID: this.campid,
                tabname: 'TicketHistoryForm'
            }
        }
        this.CustomService.routeAccordingtoTicket(JSON.stringify(data)).subscribe((res: any) => {


            // 
            if (res.status == 'Success') {
                this.searchDialogue = false;
                sessionStorage.setItem('phnno', JSON.parse(res.value).phoneNo);
                sessionStorage.setItem('phoneID', JSON.parse(res.value).phoneID);
                // this._route.navigateByUrl('iCallMate-cCP/customFormm');
                // window.location.reload();
                blank()
                openCustForm();
            }
        });
    }

    openWhatsapp() {
        this.appMain.onLayoutClick()
        this.sharedService.socialMediaDetected('whatsapp');
        // this.wpCounter = "0" + "/" + "0";
    }
    openWebChat() {
        this.appMain.onLayoutClick()
        this.sharedService.socialMediaDetected('webChat');
    }
    openEmail() {
        this.appMain.onLayoutClick()
        this.sharedService.socialMediaDetected('email');
        // this.emailCounter = "0" + "/" + "0";
    }

    openTwitter() {
        this.appMain.onLayoutClick()
        this.sharedService.socialMediaDetected('twitter');
        // this.twitterCounter = "0" + "/" + "0";
    }

    openFacebook() {
        this.appMain.onLayoutClick()
        this.sharedService.socialMediaDetected('facebook');
        // this.fbCounter = "0" + "/" + "0";
    }

    openSMS() {
        this.appMain.onLayoutClick()
        this.sharedService.socialMediaDetected('sms');
        // this.smsCounter = "0" + "/" + "0";
    }

    openInstagram() {
        this.appMain.onLayoutClick()
        this.sharedService.socialMediaDetected('instagram');
        // this.instaCounter = "0" + "/" + "0";
    }

    getsocialData() {
        // for whatsapp
        let wp = {
            sourceTypes: 13,
            campId: this.campid,
            agentId: this.agentid,
            Isdb: this.maintrueVariable
        }
        this.agentLogout.topbarRedis(wp).subscribe((res: any) => {
            this.maintrueVariable = false
            if (res.data) {
                let emailData = res.data;

                let queueCount = JSON.parse(emailData).queueCount;
                let unReadCount = JSON.parse(emailData).unreadcount;

                if (queueCount == null) {
                    queueCount = 0;
                }
                if (unReadCount == null) {
                    unReadCount = 0;
                }

                this.wpCounter = unReadCount + '/' + queueCount;
            }
        }, err => {
        })

    }



    // topbar() {
    //     this.agentLogout.topbar(this.campid, this.agentid).subscribe(() => { });
    // }

    clear(table: any) {
        table.clear();
    }

    alwaysCeckFunbt() {
        setInterval(() => {
            if (sessionStorage.getItem('disposeData')) {
                this.getDataMY()
            }
            //   this.cdr.detectChanges(); 
        }, 500);

    }
    getDataMY() {
        const data = sessionStorage.getItem('disposeData')
        if (data) {
            sessionStorage.removeItem('myNewArrayValueSession')
            sendDataToWebSocket(data)
        }

    }

    getDataCount() {
        setInterval(() => {
            this.countDetails = localStorage.getItem('notificationCOunt') != undefined ? localStorage.getItem('notificationCOunt') : '0'
        }, 100);
    }

    ngOnDestroy() {
        // Clear the interval when the component is destroyed to prevent memory leaks

    }
    onReload() {

        sessionStorage.setItem("startdateN", this.startdateN);
        sessionStorage.setItem("enddateN", this.enddateN);
        let startDate: any;
        let endDate: any;
        if (this.startdateN) {
            startDate = this.datePipe.transform(this.startdateN, 'yyyy-MM-dd HH:mm:ss');

        }

        if (this.enddateN) {
            endDate = this.datePipe.transform(this.enddateN, 'yyyy-MM-dd HH:mm:ss');

        }
        let data = {
            searchValue: this.searchValue,
            campID: this.campid,
            "tabname": "TicketForm",
            "startdate": startDate,
            "enddate": endDate,
            "sourcetype": (this.SourceValue || this.SourceValue != null) ? this.SourceValue : '-1',
            "ticketypeid": (this.ticketTypeNew || this.ticketTypeNew != null) ? this.ticketTypeNew : 0
        }
        this.CustomService.onTabWiseSearch(JSON.stringify(data)).subscribe((res: any) => {
            if (res) {
                this.ticketDataTable = res.list;
            } else {
                this.ticketDataTable = []
            }
        });
    }
    getSetStartEndDate() {
        const startDate = sessionStorage.getItem("startdateN");
        const endDate = sessionStorage.getItem("enddateN");

        if (startDate && endDate) {
            this.startdateN = new Date(startDate)
            this.enddateN = new Date(endDate)


            //   this.getDashboardList();

        } else {
            this.enddateN = new Date();
            this.enddateN.setHours(23, 59, 59, 999);


            this.startdateN = new Date();
            this.startdateN.setHours(0, 0, 0, 0);

            //   this.getDashboardList();
        }


    }
    rtmMessage: any;
    rtmMessagesList: any = [];
    mainDetailsLength: any

    ngDoCheck() {
        // this.mode=sessionStorage.getItem('dialModeNew');
        if (sessionStorage.getItem('rtmMessage')) {
            this.rtmMessageDialgoue = true;
            this.rtmMessage = sessionStorage.getItem('rtmMessage');
            this.rtmMessagesList.push(this.rtmMessage);
            sessionStorage.removeItem('rtmMessage');
            if (this.rtmMessagesList && this.rtmMessagesList.length) {
                this.mainDetailsLength = this.rtmMessagesList.length
            }
        }


    }
    showRTMList: boolean = false;
    getRTmMessage() {
        // sendDataToWebSocket('%RTMMessage|166|6000|Message from Admin: helllpo|0$')
        this.showRTMList = !this.showRTMList;
    }
}
