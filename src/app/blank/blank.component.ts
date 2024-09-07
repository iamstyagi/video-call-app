import { AfterViewInit, ChangeDetectorRef, Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TabView } from 'primeng/tabview';
import { SharedService } from '../demo/service/shared.service';
import { ChatService } from '../chat/service/chat.service';
import { WhatsappServiceService } from '../whatsapp/service/whatsapp-service.service';
declare function openWhatsappMedia();
declare function openEmail();
declare function openTwitter();
declare function openFacebook();
declare function openSMS();
declare function openInstagram();
declare function openLogin()
declare function openWebChat();

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit, AfterViewInit {
  activeIndex: number = 0;
  phnno: any;
  phoneID: any;
  tabName: any = "Voice";
  tabLabel: any;
  extn_set: any = sessionStorage.getItem('extn_set');
  loginData: any;
  campid: any;
  userType: any;
  agentid: any;

  tabNames: any;
  // voice
  voiceTab: boolean = true;
  // whatsapp
  whatsappTab: boolean = false;
  // email
  emailTab: boolean = false;
  // twitter
  twitterTab: boolean = false;
  // fb
  fbTab: boolean = false;
  // sms
  smsTab: boolean = false;
  // insta
  instagramTab: boolean = false;
  webChatTab: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private sharedService: SharedService,
    public MessageService: MessageService,
    public chatService: ChatService,
    private wpService: WhatsappServiceService,
    private confirmationService: ConfirmationService,
  ) {
    this.phnno = sessionStorage.getItem('phnno');
    // uncomment this to enable masking
    // const isMasked = localStorage.getItem('isMasked');
    // if (isMasked) {
    //   const maskOffSet: any = localStorage.getItem('maskOffSet')
    //   this.phnno = "X".repeat(maskOffSet) + this.phnno.slice(maskOffSet);
    // }

    localStorage.setItem('tabName', 'blank');
    this.extn_set = sessionStorage.getItem('extn_set');
    this.tabNames = localStorage.getItem('tabName')
    this.phoneID = sessionStorage.getItem('phoneID');
  }

  ngOnInit(): void {
    this.getUpdatedSession();
    this.loginResData();
  }

  ngDoCheck() {

    // common code -------------------------------------------------------------------------------------------------------------------------------------------
    this.extn_set = sessionStorage.getItem('extn_set');
    // this.tabNames = localStorage.getItem('tabName');
    this.phoneID = sessionStorage.getItem('phoneID');

    // New code - need to work -------------------------------------------------------------------------------------------------------------------------------
    // // 
    // if (this.extn_set == 'Idle') {
    //   if (this.tabNames == 'blank') {
    //     this.tabName = 'Voice';
    //   }
    //   if (this.tabNames == 'Dashboard') {
    //     this.tabName = 'Dashboard';
    //   }
    //   if (this.tabNames == 'APR Dashboard') {
    //     this.tabName = 'APR Dashboard';
    //   }
    //   if (this.tabNames == 'custForm') {
    //     this.phnno = sessionStorage.getItem('phnno');
    //     const isMasked = localStorage.getItem('isMasked');
    //     if (isMasked) {
    //       const maskOffSet: any = localStorage.getItem('maskOffSet')
    //       this.phnno = "X".repeat(maskOffSet) + this.phnno.slice(maskOffSet);
    //     }
    //     this.tabName = this.phnno + '-' + '(' + this.phoneID + ')'
    //   }
    //   
    // } else if (this.extn_set == 'ACW') {
    //   const phnno = sessionStorage.getItem('phnno');
    //   const isMasked = localStorage.getItem('isMasked');
    //   if (isMasked) {
    //     const maskOffSet: any = localStorage.getItem('maskOffSet')
    //     this.phnno = "X".repeat(maskOffSet) + phnno.slice(maskOffSet);
    //     this.phoneID = sessionStorage.getItem('phoneID');
    //     this.tabName = this.phnno + '-' + '(' + this.phoneID + ')';
    //     localStorage.setItem('tabName', '');
    //     
    //   }
    // }
    // else{
    //   this.tabName = 'Voice';
    //   var extn_set = this.extn_set.split('-')[0];
    //   if (extn_set == "DialinWait") {
    //     this.tabName = 'Voice';
    //   }else{
    //     this.tabName = 'Voice';
    //   }
    //   
    // }




    // workign OLD code -----------------------------------------------------------------------------------------------------------------------------------------
    if (sessionStorage.getItem('extn_set') === 'Idle' || localStorage.getItem('webrtcStatus') === 'Idle') {
      if (this.tabNames === 'Dashboard') {
        this.tabName = 'Dashboard';
      } else if (this.tabNames === 'APR Dashboard') {
        this.tabName = 'APR Dashboard';
      }
      else if (this.tabNames === 'custForm') {
        this.phnno = sessionStorage.getItem('phnno');
        // uncomment this to enable masking
        // const isMasked = localStorage.getItem('isMasked');
        // if (isMasked) {
        //   const maskOffSet: any = localStorage.getItem('maskOffSet')
        //   this.phnno = "X".repeat(maskOffSet) + this.phnno.slice(maskOffSet);
        // }
        this.tabName = this.phnno + '-' + '(' + this.phoneID + ')'

      } else {
        this.tabName = 'Voice';
      }
    }
    else {
      var extn_set = this.extn_set.split('-')[0];
      // var extn_set = (this.extn_set && this.extn_set.split('-')[0]) ? this.extn_set.split('-')[0] : this.extn_set;
      if (extn_set == "DialinWait") {
        this.phnno = '';
        this.phoneID = '';
        this.tabName = '';
      } else {
        this.phnno = sessionStorage.getItem('phnno'); // by rajat - original

        // uncomment this to enable masking
        // this.phnno = ''
        // const phnno = sessionStorage.getItem('phnno'); // by rajat
        // const isMasked = localStorage.getItem('isMasked');
        // if (isMasked) {
        //   const maskOffSet: any = localStorage.getItem('maskOffSet')
        //   this.phnno = "X".repeat(maskOffSet) + phnno.slice(maskOffSet);
        // }
        this.phoneID = sessionStorage.getItem('phoneID');
        this.tabName = this.phnno + '-' + '(' + this.phoneID + ')'
        if (!this.phnno || !this.phoneID) {
          this.tabName = 'Voice'
        }
        // localStorage.setItem('tabName', '');
      }
    }

    this.logoutOnCacheClear();
  }

  ticketEnable: boolean = true;
  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));
    for (let i = 0; i < this.loginData['value'].length; i++) {
      this.campid = this.loginData['value'][i]['campid'];
      this.userType = this.loginData['value'][i]['userType'];
      this.agentid = sessionStorage.getItem('agentid');
      this.ticketEnable = this.loginData['value'][i]['ticketEnable'];
    }
  }

  logoutOnCacheClear() {
    if (this.extn_set == '' || this.extn_set == undefined || this.extn_set == null) {
      openLogin();
    }
  }
  selectedWpTab: boolean = false;
  selectedEmailTab: boolean = false;
  selectedTwitterTab: boolean = false;
  selectedfbTab: boolean = false;
  selectedSMSTab: boolean = false;
  selectedInstaTab: boolean = false;
selectedWebChat: boolean = false;
  ngAfterViewInit(): void {
    this.sharedService.selectedSocialMedia$.subscribe(res => {
      console.log(res,'openres');
      switch (res) {
        case 'whatsapp':
          this.voiceTab = true;
          this.whatsappTab = false;
          this.selectedWpTab = false;


          setTimeout(() => {
            this.voiceTab = false;

            this.whatsappTab = true;
            this.selectedWpTab = true;

            this.selectedEmailTab = false;
            this.selectedTwitterTab = false;
            this.selectedfbTab = false;
            this.selectedSMSTab = false;
            this.selectedInstaTab = false;
            this.selectedWebChat = false
            setTimeout(() => {
              openWhatsappMedia();
            });
          })
          break;

        case 'email':
          this.voiceTab = true;
          this.emailTab = false;
          this.selectedEmailTab = false;


          setTimeout(() => {
            this.voiceTab = false;
            this.emailTab = true;

            this.selectedEmailTab = true;

            this.selectedWpTab = false;
            this.selectedTwitterTab = false;
            this.selectedfbTab = false;
            this.selectedSMSTab = false;
            this.selectedInstaTab = false;
            this.selectedWebChat = false

            setTimeout(() => {
              openEmail();
            });
          })
          break;

        case 'twitter':
          this.voiceTab = true;
          this.twitterTab = false;
          this.selectedTwitterTab = false;


          setTimeout(() => {
            this.voiceTab = false;
            this.twitterTab = true;
            this.selectedTwitterTab = true;
            this.selectedWpTab = false;
            this.selectedEmailTab = false;
            this.selectedfbTab = false;
            this.selectedSMSTab = false;
            this.selectedInstaTab = false;
            this.selectedWebChat = false

            setTimeout(() => {
              openTwitter();
            })
          })
          break;

        case 'facebook':
          this.voiceTab = true;
          this.fbTab = false;
          this.selectedfbTab = false;

          setTimeout(() => {
            this.voiceTab = false;
            this.fbTab = true;

            this.selectedfbTab = true;

            this.selectedWpTab = false;
            this.selectedEmailTab = false;
            this.selectedTwitterTab = false;
            this.selectedSMSTab = false;
            this.selectedInstaTab = false;
            this.selectedWebChat = false

            setTimeout(() => {
              openFacebook();
            })
          })
          break;

        case 'sms':
          this.voiceTab = true;
          this.smsTab = false;
          this.selectedSMSTab = false;


          setTimeout(() => {
            this.voiceTab = false;
            this.smsTab = true;
            this.selectedSMSTab = true;
            this.selectedEmailTab = false;
            this.selectedTwitterTab = false;
            this.selectedfbTab = false;
            this.selectedWpTab = false;
            this.selectedInstaTab = false;
          this.selectedWebChat = false

            setTimeout(() => {
              openSMS();
            })
          })
          break;
          case 'webChat':
          this.voiceTab = true;
            this.webChatTab = false;
            this.selectedWebChat = false

            setTimeout(() => {
              this.voiceTab = false;
              this.webChatTab = true;
            this.selectedWebChat = true;

              this.selectedInstaTab = false;
              this.selectedInstaTab = false;
              this.selectedEmailTab = false;
              this.selectedTwitterTab = false;
              this.selectedfbTab = false;
              this.selectedSMSTab = false;
              this.selectedWpTab = false;
              setTimeout(() => {
                openWebChat();
              })
            })
            break;

        case 'instagram':
          this.voiceTab = true;
          this.instagramTab = false;
          this.selectedInstaTab = false;

          
          setTimeout(() => {
            this.voiceTab = false;
            this.instagramTab = true;

            this.selectedInstaTab = true;

            this.selectedEmailTab = false;
            this.selectedTwitterTab = false;
            this.selectedfbTab = false;
            this.selectedSMSTab = false;
            this.selectedWpTab = false;
            this.selectedWebChat = false

            setTimeout(() => {
              openInstagram();
            })
          })
          break;

        default:
          this.voiceTab = true;
          this.whatsappTab = false
          this.emailTab = false;
          this.twitterTab = false;
          this.fbTab = false;
          this.smsTab = false;
          this.instagramTab = false;
          this.webChatTab = false;

      }

    })
  }


  closeWhatsapp() {
    // if (confirm("Are you sure want to close WhatsApp ?") == true) {
      this.closeCurrentTab(() => {
        let data = {
          LoginUserID: this.agentid,
          userType: this.userType,
          campID: this.campid,
        }
        this.chatService.sessionClose(data).subscribe((res: any) => {

          if (res.statuscode == 200) {
            this.whatsappTab = false;
            this.selectedWpTab = false;

            this.voiceTab = true;

            this.selectedEmailTab = false;
            this.selectedTwitterTab = false;
            this.selectedfbTab = false;
            this.selectedSMSTab = false;
            this.selectedInstaTab = false;
            this.selectedWebChat = false



          }
          this.MessageService.add({ summary: '', severity: 'info', detail: res.message });
        })
      });
    // }
  }
  sendInviteApi(event: Event,text:any) {
    let acceptCallback: () => void;
    let rejectCallback: () => void;
  
    if (text === 'WhatsApp') {
      acceptCallback = () => this.closeWhatsapp();
    } else if (text === 'Email') {
      acceptCallback = () => this.closeEmail();
    } else if (text === 'Twitter') {
      acceptCallback = () => this.closeTwitter();
    } else if (text === 'Facebook') {
      acceptCallback = () => this.closeFacebook();
    } else if (text === 'SMS') {
      acceptCallback = () => this.closeSMS();
    } else if (text === 'Instagram') {
      acceptCallback = () => this.closeInsta();
    } else if (text === 'Webchat') {
      acceptCallback = () => this.closeWebChat();
    }
  
    // Define the reject callback (you can customize it as needed)
    rejectCallback = () => {
      // Handle rejection
      // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };
  
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure want to close ${text} ?`,
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-outlined p-button-sm cancelBtn',
      acceptButtonStyleClass: 'p-button-sm newcls successBtnN',
      accept: acceptCallback,
      reject: rejectCallback
    });
  }

  closeEmail() {
    // if (confirm("Are you sure want to close Email ?") == true) {
    this.closeCurrentTab(() => {
      // this.emailTab = false;

      this.emailTab = false;
      this.selectedEmailTab = false;

      this.voiceTab = true;

      this.selectedWpTab = false;
      this.selectedTwitterTab = false;
      this.selectedfbTab = false;
      this.selectedSMSTab = false;
      this.selectedInstaTab = false;
      this.selectedWebChat = false


    });
  // }
  }

  closeTwitter() {
    // if (confirm("Are you sure want to close Twitter ?") == true) {
    this.closeCurrentTab(() => {
      // this.twitterTab = false;

      this.twitterTab = false;
      this.selectedTwitterTab = false;

      this.voiceTab = true;

      this.selectedWpTab = false;
      this.selectedEmailTab = false;
      this.selectedfbTab = false;
      this.selectedSMSTab = false;
      this.selectedInstaTab = false;
      this.selectedWebChat = false

    });
  // }
  }

  closeFacebook() {
    // if (confirm("Are you sure want to close Facebook ?") == true) {
    this.closeCurrentTab(() => {
      // this.fbTab = false;

      this.fbTab = false;
      this.selectedfbTab = false;

      this.voiceTab = true;

      this.selectedWpTab = false;
      this.selectedEmailTab = false;
      this.selectedTwitterTab = false;
      this.selectedSMSTab = false;
      this.selectedInstaTab = false;
      this.selectedWebChat = false

    });
  // }
  }

  closeSMS() {
    // if (confirm("Are you sure want to close SMS ?") == true) {
    this.closeCurrentTab(() => {
      // this.smsTab = false;

      this.smsTab = false;
      this.selectedSMSTab = false;

      this.voiceTab = true;

      this.selectedWpTab = false;
      this.selectedEmailTab = false;
      this.selectedTwitterTab = false;
      this.selectedfbTab = false;
      this.selectedInstaTab = false;
      this.selectedWebChat = false


    });
  // }
}

  closeInsta() {
    // if (confirm("Are you sure want to close Instagram ?") == true) {
    this.closeCurrentTab(() => {
      // this.instagramTab = false;

      this.instagramTab = false;
      this.selectedInstaTab = false;

      this.voiceTab = true;

      this.selectedWpTab = false;
      this.selectedEmailTab = false;
      this.selectedTwitterTab = false;
      this.selectedfbTab = false;
      this.selectedSMSTab = false;
      this.selectedWebChat = false

    });
  // }
  }
  closeWebChat() {
    // if (confirm("Are you sure want to close WEBCHAT ?") == true) {
    this.closeCurrentTab(() => {
      this.webChatTab = false;
      this.selectedWebChat = false
      
      this.voiceTab = true;
      
      this.selectedInstaTab = false;
      this.selectedWpTab = false;
      this.selectedEmailTab = false;
      this.selectedTwitterTab = false;
      this.selectedfbTab = false;
      this.selectedSMSTab = false;

    });
  // }
  }

  private closeCurrentTab(callback?: () => void) {
    setTimeout(() => {
      if (callback) {
        callback();
      }
    });
  }

  getUpdatedSession() {
    // uncomment this to enable masking
    this.phnno = sessionStorage.getItem('phnno');
    this.phoneID = sessionStorage.getItem('phoneID');
    // const isMasked = localStorage.getItem('isMasked');
    // if (isMasked) {
    //   const maskOffSet: any = localStorage.getItem('maskOffSet')
    //   this.phnno = "X".repeat(maskOffSet) + this.phnno.slice(maskOffSet);
    // }
  }


  whatsappTicketTab() {

  }
  checValue1(val){
if(val == 0 || val == '0'){
  sessionStorage.setItem('indexingCheckValue','NONWHATSAPPTAB')
}else if(val == 1 || val == '1'){
  sessionStorage.setItem('indexingCheckValue','WHATSAPPTAB')

}
  }

}
