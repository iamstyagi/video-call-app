import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { WhatsappServiceService } from './service/whatsapp-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../demo/service/shared.service';
import { AudioRecordingService } from './service/audio-recording.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MailNewService } from './service/mail-new.service';
import { Mail } from '../model/mail';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { FormField } from '../form-field';
import { Router } from '@angular/router';
import { BehaviorSubject, concat, interval, Observable, of, Subject, Subscription, timer } from 'rxjs';
import { concatMap, take, tap, finalize, switchMap, takeUntil } from 'rxjs/operators';
declare var MediaRecorder: any;
interface assigendItem {
  name: string,
}

interface markItem {
  name: string,
}
@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @ViewChild('fileInput') fileInput: ElementRef;
  // @ViewChild('chatWindow') chatWindow!: ElementRef;
  @ViewChild('messageContainer') messageContainer: ElementRef;
  public socialMedia = new BehaviorSubject<any>('');
  selectedSocialMedia$ = this.socialMedia.asObservable();
  @ViewChild('chatWindow', { static: false }) chatWindow: ElementRef;
  selectedTemp1: any
  showMobile: boolean = true;
  templatelang: any;
  loginData: any;
  agentName: any
  campid: any;
  userType: any;
  agentid: any;
  selectTemplates: any[] = [];
  selectedTemplateValue: any;
  newNumberDialog: boolean = false;
  filteredUsers: any[] = [];
  newNo: any;
  searchValue: any;
  number: any;
  lastRowid: number = 0;
  listChats: any[] = [];
  thredaOfAllChats: boolean = true;
  myForwardDataSend: any;
  isForwadMessage: boolean = false;
  enableEmail: boolean = false;
  forwardContacts: any[] = [];
  repliedMsg: any;
  textContent: any;
  selectedcontact: any;
  visible: boolean = false;
  sessionStatus: boolean = false;
  members: any = [
    { label: 'Attachment' },
    { label: 'Contact' },
    { label: 'Template' }
  ]
  rangeDates: any[] = [];
  selectedContact: any[] = []
  // contact static array
  mainContactDetailsArr: any = []
  mydatasendforward: any = []
  mainLocationData: any = []
  myLOcationDataNew: any[] = []
  locationVis: boolean = false;
  locationV: any
  sendContactSharing: boolean = false;
  newNoSend: any
  mysharingContact: boolean = false
  mainTwoVariablesASend: any
  openValueNew: boolean = false
  initialCallMade: boolean = false
  // for number mask condition
  ismaskphonenoValue: boolean = true
  newPhoneNumberDetails: any
  redialCheckNumber: any = sessionStorage.getItem('redialNumberCheck')
  // followUpDetails
  mainFollowPopup: boolean = false
  followUpsMessageDetails: any
  emailPopUpTrueFalse: boolean = false
  smsVariableTrueFalse: boolean = false
  isRecording = false;
  recordedTime;
  blobUrl;
  teste;

  recorder: typeof MediaRecorder;
  selecteddata: any
  audio;
  smsNumber: any
  chunks: Blob[] = [];

  mp3encoder: any;
  myredialTrue: boolean = false
  // isRecording = false;
  isRecordingFailed = false;
  recordedBlob: Blob;
  setMyFIleAudio: any
  recordingDuration: number;
  newRecordValue: boolean = false
  file: any;
  fileName: any = 'File Name';
  showRemove: boolean = true;

  myfile: any;
  // email variable
  accountDropdown: any[] = [];
  signature_smtpData: any = [];
  signature: any;
  newMail: Mail = {
    id: '',
    to: '',
    from: '',
    email: '',
    image: '',
    title: '',
    message: '',
    date: '',
    important: false,
    starred: false,
    trash: false,
    spam: false,
    archived: false,
    sent: true
  };
  resultArray: string[] = [];
  fld_BCC: any;
  fld_CC: any;
  emailStringData: any
  selectedMailsTo: any;
  emailStringDataCC: any;
  emailStringDataBCC: any;
  templateArr: any = []
  selectTemp: any;
  FromID: any;
  smtpid: any;
  ticketNo: any; sourceName: any; ticketCampaignName: any; actionNo: any; ticketTime: any; ticketDuration: any;
  emailFound = false;
  whatsappNumberDetailsGet = sessionStorage.getItem('setWhatsappNumber')
  rowIDNew: any
  // textContent: string = '';
  showSuggestions: boolean = false;
  suggestions: string[] = []; // This will hold the filtered suggestions
  allTemplates: string[] = ['Template1', 'Template2', 'Template3']; // Your full list of templates
  // ticket variables declare
  ticketForm: FormGroup;
  subDistrictV: any;
  subBotValue: any;
  callID: any;
  date: Date = new Date();
  dispositionID;
  getDynamicFormFieldsCache: any;
  newVariableFalseTrueCheck: boolean = environment.newVariableFalseTrueCheck
  disposeCall: boolean = true;
  ticketID: any;
  selectedAssignedBy: any;
  agentRemarks: any;
  disabledTicketFields: boolean = true;
  ticketFields: any = [];
  showDynaTicketCard: boolean = false;
  showUpdateButton: boolean = false;
  showSaveButton: boolean = false;
  ticketEnable: boolean = false;
  showTicketCard: boolean = false;
  newTicketFlag: boolean = false;
  inputCheck: boolean = false;
  userDetails: any;

  selectedCallBack: boolean;
  MarkAs: markItem[];
  selectedMarkAs: markItem;
  ticketStartTimeUpdate: any;
  tree: any;
  abc: any = [];
  cols: any[];
  private destroy$ = new Subject<void>();

  selectedAssignedBydata: any;
  selectedticketStatus: any;
  ticketRecords: any = [];
  voicefile: any;
  ticketTypeDropdownData: any[] = [];
  selectedTicketType: any[] = [];
  ticketStatusDropdownData: any = [];
  arrObj: number[] = new Array(1);
  historyDialogBox: boolean;
  ticketTypeHistory: any = [];
  ticketRecordsValueComman: any = [];
  valueSaveTrue: boolean = false;
  phoneData: any;
  ticketSaved: boolean = false;
  selectedAssignedTo: any;
  phoneDataa: any;
  formFields: any[];
  customForm: FormGroup;
  phoneid = sessionStorage.getItem("phoneID");
  historyDialogBoxFormWithoutTicketing: boolean = false;
  callHistoryTableData: any = [];
  minDate: any;
  AssignedBy: assigendItem[];
  selectedDisposeCall: any;
  solutionValue;
  feedbackValue;
  remarksValue;
  ticketValue: any
  schoolCodeValue: any
  schoolNameValue: any
  districtValue: any
  blockNameValue: any
  problemReportedValue: any
  campName: any
  sideBarMange: boolean = true
  sideBarMange1: boolean = true
  isReasonRejection: boolean = false
  myRejectionMessage: any
  intervalValueGreat: any
  activeUser: any; // Or use a specific type if available
  mainRowId: any
  private subscriptionOne: Subscription;
  shortSleep: boolean = true
  longSleep: boolean = false
  shortSleep1: boolean = false
  searchValue1: any = "91";
  // ticket get
  lastDataReceivedTime: number = Date.now();
  intervals1: number[] = [500, 1000, 2000, 3000, 5000]; // Durations in milliseconds
  // intervals1: number[] = [500, 1000,2000, 3000, 5000]; // Durations in milliseconds
  currentIntervalIndex: number = 0;
  pollingIntervalCheck: number = 1000; // Interval to check elapsed time
  myCounts: any
  longSleepValue: any
  intervalsMyShort: any
  // myImageIconVariable: boolean = false
  myImageIconVariable: { [key: string]: boolean } = {}; // Initialize an object to store spinner states

  smsApi: boolean = false
  contactSharing: boolean = false
  showBusinessNumber: boolean = false
  showFaqDetails: boolean = false
  intervals: number[] = []; // Array to store dynamic intervals fetched from API
  dynamicCount: number = 4; // Example count, replace with actual value
  faqValue: any
  myInputFieldDisabled: boolean = false
  phnFlag = true;
  myMainVar: boolean = false
  constructor(
    public chatService: WhatsappServiceService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private sharedService: SharedService,
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer,
    private mailService: MailNewService,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private http: HttpClient,
    private confirmationService: ConfirmationService,
  ) {
    this.ticketForm = this.fb.group({

    });

    this.audioRecordingService.data$.subscribe((data) => {
      if (data && data['ftpmediafile']) {
        this.newRecordValue = true
        this.myfile = data
        this.setMyFIleAudio = data['ftpmediafile']
      }
    }
    );

    this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe(time => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe(data => {
      this.teste = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
    this.AssignedBy = [
      { name: 'Any Agent' },
      { name: 'My Self' }
    ];

    this.selectedAssignedBy = this.AssignedBy[1].name


    this.MarkAs = [
      { name: 'Contact_No' },
      { name: 'Alt_CntctNo' },
      { name: 'Fld_Alt_CntctNo2' }
    ];
  }


  ngOnInit() {
    this.loginResData();
    this.getTemplates();
    this.loadWATemplate();
    this.loadLocationContacts()
    this.getPollDetailsTimer()
    this.settimeOutFun()
  }


  letData() {
    let data = sessionStorage.getItem('phnno')
    this.sharedService.socialMedia.subscribe((res: any) => {
      this.searchValue = '91' + data ? data : '';
      this.searchFromDB();
    })
  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));
    for (let i = 0; i < this.loginData['value'].length; i++) {
      this.campid = this.loginData['value'][i]['campid'];
      this.campName = this.loginData['value'][i]['campName'];
      this.userType = this.loginData['value'][i]['userType'];
      this.agentName = this.loginData['value'][i]['agentName']
      this.agentid = sessionStorage.getItem('agentid');
      this.ticketEnable = this.loginData['value'][i]['ticketEnable'] != null ? this.loginData['value'][i]['ticketEnable'] : true;
      this.smsApi = this.loginData['value'][i]['SMS_API']
      this.contactSharing = this.loginData['value'][i]['contact_Shair']
      this.showBusinessNumber = this.loginData['value'][i]['fld_isShowBssID']
      this.showFaqDetails = this.loginData['value'][i]['fld_isShowFAQ']
      this.enableEmail = this.loginData.value[i].enableEmail;
    }

  }
  fetchIntervalsAndCount(): Observable<{ intervals: number[], count: number }> {
    // Replace this with your actual API call
    return of({
      intervals: this.intervalsMyShort, // Example intervals
      // intervals: [500, 1000, 2000, 3000], // Example intervals
      count: this.myCounts // Example count
    });
  }

  loadLocationContacts() {
    let data = {
      campID: this.campid
    }
    this.chatService.getLocationContacts(data).subscribe((res) => {
      this.myLOcationDataNew = res.data
    })
  }
  getPollDetailsTimer() {
    let bodyData = {
      "campID": this.campid
    }
    this.chatService.getPollTimerDetails(bodyData).subscribe((res) => {
      if (res.status == "failed") {
        this.shortSleep = true
        this.intervalsMyShort = [200, 300, 400, 500, 600]
        this.getAllContacts();
      } else {
        this.shortSleep = res.shortSleep
        this.myCounts = res.shortSleepCount
        this.intervalsMyShort = res.shortSleepValue
        this.longSleep = res.longSleep
        this.longSleepValue = res.shortSleepValue
        if (this.shortSleep && this.intervalsMyShort) {
          this.getAllContacts();
        }
      }
    })
  }

  getAllContacts() {

    let data = {
      LoginUserID: this.agentid,
      userType: this.userType,
      campID: this.campid,
      "IsdB": true
    }
    if (this.shortSleep) {
      this.fetchIntervalsAndCount().pipe(
        concatMap(({ intervals, count }) => {
          // Create an observable for each interval with the specified count
          const intervalObservables = intervals.map((duration, index) =>
            timer(duration).pipe(
              tap(() => {
                this.getDataisDbFalse();
              }),
              finalize(() => {
                if (index === intervals.length - 1) {
                  setInterval(() => {
                    this.getDataisDbFalse();
                  }, 5000);

                }
              })
            )
          );

          // Concatenate the observables to ensure they run sequentially
          return concat(...intervalObservables);
        }),
        finalize(() => {
          // Optionally handle completion here
        })
      ).subscribe();
    }
    this.chatService.getChatData(data).then(data => {
      this.filteredUsers = data; //contacts come from api and then shows


    });
    // if (this.phnFlag && this.myMainVar) { // to open chat or send templete to new no. to open from sidebar
    //   if (sessionStorage.getItem('phnno')) {
    //     this.searchValue = '91' + sessionStorage.getItem('phnno')

    //     let phnData = {
    //       phoneno: this.searchValue
    //     }
    //     this.chatService.searchFromDB(phnData).subscribe((res: any) => {
    //       // if (res.status == 'Success') { // if no. found all chats will load
    //       this.sendMobile(res.value, '1');
    //       // } 

    //       // else { // if no. not found in this case template will send on that no.
    //       if (this.selectedTemplateValue) {
    //         this.selectTemplates.forEach((element: any) => {
    //           if (element.tempName == this.selectedTemplateValue) {
    //             let data: any = {
    //               LoginUserID: this.agentid,
    //               userType: this.userType,
    //               campID: this.campid,
    //               phoneno: this.searchValue,
    //               sourcetype: "13",
    //               templatename: this.selectedTemplateValue,
    //               isnewContact: "true",
    //               templatelang: this.templatelang,
    //               templateText: this.templateText
    //             }

    //             this.chatService.sendWhatsAppTemplate(data).subscribe((res: any) => {
    //               sessionStorage.removeItem('myWhatsappStarted')
    //               if (res.status == 'Success') {
    //                 this.messageService.add({ severity: 'success', summary: "Template Sent", detail: res.value });
    //                 this.sendMobile(this.searchValue, '1')
    //               } else {
    //                 this.messageService.add({ severity: 'warn', summary: 'Template not sent', detail: res.value });
    //               }
    //             })
    //           }
    //         })
    //       } else {
    //         this.messageService.add({ severity: 'warn', summary: "Warn", detail: "Please Select Template" });
    //       }
    //       // }
    //     }, err => {
    //     })

    //     this.phnFlag = false;
    //   }
    // }
  }
  getDataisDbFalse() {
    let data = {
      LoginUserID: this.agentid,
      userType: this.userType,
      campID: this.campid,
      "IsdB": false
    }
    this.chatService.getChatData(data).then(data => {
      this.filteredUsers = data; //contacts come from api and then shows

    });
  }
  // getAllContacts() {
  //   let data = {
  //     LoginUserID: this.agentid,
  //     userType: this.userType,
  //     campID: this.campid
  //   }
  //   this.chatService.getChatData(data).then(data => {
  //     this.filteredUsers = data; //contacts come from api and then shows
  //     if (this.phnFlag) {
  //       if (this.whatsappNumberDetailsGet) {
  //         this.searchValue = '91' + this.whatsappNumberDetailsGet

  //         let phnData = {
  //           phoneno: this.searchValue
  //         }

  //         this.chatService.searchFromDB(phnData).subscribe((res: any) => {
  //           // if (res.status == 'Success') { // if no. found all chats will load
  //           // this.sendMobile(res.value, '1');
  //           // } 

  //           // else { // if no. not found in this case template will send on that no.
  //           if (this.selectedTemplateValue) {
  //             this.selectTemplates.forEach((element: any) => {
  //               if (element.tempName == this.selectedTemplateValue) {
  //                 let data: any = {
  //                   LoginUserID: this.agentid,
  //                   userType: this.userType,
  //                   campID: this.campid,
  //                   phoneno: this.searchValue,
  //                   sourcetype: "13",
  //                   templatename: this.selectedTemplateValue,
  //                   isnewContact: "true",
  //                   templatelang: this.templatelang,
  //                   templateText: this.templateText
  //                 }

  //                 this.chatService.sendWhatsAppTemplate(data).subscribe((res: any) => {
  //                   if (res.status == 'Success') {
  //                     this.messageService.add({ severity: 'success', summary: "Template Sent", detail: res.value });
  //                     // this.sendMobile(this.searchValue, '2')
  //                   } else {
  //                     this.messageService.add({ severity: 'warn', summary: 'Template not sent', detail: res.value });
  //                   }
  //                 })
  //               }
  //             })
  //           } else {
  //             this.messageService.add({ severity: 'warn', summary: "Warn", detail: "Please Select Template" });
  //           }
  //           // }
  //         }, err => {
  //         })

  //         this.phnFlag = false;
  //       }   // to open chat or send templete to new no. to open from sidebar
  //       else if (sessionStorage.getItem('phnno')) {
  //         this.searchValue = '91' + sessionStorage.getItem('phnno')

  //         let phnData = {
  //           phoneno: this.searchValue
  //         }

  //         this.chatService.searchFromDB(phnData).subscribe((res: any) => {
  //           // if (res.status == 'Success') { // if no. found all chats will load
  //           // this.sendMobile(res.value, '1');
  //           // } 

  //           // else { // if no. not found in this case template will send on that no.
  //           if (this.selectedTemplateValue) {
  //             this.selectTemplates.forEach((element: any) => {
  //               if (element.tempName == this.selectedTemplateValue) {
  //                 let data: any = {
  //                   LoginUserID: this.agentid,
  //                   userType: this.userType,
  //                   campID: this.campid,
  //                   phoneno: this.searchValue,
  //                   sourcetype: "13",
  //                   templatename: this.selectedTemplateValue,
  //                   isnewContact: "true",
  //                   templatelang: this.templatelang,
  //                   templateText: this.templateText
  //                 }

  //                 this.chatService.sendWhatsAppTemplate(data).subscribe((res: any) => {
  //                   if (res.status == 'Success') {
  //                     this.messageService.add({ severity: 'success', summary: "Template Sent", detail: res.value });
  //                     // this.sendMobile(this.searchValue, '2')
  //                   } else {
  //                     this.messageService.add({ severity: 'warn', summary: 'Template not sent', detail: res.value });
  //                   }
  //                 })
  //               }
  //             })
  //           } else {
  //             this.messageService.add({ severity: 'warn', summary: "Warn", detail: "Please Select Template" });
  //           }
  //           // }
  //         }, err => {
  //         })

  //         this.phnFlag = false;
  //       } else {
  //         this.phnFlag = false;

  //       }
  //     }
  //   });
  // }

  updatednewNumberDialog: any = false;
  newNumber() {
    this.updatednewNumberDialog = true;

    let data = {
      "LoginUserID": this.agentid,
      "userType": this.userType,
      "campID": this.campid
    }
    this.chatService.loadWATemplate(data).subscribe((res: any) => {
      this.selectTemplates = res.data;

      if (this.selectTemplates.length == 1) {
        this.selectedTemplateValue = this.selectTemplates[0].tempName;
        this.templatelang = this.selectTemplates[0].languageCode;
        this.templateText = this.selectTemplates[0].templateText;
      }
    })
  }

  templateText: any;
  loadWATemplate() {
    this.shortSleep = true
    this.longSleep = false
    let data = {
      "LoginUserID": this.agentid,
      "userType": this.userType,
      "campID": this.campid
    }

    this.chatService.loadWATemplate(data).subscribe((res: any) => {
      this.selectTemplates = res.data;
      if (this.selectTemplates.length == 1) {
        this.selectedTemplateValue = this.selectTemplates[0].tempName;
        this.templatelang = this.selectTemplates[0].languageCode;
        this.templateText = this.selectTemplates[0].tempText;
        if (sessionStorage.getItem('myWhatsappStarted') == 'myWhatsappStarted') {
          this.myMainVar = true
        }
        if (this.phnFlag && this.myMainVar) { // to open chat or send templete to new no. to open from sidebar
          if (sessionStorage.getItem('phnno')) {
            this.searchValue1 = '91' + sessionStorage.getItem('phnno')

            let phnData = {
              phoneno: this.searchValue1
            }
            // this.chatService.searchFromDB(phnData).subscribe((res: any) => {
            // if (res.status == 'Success') { // if no. found all chats will load
            this.sendMobile(this.searchValue1, '1');
            // } 


            // else { // if no. not found in this case template will send on that no.
            if (this.selectedTemplateValue) {
              this.selectTemplates.forEach((element: any) => {
                if (element.tempName == this.selectedTemplateValue) {
                  let data: any = {
                    LoginUserID: this.agentid,
                    userType: this.userType,
                    campID: this.campid,
                    phoneno: this.searchValue1,
                    sourcetype: "13",
                    templatename: this.selectedTemplateValue,
                    isnewContact: "true",
                    templatelang: this.templatelang,
                    templateText: this.templateText
                  }

                  sessionStorage.removeItem('myWhatsappStarted')
                  setTimeout(() => {
                    if (this.shortSleep) {
                      this.fetchIntervalsAndCount().pipe(
                        concatMap(({ intervals, count }) => {
                          // Create an observable for each interval with the specified count
                          const intervalObservables = intervals.map((duration, index) =>
                            timer(duration).pipe(
                              tap(() => {
                                this.sendMobile(this.searchValue1, '2');
                              }),
                              finalize(() => {
                                if (index === intervals.length - 1) {
                                  this.shortSleep = false;
                                  this.longSleep = true;
                                  this.startPolling();
                                  this.startChecking();
                                }
                              })
                            )
                          );

                          // Concatenate the observables to ensure they run sequentially
                          return concat(...intervalObservables);
                        }),
                        finalize(() => {
                          // Optionally handle completion here
                        })
                      ).subscribe();
                    }
                  }, 500);
                  this.chatService.sendWhatsAppTemplate(data).subscribe((res: any) => {
                    if (res.status == 'Success') {
                      this.messageService.add({ severity: 'success', summary: "Template Sent", detail: res.value });
                      // this.sendMobile(this.searchValue, '1')
                    } else {
                      this.messageService.add({ severity: 'warn', summary: 'Template not sent', detail: res.value });
                    }
                  })
                }
              })
            } else {
              this.messageService.add({ severity: 'warn', summary: "Warn", detail: "Please Select Template" });
            }
            // }
            // }, err => {
            // })

            this.phnFlag = false;
          }
        }
      }
    })
  }

  sendNewMsg() {
    if (this.selectedTemplateValue) {
      this.selectTemplates.forEach((element: any) => {
        if (element.tempName == this.selectedTemplateValue) {
          let data: any = {
            LoginUserID: this.agentid,
            userType: this.userType,
            campID: this.campid,
            phoneno: `91${this.newNo}`,
            sourcetype: "13",
            templatename: this.selectedTemplateValue,
            // "templatelang": element.languageCode,
            isnewContact: "true",
            templatelang: this.templatelang,
            templateText: element.tempText

          }

          this.chatService.sendWhatsAppTemplate(data).subscribe((res: any) => {
            if (res.status == 'Success') {
              this.updatednewNumberDialog = false;
              this.newNumberDialog = false;
              this.newNo = '';
              this.getAllContacts()
              this.messageService.add({ severity: 'success', summary: "Message Sent", detail: res.value });
            } else {
              this.messageService.add({ severity: 'warn', summary: '', detail: res.value });

            }
          })
        }
      })
    } else {
      this.messageService.add({ severity: 'warn', summary: "Warn", detail: "Please Select Template" });
    }

  }

  searchFromDB() {
    let data = {
      phoneno: '91' + this.searchValue
    }

    this.chatService.searchFromDB(data).subscribe((res: any) => {
      if (res.status == 'Success') {
        this.sendMobile(res.value, '1');

        setTimeout(() => {
          this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
        }, 10000);
        setTimeout(() => {
          this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
        }, 15000);
        // contact selct krne ke baad chat open krni h yha se, uss selected no. ki
        setTimeout(() => {
          if (this.shortSleep) {
            this.fetchIntervalsAndCount().pipe(
              concatMap(({ intervals, count }) => {
                // Create an observable for each interval with the specified count
                const intervalObservables = intervals.map((duration, index) =>
                  timer(duration).pipe(
                    tap(() => {
                      this.sendMobile(res.value, '2');
                    }),
                    finalize(() => {
                      if (index === intervals.length - 1) {
                        this.shortSleep = false;
                        this.longSleep = true;
                        this.startPolling();
                        this.startChecking();
                      }
                    })
                  )
                );

                // Concatenate the observables to ensure they run sequentially
                return concat(...intervalObservables);
              }),
              finalize(() => {
                // Optionally handle completion here
              })
            ).subscribe();
          }
        }, 500);
      } else {
        this.messageService.add({ severity: 'info', summary: "Phone Number not found", detail: '' });
      }
    }, err => {
    })
  }

  filter() {
    const searchTerm = this.searchValue.toLowerCase().trim();
    let data = {
      LoginUserID: this.agentid,
      userType: this.userType,
      campID: this.campid,
      "IsdB": true
    }
    if (!searchTerm) {
      this.chatService.getChatData(data).then(data => {
        this.filteredUsers = data;
      });
    } else {
      this.chatService.getChatData(data).then(data => {
        this.filteredUsers = data.filter((user: any) => {
          const phoneNumber = user.phoneNumber.toLowerCase();
          const firstMessage = user.messages[0]?.toLowerCase();
          return phoneNumber.includes(searchTerm) || firstMessage?.includes(searchTerm);
        });
      });
    }
  }


  completeArray: any[] = [];
  sendMobile(phnNo, loadType) {
    this.activeUser = phnNo; // Set the active tab based on the phone number or user identifier
    if (loadType == '3') {
      this.lastRowid = this.completeArray[0].rowid;
    }

    let data = {
      LoginUserID: this.agentid,
      userType: this.userType,
      campID: this.campid,
      phoneno: phnNo,
      chatcount: "10",
      loadtype: loadType,
      lastRowid: this.lastRowid,
      agentId: this.agentid
    };
    this.number = phnNo;

    if (this.number) {
      this.chatService.getChatMessages(data).subscribe((res: any) => {
        if (loadType == '1') {
          if (res && res.data && res.data.length != 0 && (res.data[0].loadtype == 1 || res.data[0].loadtype == '1')) {
            this.completeArray = [];
            this.completeArray = res.data;
            this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
          }
          this.initialCallMade = true;
          // this.loadtype2Poll();
          this.completeArray.forEach(item => {
            if (!item.isread && item.received) {
              // Make the API call
              this.chatService.messageReadUnread(item.rowid).subscribe((res) => {
                this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
              })
            }
          });
        }

        if (loadType == '2') {
          if (res && res.data && res.data.length != 0) {
            if (res && res.data && res.data.length != 0 && (res.data[0].loadtype == 1 || res.data[0].loadtype == '1')) {
              this.completeArray = res.data;
              this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
            }

            if (res && res.data && res.data.length != 0 && (res.data[0].loadtype == 2 || res.data[0].loadtype == '2')) {
              const filteredData = res.data.filter((item, index, self) =>
                index == self.findIndex((t) => t.rowid == item.rowid)
              );

              filteredData.forEach(item => {
                const existingIndex = this.completeArray.findIndex(existingItem => existingItem.rowid == item.rowid);
                if (existingIndex != -1) {
                  this.completeArray.splice(existingIndex, 1, item);
                }
                else {
                  this.completeArray.push(item);
                }
              });
              this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
            }

            if (res && res.data && res.data.length != 0 && (res.data[0].loadtype == 3 || res.data[0].loadtype == '3')) {
              const filteredData = res.data.filter((item, index, self) =>
                index === self.findIndex((t) => t.rowid === item.rowid)
              );

              filteredData.forEach(item => {
                const existingIndex = this.completeArray.findIndex(existingItem => existingItem.rowid == item.rowid);
                if (existingIndex != -1) {
                  this.completeArray.splice(existingIndex, 1, item);

                } else {
                  this.completeArray.unshift(item);
                }
              });
              // this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
              // Add new condition to hit API if isRead is false and received is true
            }
            this.inTimeOfSendMessage()
            this.onDataReceived(); // Reset interval on data reception
            this.completeArray.forEach(item => {
              if (!item.isread && item.received) {
                // Make the API call
                this.chatService.messageReadUnread(item.rowid).subscribe((res) => {
                  this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
                })
              }
            });
            // this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
          } else {
            this.updateInterval(4)
            // this.lastDataReceivedTime = Date.now();
          }
        }
        if (loadType == '3') {

        }
      });
    }
  }

  loadtype2Poll() {
    // this.initialCallMade = false;
    this.intervalValueGreat = setInterval(() => {
      if (this.initialCallMade && this.longSleep) {
        this.sendMobile(this.number, '2');
      } else {
        this.initialCallMade = true;
      }

    }, 3000);
  }

  onScroll(event: any) {
    const scrollableDiv = event.target as HTMLElement;
    if (scrollableDiv.scrollTop === 0) {
      this.sendMobile(this.number, '3');
    }
  }

  fld_Location_Latitude: any;
  fld_Location_Longitude: any;
  array: any = []
  phoneNumbers: string[] = [];
  forwardMsg(message) {
    this.myForwardDataSend = '';
    this.myForwardDataSend = message
    this.newNumberDialog = true;

    this.fld_Location_Latitude = message.fld_Location_Latitude;
    this.fld_Location_Longitude = message.fld_Location_Longitude;

    let data = {
      LoginUserID: this.agentid,
      userType: this.userType,
      campID: this.campid
    }
    this.chatService.getContacts(data).subscribe((res: any) => {
      const parsedData = JSON.parse(res.data);
      this.array = [];
      for (let val of Object.values(parsedData)) {
        this.array.push(val);
      }
      this.extractPhoneNumbers(parsedData);
    })


  }


  mySendDat: any
  sendData(sendData: any) {
    this.mySendDat = sendData
  }

  replyMsg(message) {
    this.repliedMsg = '';
    this.repliedMsg = message
  }
  followUpMessage(followupmesage) {
    this.mainFollowPopup = true
    this.followUpsMessageDetails = followupmesage
  }

  closeReply() {
    this.repliedMsg = '';
  }

  selectedTemp: any;
  disabledInput: boolean = false;
  tempType: any;
  ftpTempType: any;
  templatename: any = "";


  sendMessage() {
    this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
    let message;
    if (this.isForwadMessage) {
      message = {
        text: this.myForwardDataSend.messageText,
        LoginUserID: this.agentid,
        userType: this.userType,
        campID: this.campid,
        phoneno: this.mysharingContact == true ? `91${this.newNo.phoneNumber}` : `91${this.newNo}`, //original
        // phoneno: this.number, //modified
        sourcetype: "",
        mediatype: this.myForwardDataSend.mediatype ? this.myForwardDataSend.mediatype : '0',
        newphoneno: this.number,
        ftpmediafile: this.myForwardDataSend && this.myForwardDataSend.mediaurl ? this.myForwardDataSend.mediaurl : "",
        templatelang: this.templatelang,
        templatename: this.templatename,
        isForward: this.isForwadMessage ? true : false,
        "rowid": this.myForwardDataSend.rowid,
        "business_AccountID": 0,
        "frdFromRowID": this.myForwardDataSend.frdFromRowID,
        "frdToRowID": this.myForwardDataSend.frdToRowID,
        "frdFirstRowID": this.myForwardDataSend.frdFirstRowID,
        fld_Location_Longitude: this.fld_Location_Longitude,
        fld_Location_Latitude: this.fld_Location_Latitude,
        // contacts:this.myForwardDataSend.fld_Contacts_MiddleName
      }
    }
    else if (this.locationVis) {
      message = {
        // text: this.myForwardDataSend.messageText,
        LoginUserID: this.agentid,
        userType: this.userType,
        campID: this.campid,
        // campID: '96',
        phoneno: this.number,
        sourcetype: "",
        mediatype: '6',
        newphoneno: this.number,
        "business_AccountID": 0,
        fld_Location_Longitude: this.mainTwoVariablesASend.fld_Location_Longitude,
        fld_Location_Latitude: this.mainTwoVariablesASend.fld_Location_Latitude
      }
    }
    else if (this.sendContactSharing) {
      message = {
        // text: this.myForwardDataSend.messageText,
        LoginUserID: this.agentid,
        userType: this.userType,
        campID: this.campid,
        // campID: '96',
        phoneno: this.number,
        // phoneno: this.sendContactSharing ==true ? this.newNoSend.phoneNumber : this.newNoSend,
        sourcetype: "",
        mediatype: '7',
        newphoneno: this.number,
        "business_AccountID": 0,
        contacts: this.selectedContact
      }
    }
    else if (this.repliedMsg) {
      message = {
        text: this.textContent,
        createdAt: new Date().toISOString(),
        LoginUserID: this.agentid,
        userType: this.userType,
        campID: this.campid,
        // campID: '96',
        phoneno: this.number,
        sourcetype: "",
        mediatype: this.myfile && this.myfile.mediatype ? this.myfile.mediatype : "0",
        newphoneno: this.number,
        ftpmediafile: this.myfile && this.myfile.ftpmediafile ? this.myfile.ftpmediafile : "",
        templatelang: this.templatelang,
        templatename: this.templatename,
        replyMsgID: this.repliedMsg.msgID ? this.repliedMsg.msgID : "",
        isReply: this.repliedMsg ? true : false,
        fld_Location_Longitude: this.fld_Location_Longitude,
        fld_Location_Latitude: this.fld_Location_Latitude
      };
    } else if (this.disabledInput) {
      message = {
        text: this.textContent,
        createdAt: new Date().toISOString(),
        LoginUserID: this.agentid,
        userType: this.userType,
        campID: this.campid,
        // campID: '96',
        phoneno: this.number,
        sourcetype: "",
        mediatype: this.tempType,
        newphoneno: this.number,
        ftpmediafile: this.ftpTempType,
        templatelang: this.templatelang,
        templatename: this.templatename,

        templateText: this.templateTexttt,
        fld_Location_Longitude: this.fld_Location_Longitude,
        fld_Location_Latitude: this.fld_Location_Latitude,
        rowID: this.rowIDNew
      };
    } else {
      message = {
        text: this.textContent,
        createdAt: new Date().toISOString(),
        LoginUserID: this.agentid,
        userType: this.userType,
        campID: this.campid,
        // campID: '96',
        phoneno: this.number,
        sourcetype: "",
        mediatype: this.myfile && this.myfile.mediatype ? this.myfile.mediatype : "0",
        ftpmediafile: this.myfile && this.myfile.ftpmediafile ? this.myfile.ftpmediafile : "",
        newphoneno: this.number,
        templatelang: this.templatelang,
        templatename: this.templatename,
        fld_Location_Longitude: this.fld_Location_Longitude,
        fld_Location_Latitude: this.fld_Location_Latitude
      };
    }
    this.myInputFieldDisabled = false
    this.chatService.sendmessage(message).subscribe(
      (response) => {
        if (response.status == "failure") {
          this.messageService.add({ severity: 'warn', summary: response.status, detail: response.value });

        } else {
          this.newNo = ''
          this.inTimeOfSendMessage()
          this.onDataReceived()
          // if (response.status == "Success") {
          this.closeReply();
          this.disabledInput = false;
          this.selectedTemp = '';
          this.templatename = '';
          this.templatelang = '';
          this.locationVis = false;
          this.openValueNew = false
          this.selectedContact = []
          this.sendContactSharing = false
          this.myForwardDataSend = '';
          // if (response.status == 'Success') {
          this.newNumberDialog = false;
          this.disabledInput = false;
          this.isForwadMessage = false;
          // }
          if (this.myfile) {

            this.myfile.mediatype = '';
          }
          this.textContent = '';
          this.file = null;
          // this.fileName = '';
          this.fileName = 'Choose';
          if (this.fileUpload) {
            this.fileUpload.clear();
          }

          this.myfile = '';
          this.clearRecordedData()
          this.showRemove = true;
          this.isForwadMessage = false;
          this.cdr.detectChanges();
          this.fld_Location_Longitude = '';
          this.fld_Location_Latitude = '';



          if (this.isForwadMessage) {
            this.isForwadMessage = false
            this.newNumberDialog = false
          } if (this.repliedMsg) {
            this.repliedMsg = false
          }



        }
      },
      (error) => {
      }
    );


    this.textContent = '';
  }

  removeSelection() {
    this.file = null;
    this.openValueNew = false
    this.fileName = 'File Name';
    this.showRemove = true;
    this.myInputFieldDisabled = false;
    this.myfile = ''
  }

  trigger() {
    let element = document.getElementById('upload_file') as HTMLInputElement;
    element.click();
  }

  onClear() {
    this.textContent = '';
    this.openValueNew = false
    this.myInputFieldDisabled = false
  }


  onChange(file) {
    this.file = file.files[0];
    this.fileName = file.files[0].name;


    if (this.file) {
      // this.fileArr.push(this.selectedExcelFiles);
      this.chatService.saveFile(this.file, this.campid).subscribe((res: any) => {
        this.myfile = res;
        this.showRemove = false;
        this.openValueNew = true
        this.myInputFieldDisabled = true
      });
    }

  }

  getTemplates() {
    let data = {
      "LoginUserID": this.agentid,
      "userType": this.userType,
      "campID": this.campid
    }

    this.chatService.getTemplates(data).subscribe((res: any) => {
      let beforeParsed = res.data;
      this.templateDropdown = JSON.parse(beforeParsed);

    })
  }

  newFun(userDetails) {
    this.shortSleep = true
    this.longSleep = false
    this.mainRowId = userDetails.rowid
    clearInterval(this.intervalValueGreat);
    this.activeUser = userDetails.phoneNumber; // Set the active tab based on the phone number or user identifier
    if (this.ismaskphonenoValue) {
      this.newPhoneNumberDetails = userDetails.maskphoneno
    } else {
      this.newPhoneNumberDetails = userDetails.phoneNumber
    }
    setTimeout(() => {
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
    }, 3000);
    // if(this.shortSleep){
    //   this.subscriptionOne = interval(200).pipe(take(4)).subscribe(value => {
    //     if(value==3){
    //       this.shortSleep = false
    //       this.longSleep = true
    //     }
    //     this.sendMobile(this.number, '2');
    //   });
    // }if (this.shortSleep) {
    if (this.shortSleep) {
      this.fetchIntervalsAndCount().pipe(
        concatMap(({ intervals, count }) => {
          // Create an observable for each interval with the specified count
          const intervalObservables = intervals.map((duration, index) =>
            timer(duration).pipe(
              tap(() => {
                this.sendMobile(this.number, '2');
              }),
              finalize(() => {
                if (index === intervals.length - 1) {
                  this.shortSleep = false;
                  this.longSleep = true;
                  this.startPolling();
                  this.startChecking();
                }
              })
            )
          );

          // Concatenate the observables to ensure they run sequentially
          return concat(...intervalObservables);
        }),
        finalize(() => {
          // Optionally handle completion here
        })
      ).subscribe();
    }
  }

  // disabledInput: boolean = false;
  // tempType: any;
  // ftpTempType: any;
  templateDropdown: any[] = [];
  templateTexttt: any;
  changeTemp() {
    this.templateDropdown.find((x) => {
      if (x.rowID == this.selectedTemp) {
        this.disabledInput = true;

        switch (x.template_type) {
          case 'text':
            this.textContent = x.text;

            this.tempType = '0'
            this.ftpTempType = '0'
            this.templateTexttt = x.templateText
            this.rowIDNew = x.rowID

            break;

          case 'image':
            this.textContent = x.ftpmediafile;
            this.tempType = '1'
            // this.ftpTempType = '1'
            this.ftpTempType = x.ftpmediafile
            this.myfile = x.ftpmediafile
            this.myfile.ftpmediafile = x.ftpmediafile
            this.templateTexttt = x.templateText
            this.rowIDNew = x.rowID

            break;

          case 'document':
            this.textContent = x.ftpmediafile;
            this.tempType = '2'
            this.ftpTempType = '2'
            this.templateTexttt = x.templateText
            this.rowIDNew = x.rowID


            break;

          case 'audio':
            this.textContent = x.ftpmediafile;
            this.tempType = '4'
            this.ftpTempType = '4'
            this.templateTexttt = x.templateText
            this.rowIDNew = x.rowID


            break;

          case 'video':
            this.textContent = x.ftpmediafile;
            this.tempType = '3'
            this.ftpTempType = '3'
            this.templateTexttt = x.templateText
            this.rowIDNew = x.rowID

            break;

          case 'template':
            this.textContent = x.templatename;
            this.templatelang = x.templatelang;
            this.templatename = x.templatename

            this.tempType = '5'
            this.ftpTempType = '5'
            this.templateTexttt = x.templateText
            this.rowIDNew = x.rowID


            break;
        }
      }
    })

  }

  logSelectedContact(event) {
    this.newNo = '';
    this.newNo = event;
  }
  onChangeDataForward(val){
if(val.value.phoneNumber){
   this.newNo = val.value.phoneNumber
}else{
   this.newNo = val.value
}
  }
  sendForward() {
    this.isForwadMessage = true
    if (this.isForwadMessage == true) {
      this.sendMessage()
    }
  }

  onSelectMaps(json) {
    if (json.messagetype == 'location') {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${json.fld_Location_Latitude},${json.fld_Location_Longitude}`;
      window.open(mapsUrl, '_blank');
    }
  }
  sendSession(inchat) {
    this.sessionStatus = inchat;
    // this.activeUser = inchat; // Set the active tab based on the inchat value or user identifier
  }


  sessionClose(mobile: any) {
    if (confirm("Are you Sure want to Close Chat ?") == true) {
      let data = {
        LoginUserID: this.agentid,
        userType: this.userType,
        campID: this.campid,
        // campID: '96',
        phoneno: mobile
      }

      this.chatService.sessionClose(data).subscribe((res: any) => {
        this.messageService.add({ summary: 'info', severity: res.status, detail: res.message });
      })
    }
  }
  // urlExtention:any
  // checkutl
  atagTrue: boolean = false
  selectedDateRange: any;
  flw_StartTime: any;
  flw_EndTime: any;

  selectFloowup() {
    let body = {
      "LoginUserID": this.agentid,
      "userType": this.userType,
      "campID": this.campid,
      "phoneno": this.number,
      "sourcetype": "13",
      "flw_StartTime": this.flw_StartTime,
      "flw_EndTime": this.flw_EndTime,
      "rowid": this.followUpsMessageDetails.rowid ? this.followUpsMessageDetails.rowid : ""
    }

    this.chatService.sendFollowUp(body).subscribe((res: any) => {
      if (res.status == 'Success') {
        this.mainFollowPopup = false
        this.messageService.add({ severity: 'success', summary: "Follow-up", detail: 'Follow-up initiated successfully.' });
      } else {
        this.messageService.add({ severity: 'warn', summary: "Warn", detail: res.value });
      }
    })
  }

  selectDates() {
    // this.flw_StartTime = this.rangeDates[0];
    // this.flw_EndTime = this.rangeDates[1];

    const flw_StartTime = new Date(this.rangeDates[0]);
    const flw_EndTime = new Date(this.rangeDates[1]);

    flw_StartTime.setTime(flw_StartTime.getTime() - 1000 * 60 * 60 * 24);
    flw_EndTime.setTime(flw_EndTime.getTime() - 1000 * 60 * 60 * 24);

    const formattedDate1 = `${flw_StartTime.getFullYear()}-${String(flw_StartTime.getMonth() + 1).padStart(2, '0')}-${String(flw_StartTime.getDate()).padStart(2, '0')} 12:26:44.000`;
    const formattedDate2 = `${flw_EndTime.getFullYear()}-${String(flw_EndTime.getMonth() + 1).padStart(2, '0')}-${String(flw_EndTime.getDate()).padStart(2, '0')} 12:26:44.000`;

    this.flw_StartTime = formattedDate1;
    this.flw_EndTime = formattedDate2;

  }
  sendContactDetails: any
  myContactDetails(itemValue) {
    this.sendContactDetails = itemValue.rowid
    this.chatService.getContactsDetails(this.sendContactDetails).subscribe((res) => {
      if (res.data) {
        let newData = JSON.parse(res.data)
        this.mainContactDetailsArr = newData
      } else {
        this.mainContactDetailsArr = []
      }
    })
    this.visible = true;
  }
  public lat;
  public lng;

  getLocation() {
    this.loadLocationContacts()
    this.locationVis = true
  }

  sendContactDEatisl() {
    this.sendContactSharing = true
    let data = {
      LoginUserID: this.agentid,
      userType: this.userType,
      campID: this.campid
    }
    this.chatService.getContacts(data).subscribe((res: any) => {
      const parsedData = JSON.parse(res.data);
      this.array = [];
      for (let val of Object.values(parsedData)) {
        this.array.push(val);
      }
      this.extractPhoneNumbers(parsedData);
      this.matchPhoneNumbersAndNames(parsedData);
    })
  }
  matchedContacts: any[] = [];
  extractPhoneNumbers(data: any): void {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        this.forwardContacts.push({ phoneNumber: `${key}` });
      }
    }
  }
  matchPhoneNumbersAndNames(data: any): void {
    this.matchedContacts = [];

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const contact = data[key];
        const phone = key;

        const matchingContact = this.array.find((contact: any) =>
          contact.phones.some((phoneObj: any) => phoneObj.phone === phone)
        );

        if (matchingContact) {
          const name = matchingContact.name.formatted_name;
          this.matchedContacts.push({ phone, name });
        } else {
          this.matchedContacts.push({ phone, name: 'Unknown' });
        }
      }
    }
  }
  onChangeData(event) {
    const selectedPhoneNumber = event.value.phone;
    this.mysharingContact = true
    let data = this.array.find((contact: any) => contact.phones.some((phone: any) => phone.phone === selectedPhoneNumber));
    this.selectedContact.push(data)
  }
  checkValueNew(event) {
    this.mainTwoVariablesASend = event.value
  }



  // Method to filter and show suggestions
  newFunction() {
    const atSymbolIndex = this.textContent.lastIndexOf('@');
    if (atSymbolIndex !== -1 && atSymbolIndex === this.textContent.length - 1) {
      const searchText = this.textContent.substring(atSymbolIndex + 1);
      this.suggestions = this.templateDropdown.filter(template =>
        template.templateText.toLowerCase().includes(searchText.toLowerCase())
      );
      this.showSuggestions = this.suggestions.length > 0;
    } else {
      this.showSuggestions = false;
    }
    this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;

  }

  // Method to handle the selection of a suggestion
  selectSuggestion(suggestion: string) {
    const atSymbolIndex = this.textContent.lastIndexOf('@');
    this.textContent = this.textContent.substring(0, atSymbolIndex + 1) + suggestion + ' ';
    this.showSuggestions = false;
  }
  changeTempValue(event) {
    this.showSuggestions = false;
    this.templateDropdown.find((x) => {
      if (x.rowID == this.selectedTemp1.rowID) {
        this.disabledInput = true;

        switch (x.template_type) {
          case 'text':
            this.textContent = x.text;

            this.tempType = '0'
            this.ftpTempType = '0'
            this.templateTexttt = x.templateText
            this.rowIDNew = x.rowID

            break;

          case 'image':
            this.textContent = x.ftpmediafile;
            this.tempType = '1'
            // this.ftpTempType = '1'
            this.ftpTempType = x.ftpmediafile
            this.myfile = x.ftpmediafile
            this.myfile.ftpmediafile = x.ftpmediafile
            this.templateTexttt = x.templateText
            this.rowIDNew = x.rowID

            break;

          case 'document':
            this.textContent = x.ftpmediafile;
            this.tempType = '2'
            this.ftpTempType = '2'
            this.templateTexttt = x.templateText
            this.rowIDNew = x.rowID

            break;

          case 'audio':
            this.textContent = x.ftpmediafile;
            this.tempType = '4'
            this.ftpTempType = '4'
            this.templateTexttt = x.templateText
            this.rowIDNew = x.rowID


            break;

          case 'video':
            this.textContent = x.ftpmediafile;
            this.tempType = '3'
            this.ftpTempType = '3'
            this.templateTexttt = x.templateText
            this.rowIDNew = x.rowID

            break;

          case 'template':
            this.textContent = x.templatename;
            this.templatelang = x.templatelang;
            this.templatename = x.templatename

            this.tempType = '5'
            this.ftpTempType = '5'
            this.templateTexttt = x.templateText
            this.rowIDNew = x.rowID

            break;
        }
      }
    })


  }

  sendUploadDetails() {
    this.openValueNew = true
  }


  // for recording start
  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording(this.campid);
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.newRecordValue = false
    this.setMyFIleAudio = ''
    this.blobUrl = null;
  }
  download(): void {
    const url = window.URL.createObjectURL(this.teste.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = this.teste.title;
    link.click();
  }

  // recording step end

  // for make call and redial number value 
  RedialNumber() {


    if (`91${this.redialCheckNumber}` == this.number) {
      this.myredialTrue = true
      if (this.myredialTrue) {
        sessionStorage.setItem('redialFromWhatsapp', 'true')
      }
    } else {
      let numberValue = this.number;
      if (numberValue.startsWith('91')) {
        numberValue = numberValue.substring(2); // Remove the country code '91'
      }
      sessionStorage.setItem('redialFromWhatsapp', 'trueOne')
      sessionStorage.setItem('getNumberFromWh', numberValue);
    }
  }
  emaildialogTrue() {
    sessionStorage.setItem('openN', 'open')
    this.sharedService.socialMediaDetected('email');
    this.emailPopUpTrueFalse = true
    let oneValue = 'somya.tyagi@novusconnect.in'
    if (oneValue.includes('.com') || oneValue.includes('.net') || oneValue.includes('.in') || oneValue.includes('.org') || oneValue.includes('.co.uk') || oneValue.includes('.hotmail') || oneValue.includes('.co.jp')) {
      const newValuseSEnd = oneValue.toLowerCase()
      this.addText(newValuseSEnd)
    }

    // if(this.emailPopUpTrueFalse){
    // }
    // this.chatService.socialMediaDetected('email')
  }


  ngOnDestroy(): void {
    this.abortRecording();
    clearInterval(this.intervalValueGreat);
    if (this.subscriptionOne) {
      this.subscriptionOne.unsubscribe();
    }
  }

  // email functions
  getSignature() {
    if (sessionStorage.getItem('fld_SMTP_ID1') && sessionStorage.getItem('fld_SMTP_ID1') == this.signature_smtpData.value) {
      this.signature = this.signature_smtpData.signature;
    }
    else {
      let data = {
        loginUserID: this.agentid,
        campID: this.campid,
      }

      this.mailService.getSignature(JSON.stringify(data)).subscribe((res: any) => {
        this.signature_smtpData = res.value;

        let signature = JSON.parse(this.signature_smtpData)


        this.accountDropdown = signature;
        this.newMail.from = this.accountDropdown[0].value;
        this.cdr.detectChanges();

        this.signature = signature[0].signature;



      })
    }
  }
  chanegAc(value) {


    this.getSignature();
  }
  extractEmails(data: any[]): string[] {
    let extractedEmails: string[] = [];

    data.forEach(item => {
      let emailString = item.EMAILNAME;
      let emails = emailString.split(','); // Split by comma if multiple emails are present

      emails.forEach(email => {
        const match = email.match(/<([^>]+)>/);
        if (match) {
          extractedEmails.push(match[1].trim()); // Add the email inside the <>
        } else {
          extractedEmails.push(email.trim()); // Add the email as it is
        }
      });
    });

    return extractedEmails;
  }
  filteredMails: any[] = [];
  selectedItems: any[] = [];
  addText(emailV) {
    const email = emailV.trim();
    if (email) {
      if (email.includes('@')) {
        this.selectedItems.push(email);
        this.generateResult();
        this.newMail.to = '';
        this.filteredMails = [];
      } else {
        alert('Please enter a valid email address.');
      }
    }
  }

  onSelect(item: any) {
    if (!this.selectedItems.includes(item.name)) {
      this.selectedItems.push(item.name);
      this.generateResult()
      this.newMail.to = '';
      this.filteredMails = [];
    }
  }
  generateResult() {
    this.resultArray = [...this.selectedItems];

    // Check if there are multiple email addresses
    if (this.resultArray.length > 1) {
      // Join multiple email addresses with commas
      this.emailStringData = this.resultArray.join(',');
      // Add double quotes at the beginning and end
      this.emailStringData = this.emailStringData;
    } else {
      // Only one email address, send it as is
      this.emailStringData = this.resultArray[0];
    }


  }

  filterMails() {
    const query = this.newMail.to.toLowerCase();

    let oneValue = query
    if (query) {
      this.filteredMails = this.selectedMailsTo.filter(mail => mail.name.toLowerCase().includes(query));
    } else {
      this.filteredMails = [];
    }


  }
  clearInput() {
    this.newMail.to = '';
  }
  onAddE(event) {

    this.addText(event.value)
  }
  onRemoveE(event) {


    this.resultArray = this.resultArray.filter(email => email !== event.value);
    this.selectedItems = this.resultArray.filter(email => email !== event.value);

    this.generateResult()
  }


  updateValueNew() {
    let oneValue = this.newMail.to
    if (oneValue.includes('.com') || oneValue.includes('.net') || oneValue.includes('.in') || oneValue.includes('.org') || oneValue.includes('.co.uk') || oneValue.includes('.hotmail') || oneValue.includes('.co.jp')) {
      const newValuseSEnd = oneValue.toLowerCase()
      this.addText(newValuseSEnd)
    }

  }
  newValueDetails() {
    const query = this.newMail.to.toLowerCase();
    this.addText(query)
  }


  //   for cc emails
  filteredMailsCC: any[] = [];
  selectedItemsCC: any[] = [];
  resultArrayCC: string[] = [];
  addTextCC(emailV) {
    // if (this.newMail.to.trim()) {
    //   this.selectedItems.push(this.newMail.to);
    //   this.generateResult()
    //   this.newMail.to = '';
    // }
    const email = emailV.trim();
    if (email) {
      if (email.includes('@')) {
        this.selectedItemsCC.push(email);
        this.generateResultCC();
        this.fld_CC = '';
        this.filteredMailsCC = [];
      } else {
        // Handle the case where there is no '@' in the email
        alert('Please enter a valid email address.');
      }
    }
  }

  onSelectCC(item: any) {
    if (!this.selectedItemsCC.includes(item.name)) {
      this.selectedItemsCC.push(item.name);
      this.generateResultCC()
      this.fld_CC = '';
      this.filteredMailsCC = [];
    }
  }
  generateResultCC() {
    this.resultArrayCC = [...this.selectedItemsCC];

    // Check if there are multiple email addresses
    if (this.resultArrayCC.length > 1) {
      // Join multiple email addresses with commas
      this.emailStringDataCC = this.resultArrayCC.join(',');
      // Add double quotes at the beginning and end
      this.emailStringDataCC = this.emailStringDataCC;
    } else {
      // Only one email address, send it as is
      this.emailStringDataCC = this.resultArrayCC[0];
    }


  }

  filterMailsCC() {
    const query = this.fld_CC.toLowerCase();

    if (query) {
      this.filteredMailsCC = this.selectedMailsTo.filter(mail => mail.name.toLowerCase().includes(query));
    } else {
      this.filteredMailsCC = [];
    }
  }
  clearInputCC() {
    this.fld_CC = '';
  }
  onAddECC(event) {

    this.addTextCC(event.value)
  }
  onRemoveECC(event) {


    this.resultArrayCC = this.resultArrayCC.filter(email => email !== event.value);
    this.selectedItemsCC = this.resultArrayCC.filter(email => email !== event.value);

    this.generateResultCC()
  }

  updateValueNewCC() {
    let oneValue = this.fld_CC
    if (oneValue.includes('.com') || oneValue.includes('.net') || oneValue.includes('.in') || oneValue.includes('.org') || oneValue.includes('.co.uk') || oneValue.includes('.hotmail') || oneValue.includes('.co.jp')) {
      const newValuseSEnd = oneValue.toLowerCase()
      this.addTextCC(newValuseSEnd)
    }
  }

  newValueDetailsCC() {
    const query = this.fld_CC.toLowerCase();
    this.addTextCC(query)
  }

  //   for bccc emails
  filteredMailsBCC: any[] = [];
  selectedItemsBCC: any[] = [];
  resultArrayBCC: string[] = [];
  addTextBCC(emailV) {
    // if (this.newMail.to.trim()) {
    //   this.selectedItems.push(this.newMail.to);
    //   this.generateResult()
    //   this.newMail.to = '';
    // }
    const email = emailV.trim();
    if (email) {
      if (email.includes('@')) {
        this.selectedItemsBCC.push(email);
        this.generateResultBCC();
        this.fld_BCC = '';
        this.filteredMailsCC = [];
      } else {
        // Handle the case where there is no '@' in the email
        alert('Please enter a valid email address.');
      }
    }
  }

  onSelectBCC(item: any) {
    if (!this.selectedItemsBCC.includes(item.name)) {
      this.selectedItemsBCC.push(item.name);
      this.generateResultBCC()
      this.fld_CC = '';
      this.filteredMailsBCC = [];
    }
  }
  generateResultBCC() {
    this.resultArrayBCC = [...this.selectedItemsBCC];

    // Check if there are multiple email addresses
    if (this.resultArrayBCC.length > 1) {
      // Join multiple email addresses with commas
      this.emailStringDataBCC = this.resultArrayBCC.join(',');
      // Add double quotes at the beginning and end
      this.emailStringDataBCC = this.emailStringDataBCC;
    } else {
      // Only one email address, send it as is
      this.emailStringDataBCC = this.resultArrayBCC[0];
    }


  }

  filterMailsBCC() {
    const query = this.fld_BCC.toLowerCase();

    if (query) {
      this.filteredMailsBCC = this.selectedMailsTo.filter(mail => mail.name.toLowerCase().includes(query));
    } else {
      this.filteredMailsBCC = [];
    }
  }
  clearInputBCC() {
    this.fld_BCC = '';
  }
  onAddEBCC(event) {

    this.addTextBCC(event.value)
  }
  onRemoveEBCC(event) {


    this.resultArrayBCC = this.resultArrayBCC.filter(email => email !== event.value);
    this.selectedItemsBCC = this.resultArrayBCC.filter(email => email !== event.value);

    this.generateResultBCC()
  }

  updateValueNewBCC() {
    let oneValue = this.fld_BCC
    if (oneValue.includes('.com') || oneValue.includes('.net') || oneValue.includes('.in') || oneValue.includes('.org') || oneValue.includes('.co.uk') || oneValue.includes('.hotmail') || oneValue.includes('.co.jp')) {

      const newValuseSEnd = oneValue.toLowerCase()
      this.addTextBCC(newValuseSEnd)
    }
  }

  newValueDetailsBCC() {
    const query = this.fld_BCC.toLowerCase();
    this.addTextBCC(query)
  }
  getTemplate() {
    let data = {
      campID: this.campid,
      sourcetype: "1"
    }

    this.mailService.getTemplateData(JSON.stringify(data)).subscribe((res: any) => {
      this.templateArr = res.listTemplates;
    })
  }

  selectedReplyTemplate(event: any) {
    if (event.value != null) {
      this.newMail.message = event.value;
    }
    else {
      this.newMail.message = "";
    }
  }
  uploadedFiles = [];
  successfulFileUploadResponse: any;
  onUpload(event: any) {

    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  uploadHandler(file: any) {
    let campid = this.campid
    this.mailService.onFileUpload(file.files, campid).subscribe((res: any) => {
      this.successfulFileUploadResponse = res;
      if (res.status == 'success') {
        this.messageService.add({ severity: 'info', summary: res.status, detail: 'File Uploaded Successfully' });
        this.uploadedFiles = [];
        this.onUpload(file);

      }
      else {
        this.messageService.add({ severity: 'info', summary: res.status, detail: res.status });
      }

    })
  }

  listOfTo() {
    this.mailService.getsmtpId(this.campid).subscribe(details => {
      this.mailService.getemailList(this.campid, details.fld_SMTP_ID).subscribe((res: any) => {
        let selectedMailsTo = this.extractEmails(res.data);
        this.selectedMailsTo = selectedMailsTo.map(email => {
          return { 'name': email };
        });
      })
    })

  }
  isauto: boolean = true;
  sendMail() {
    this.mailService.getsmtpId(this.campid).subscribe(details => {
      // this.smtpid = details.fld_SMTP_ID;
      // sessionStorage.setItem('fld_SMTP_ID1',this.smtpid)
      // this.FromID = details.fld_From

      this.accountDropdown.find((x: any) => {
        if (this.newMail.from == x.value) {
          this.smtpid = x.value;
          this.FromID = x.label;
        }
      })

      if (details.status == 'Success') {


        if (this.successfulFileUploadResponse == undefined || this.successfulFileUploadResponse.listAttachFilesPath == undefined || this.successfulFileUploadResponse.listAttachFiles == undefined) {
          this.successfulFileUploadResponse = [];
          this.successfulFileUploadResponse.listAttachFilesPath = [];
          this.successfulFileUploadResponse.listAttachFiles = [];
        }

        let composeData = {
          fld_SMTP_ID: this.smtpid,
          loginUserID: this.agentid,
          campID: this.campid,
          fld_From: this.FromID,
          fld_RepForwSubject: this.newMail.title,
          fld_ReplyText: this.newMail.message,
          fld_TicketID: this.ticketNo ? this.ticketNo : '0',
          fld_To: this.emailStringData,
          // fld_To: this.newMail.to[0]['name'],
          userType: this.userType,
          listAttachFilesPath: this.successfulFileUploadResponse.listAttachFilesPath !== undefined ? this.successfulFileUploadResponse.listAttachFilesPath : '',
          listAttachFiles: this.successfulFileUploadResponse.listAttachFiles !== undefined ? this.successfulFileUploadResponse.listAttachFiles : '',
          // fld_CC: this.fld_CC,
          fld_CC: this.emailStringDataCC,
          // fld_BCC: this.fld_BCC,
          fld_BCC: this.emailStringDataBCC,
          isauto: this.isauto
        }


        this.mailService.saveComposeEmail(JSON.stringify(composeData)).subscribe((res: any) => {

          this.messageService.add({ severity: 'info', summary: res.status, detail: res.value });
          // this.router.navigate(['/iCallMate-cCP/email/inbox'])
          this.mailService.emailUpdateSend();
          this.newMail.title = '';
          this.newMail.message = '';
          this.newMail.to = '';
          this.emailStringData = '';
          this.uploadedFiles = [];
          this.signature = '';
          this.emailStringDataBCC = '';
          this.fld_BCC = '';
          this.fld_CC = '';
          this.emailStringDataCC = '';
          this.isauto = false;
          this.resultArray = []
          this.resultArrayCC = []
          this.resultArrayBCC = []
          let xyz = document.getElementsByClassName("p-fileupload-row") as HTMLCollectionOf<HTMLElement> | null;
          for (let i = 0; i < xyz.length; i++) {
            xyz[i].style.display = 'none';
          }

          // this.getDynamicFormFields();
        }, err => {

        })
        // this.newTicketFlag = false
      }
      else {
        this.messageService.add({ severity: 'info', summary: details.status, detail: details.message });
      }
    });
  }
  settimeOutFun() {
    setInterval(() => {
      if (sessionStorage.getItem('indexingCheckValue') == 'NONWHATSAPPTAB') {
        this.removeIntervalAfterCloseTab()
        this.sideBarMange1 = true
      } else if (sessionStorage.getItem('indexingCheckValue') == 'WHATSAPPTAB' && this.number) {
        // this.initialCallMade = true
        // this.loadtype2Poll()
        // setTimeout(() => {
        //   sessionStorage.removeItem('indexingCheckValue')
        // }, 2000);
      }
    }, 1000);
  }
  ngAfterViewInit() {
    // Add a click event listener to email links
    this.renderer.listen('document', 'click', (event) => {
      if (event.target && event.target.classList.contains('email-link')) {
        const email = event.target.getAttribute('data-email');
        this.handleEmailClick(email);
      }
    });
  }
  handleEmailClick(email: string) {


    this.emailPopUpTrueFalse = true

    // Perform any additional actions you need here
  }
  gettingValue: any
  getMessageDetailsNew(getValue) {
    this.selectedItems = []
    // this.newTicket()
    this.gettingValue = getValue
    setTimeout(() => {
      if (this.emailPopUpTrueFalse) {
        this.getSignature();
        this.listOfTo();
        let oneValue = getValue.messageText
        if (oneValue.includes('.com') || oneValue.includes('.net') || oneValue.includes('.in') || oneValue.includes('.org') || oneValue.includes('.co.uk') || oneValue.includes('.hotmail') || oneValue.includes('.co.jp')) {
          const newValuseSEnd = oneValue.toLowerCase()
          this.addText(newValuseSEnd)
        }

      }
    }, 1000);
  }
  newTicketFlag1: boolean = false;
  getNewDetails(value) {
    this.sideBarMange = true
    this.getDynamicFormFields();

    this.ticketValue = value
    if (this.ticketValue.ticketid != 0) {
      // this.getUdatedDialogData =true
      // this.newTicketValueOPenT = true
      // let ticketData = {
      //   ticketid: this.ticketValue.ticketid,
      //   campid: this.campid,
      //   // custid: this.phoneid
      // }
      let ticketd = this.ticketValue.ticketid ? this.ticketValue.tickeid : this.ticketValue.ticketID
      // // this.getTicketInformation(ticketData);
      this.mailService.getTicketHistoryData(this.campid, ticketd).subscribe((res: any) => {
        this.ticketTypeHistory = res.value;
        this.showTicketCard = true;
        this.showSaveButton = false;
        this.showUpdateButton = true;
        this.disabledTicketFields = true;
        if (this.ticketTypeHistory) {
          this.ticketRecords = res.value[0];

          // voice file
          this.voicefile = res.value[0].voicefile;

          this.phoneid = this.ticketRecords.phoneID
          this.ticketNo = this.ticketValue.ticketid;
          this.sourceName = this.ticketRecords.sourceName;
          this.ticketCampaignName = this.ticketRecords.campName;
          this.actionNo = this.ticketRecords.action_No;
          this.ticketTime = this.ticketRecords.ticket_Time;
          this.ticketDuration = this.ticketRecords.ticketTime;
          this.selectedAssignedBy = this.ticketRecords.assignedByID;
          this.selectedticketStatus = this.ticketRecords.ticket_statusID;
          this.getTicketStatus();
          this.getTicketTypeData();
          this.agentRemarks = this.ticketRecords.remarks;
          this.ticketTypeDropdownData[0] = this.ticketRecords.listTicketTypes; // for multi level dropdown
          // 
          this.selectedTicketType[0] = this.ticketRecords.ticket_TypeID; // for multi level dropdown

          this.ticketID = this.ticketValue.ticketid; // by rajat
          if (this.phoneid) {
            this.getDynamicLeadCustField();
          }
        }
      });

    } else {
      // this.newTicketFlag = true;
      let ticketId = 0;
      this.ticketFields = [];
      let formatedDate = new Date();
      this.showDynaTicketCard = false;
      this.ticketStartTimeUpdate = this.datePipe.transform(formatedDate, 'yyyy-MM-dd HH:mm:ss.S');
      if (this.showTicketCard == false) {
        this.showSaveButton = true;
        this.showUpdateButton = false;
        this.disabledTicketFields = false;
        this.getTicketTypeData();
        this.tree = "";
        this.ticketNo = 0;
        this.actionNo = 0;
        this.ticketCampaignName = sessionStorage.getItem('campName');
        this.selectedAssignedBy = sessionStorage.getItem('agentId');
        this.showTicketCard = true;
      }
      else {
        this.showSaveButton = true;
        this.showUpdateButton = false;
        this.disabledTicketFields = false;
        this.selectedticketStatus = 0;
        this.getTicketStatus();
        this.agentRemarks = "";
        this.getTicketTypeData();
        this.tree = "";
        this.ticketNo = 0;
        this.actionNo = 0;
      }
    }
  }
  newTicket() {
    this.newTicketFlag1 = true
    if (this.newTicketFlag1) {
      this.getNewDetails(this.gettingValue)
    }
    // this.getNewDetails()
  }

  formatPhoneNumber(phoneNumber: any): any {

    if (phoneNumber == 'Contact Not Found' || phoneNumber == '91null') {
      return
    } else {
      const visibleDigits = 7;  // Number of visible digits at the start
      const visiblePart = phoneNumber.substring(0, visibleDigits);
      const hiddenPart = '*'.repeat(phoneNumber.length - visibleDigits);
      return visiblePart + hiddenPart;
    }

    // return this.number
  }

  // Ticket functions added

  newTicketValueOPenT: boolean = false
  getUdatedDialogData: boolean = false
  ticketOpen(value) {
    this.ticketHistoryValueOpen = false;
    this.getDynamicFormFields();

    this.ticketValue = value
    if (this.ticketValue.ticketid != 0) {
      this.sideBarMange = true
      this.getUdatedDialogData = true
      // this.newTicketValueOPenT = true
      // let ticketData = {
      //   ticketid: this.ticketValue.ticketid,
      //   campid: this.campid,
      //   // custid: this.phoneid
      // }
      let ticketd = this.ticketValue.ticketid ? this.ticketValue.tickeid : this.ticketValue.ticketID
      // // this.getTicketInformation(ticketData);
      this.mailService.getTicketHistoryData(this.campid, ticketd).subscribe((res: any) => {
        this.ticketTypeHistory = res.value;
        this.showTicketCard = true;
        this.showSaveButton = false;
        this.showUpdateButton = true;
        this.disabledTicketFields = true;
        if (this.ticketTypeHistory) {
          this.ticketRecords = res.value[0];

          // voice file
          this.voicefile = res.value[0].voicefile;

          this.phoneid = this.ticketRecords.phoneID
          this.ticketNo = this.ticketValue.ticketid;
          this.sourceName = this.ticketRecords.sourceName;
          this.ticketCampaignName = this.ticketRecords.campName;
          this.actionNo = this.ticketRecords.action_No;
          this.ticketTime = this.ticketRecords.ticket_Time;
          this.ticketDuration = this.ticketRecords.ticketTime;
          this.selectedAssignedBy = this.ticketRecords.assignedByID;
          this.selectedticketStatus = this.ticketRecords.ticket_statusID;
          this.getTicketStatus();
          this.getTicketTypeData();
          this.agentRemarks = this.ticketRecords.remarks;
          this.ticketTypeDropdownData[0] = this.ticketRecords.listTicketTypes; // for multi level dropdown
          // 
          this.selectedTicketType[0] = this.ticketRecords.ticket_TypeID; // for multi level dropdown

          this.ticketID = this.ticketValue.ticketid; // by rajat
          if (this.phoneid) {
            this.getDynamicLeadCustField();
          }
        }
      });

    } else {
      this.sideBarMange = false
      this.newTicketFlag = true;
      let ticketId = 0;
      this.ticketFields = [];
      let formatedDate = new Date();
      this.showDynaTicketCard = false;
      this.ticketStartTimeUpdate = this.datePipe.transform(formatedDate, 'yyyy-MM-dd HH:mm:ss.S');
      if (this.showTicketCard == false) {
        this.showSaveButton = true;
        this.showUpdateButton = false;
        this.disabledTicketFields = false;
        this.getTicketTypeData();
        this.tree = "";
        this.ticketNo = 0;
        this.actionNo = 0;
        this.ticketCampaignName = sessionStorage.getItem('campName');
        this.selectedAssignedBy = sessionStorage.getItem('agentId');
        this.showTicketCard = true;
      }
      else {
        this.showSaveButton = true;
        this.showUpdateButton = false;
        this.disabledTicketFields = false;
        this.selectedticketStatus = 0;
        this.getTicketStatus();
        this.agentRemarks = "";
        this.getTicketTypeData();
        this.tree = "";
        this.ticketNo = 0;
        this.actionNo = 0;
      }
    }

  }
  newTicketOpen() {
    this.ticketHistoryValueOpen = false;
    this.getDynamicFormFields();
    this.sideBarMange = false
    this.newTicketFlag = true;
    let ticketId = 0;
    this.ticketFields = [];
    let formatedDate = new Date();
    this.showDynaTicketCard = false;
    this.ticketStartTimeUpdate = this.datePipe.transform(formatedDate, 'yyyy-MM-dd HH:mm:ss.S');
    if (this.showTicketCard == false) {
      this.showSaveButton = true;
      this.showUpdateButton = false;
      this.disabledTicketFields = false;
      this.getTicketTypeData();
      this.tree = "";
      this.ticketNo = 0;
      this.actionNo = 0;
      this.ticketCampaignName = sessionStorage.getItem('campName');
      this.selectedAssignedBy = sessionStorage.getItem('agentId');
      this.showTicketCard = true;
    }
    else {
      this.showSaveButton = true;
      this.showUpdateButton = false;
      this.disabledTicketFields = false;
      this.selectedticketStatus = 0;
      this.getTicketStatus();
      this.agentRemarks = "";
      this.getTicketTypeData();
      this.tree = "";
      this.ticketNo = 0;
      this.actionNo = 0;
    }
  }
  closeNewnewTicketValueOPenT() {
    this.newTicketValueOPenT = false
  }
  async getTicketInformation(ticketData) {


    const res = await this.mailService.getTicketInfo(JSON.stringify(ticketData)).toPromise();
    if (res.status == "Success") {
      this.showTicketCard = true;
      this.showSaveButton = false;
      this.showUpdateButton = true;
      this.disabledTicketFields = true;
      this.ticketRecordsValueComman = res.ticketRecords
      if (res.ticketRecords.length != 0) {
        this.ticketRecords = res.ticketRecords[0];


        // voice file
        this.voicefile = res.ticketRecords[0].voicefile;


        this.ticketNo = this.ticketRecords.ticketID;
        // if (sessionStorage.getItem('extn_set') == 'Idle' && this.ticketRecords.sourceName == 'Voice') {
        //     this.sourceName = 'Offline';
        // }
        // else {
        //     this.sourceName = this.ticketRecords.sourceName;
        // }

        this.sourceName = this.ticketRecords.sourceName;
        this.ticketCampaignName = this.ticketRecords.campName;
        this.actionNo = this.ticketRecords.action_No;
        this.ticketTime = this.ticketRecords.ticket_Time;
        this.ticketDuration = this.ticketRecords.ticketTime;
        this.selectedAssignedBy = this.ticketRecords.assignedByID;
        this.selectedticketStatus = this.ticketRecords.ticket_statusID;
        this.getTicketStatus();
        this.agentRemarks = this.ticketRecords.remarks;
        this.ticketTypeDropdownData[0] = this.ticketRecords.listTicketTypes; // for multi level dropdown

        this.selectedTicketType[0] = this.ticketRecords.ticket_TypeID; // for multi level dropdown



        this.ticketID = this.ticketRecords.ticketID; // by rajat

        let data = res.objticketDynaField;


        if (data.length != 0 && Object.keys(data).length !== 0) {

          this.showDynaTicketCard = true;
          this.ticketFields = Object.values(data);
          let ticketFields = this.ticketFields;

          this.ticketFields = ticketFields.sort((a, b) => a.reportDisplaySeqNo - b.reportDisplaySeqNo);



          this.showDynaTicketCard = true;
          let formGroupControls = {};
          for (let field of this.ticketFields) {
            formGroupControls[field.fld_FieldName] = [field.value || ''];
            if (field.value == 'MultiCheckBox') {
              formGroupControls[field.fld_FieldName] = [[]];
            }
          }
          this.ticketForm = this.fb.group(formGroupControls);


          let parsedData = res.ticketdynafieldvalues;

          let formGroupControls1 = {};
          for (let field of this.ticketFields) {
            if (parsedData.hasOwnProperty(field.fld_FieldName)) {
              let value = parsedData[field.fld_FieldName];
              if (value === 'true') {
                this.ticketForm.get(field.fld_FieldName).setValue(true);
              }
              else if (field.name == 'MultiCheckBox') {
                this.abc = value;
              }
              else {
                this.ticketForm.get(field.fld_FieldName).setValue(value);
              }
            }
          }
        }
        else {
          this.showDynaTicketCard = false;
        }
      }
    }
    else {
      this.showTicketCard = false;
      this.showUpdateButton = false;
      this.showSaveButton = true;
    }
  }

  getTicketTypeData() {
    this.mailService.getTicketType(this.campid).subscribe((res: any) => {
      this.ticketTypeDropdownData[0] = res;
      this.cdr.detectChanges();
    })
  }

  getTicketStatus() {
    let data = {};
    this.mailService.getTicketStatus(data).subscribe((res: any) => {
      this.ticketStatusDropdownData = res;
      this.cdr.detectChanges();
    })
  }
  updatedTicketType: any;
  updatedticketTypeDropdownData: any;
  ticketTypeDropdown(i: number) {
    let DynaTicketData;
    const campID = this.campid;
    const ticketTypeID = this.selectedTicketType[i];
    this.updatedTicketType = this.selectedTicketType[i]; // added this to get updated dropdown for dispid


    for (let j = i + 1; j < this.arrObj.length; j++) {
      this.ticketTypeDropdownData[j] = [];
    }
    this.arrObj.splice(i + 1);

    if (ticketTypeID) {
      this.mailService.getNextTicketType(campID, ticketTypeID).subscribe((res: any) => {

        this.tree = res.tree;
        if (res.listTicketTypes != 'No Record Found') {
          this.arrObj.push(res.listTicketTypes[0]);
          this.ticketTypeDropdownData[i + 1] = res.listTicketTypes;
          this.updatedticketTypeDropdownData = res.listTicketTypes; // added this to get updated dropdown for dispid
        }
        this.mailService.getDynaTicket(JSON.stringify(DynaTicketData = { campid: campID, ticketTypeID: ticketTypeID })).subscribe((res: any) => {
          let data = res['value'];
          if (res.status != 'failure') {
            this.showDynaTicketCard = true;
            this.ticketFields = Object.values(data);
            this.ticketFields = this.ticketFields.sort((a, b) => a.reportDisplaySeqNo - b.reportDisplaySeqNo);
            const formGroupControls = {};
            for (const field of this.ticketFields) {
              formGroupControls[field.fld_FieldName] = [field.value || ''];
            }
            this.ticketForm = this.fb.group(formGroupControls);
          } else {
            this.showDynaTicketCard = false;
          }
        });
      });
    } else {

    }
  }
  ticketHistoryValueOpen: boolean = false
  callHistory() {
    this.historyDialogBox = true;
    this.ticketNo = this.ticketNo ? this.ticketNo : '0'
    this.mailService.getTicketHistoryData(this.campid, this.ticketNo).subscribe((res: any) => {
      this.ticketTypeHistory = Object.values(res.value);
    });
  }
  setHistoryBooleanFalse: boolean = true
  callHistoryOne(ticket) {
    this.getDynamicFormFields();
    this.setHistoryBooleanFalse = false
    let data = ticket
    this.phoneid = data.phoneID
    this.historyDialogBox = true;
    this.mailService.getTicketHistoryData(this.campid, data.ticketID).subscribe((res: any) => {
      this.ticketTypeHistory = Object.values(res.value);
    });
    if (this.phoneid) {
      this.getDynamicLeadCustField()
    }
  }
  getAllTickets() {
    this.newTicketFlag = false;
    this.getUdatedDialogData = false;
    this.sideBarMange = false
    this.ticketHistoryValueOpen = true;
    let bodyData = {
      campid: this.campid,
      refvalue: this.number
    }
    this.getTicketInformation(bodyData)
    // this.mailService.getTicketHistoryDataa(bodyData).subscribe((res: any) => {
    //     this.ticketTypeHistory = Object.values(res.value);
    // });
  }
  callHistoryNew(ticketID) {
    this.sideBarMange = false
    if (ticketID) {
      this.getUdatedDialogData = false;
      // this.ticketHistoryValueOpen = false;
      this.newTicketFlag = false;
      this.ticketHistoryValueOpen = true;
      // this.ticketNo = ticketID
      let ticketData = {
        campid: this.campid,
        ticketid: ticketID,
        // custid: this.phoneid
      }
      this.getTicketInformation(ticketData)
      // this.mailService.getTicketHistoryData(this.campid,ticketID).subscribe((res: any) => {
      //     this.ticketTypeHistory = Object.values(res.value);
      // });
    }

  }

  ticketTypeIDdd: any;
  saveTicketData(phoneid) {
    let callRecording = sessionStorage.getItem('callRecording')
    this.callID = sessionStorage.getItem('callID')
    let dynaticketfieldsValues: any;
    if (this.ticketForm.value.hasOwnProperty('undefined')) {
      dynaticketfieldsValues = {};
    }
    else {
      dynaticketfieldsValues = this.ticketForm.value;
    }
    if (sessionStorage.getItem('extn_set') == 'Idle' && this.ticketRecords.sourceName == 'Voice') {
      this.ticketRecords.source_Type = 7;
    }
    else {
      this.ticketRecords.source_Type = 13;
    }

    if (this.updatedTicketType) {
      this.ticketTypeIDdd = this.updatedTicketType;
    } else {
      this.ticketTypeIDdd = this.selectedTicketType[0];
    }

    let saveData = {
      phoneID: phoneid,
      ticketStartTime: this.ticketStartTimeUpdate,
      source_Type: this.ticketRecords.source_Type,
      source_ID: (this.ticketValue && this.ticketValue.rowid) ? this.ticketValue.rowid : this.number,
      // source_ID: this.accountDropdown[0].label,
      fld_Source_Value: this.ticketRecords.fld_Source_Value,
      // call_Time: this.ticketRecords.call_Time,
      ticket_closureID: this.ticketRecords.ticket_closureID,
      loginUserID: this.agentid,
      userType: 3,
      campID: this.campid,
      ticketID: this.ticketNo,
      sourceName: "WhatsApp",
      campName: this.campName,
      action_No: this.actionNo,
      ticket_Time: this.ticketTime,
      ticketTime: this.ticketDuration,
      assignedByID: this.selectedAssignedBy,
      ticket_statusID: this.selectedticketStatus,
      remarks: this.agentRemarks,
      ticket_TypeID: this.ticketTypeIDdd,
      refvalue: this.number
      // dynaticketfieldsValues: dynaticketfieldsValues,
      // callInvokeID: this.callinvid,
      // csvoicefile: callRecording
    }



    // this.onUpdateForm((result) => {
    //     if (result === 'Success') {
    this.mailService.saveTicketData(JSON.stringify(saveData)).subscribe((res: any) => {
      this.ticketSaved = true;
      if (res.status == 'Success') {
        this.messageService.add({ summary: 'info', severity: 'info', detail: 'Your Tickets information saved successfully' });
        this.ticketNo = res.ticketID;

        // enabling disable button
        // this.disposeCall = false;

        let ticketData = {
          ticketid: this.ticketNo,
          campid: this.campid,
          // custid: this.phoneid
        }

        this.getTicketInformation(ticketData);
        this.mailService.getTicketHistoryData(this.campid, this.ticketNo).subscribe((res: any) => {
          this.ticketTypeHistory = res.value;

        })
        this.valueSaveTrue = true
        // this.saveDispositionForm()
        // this.saveDispositionFormWithoutTicketing()

        // this.ticketHistoryValueOpen = true
        // this.newTicketFlag = false
      }
      else {
        this.messageService.add({ summary: 'info', severity: 'info', detail: res.value })
        this.valueSaveTrue = false
      }
    })
    //     }
    // });
  }

  onUpdateForm(callback) {
    let cb;
    let formattedDate: String;
    let fld_phoneno;
    if (this.selectedCallBack == true) {
      cb = 1;
      let date = new Date(this.date)
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formattedDateWithoutComma = new Intl.DateTimeFormat('en-US', options).format(date);
      formattedDate = formattedDateWithoutComma.replace(',', '');
    }
    else {
      cb = 0;
      formattedDate = "";
    }
    this.getDispositionId();

    if (this.phoneData) {
      fld_phoneno = this.phoneData.fld_phoneno
    }
    else {
      fld_phoneno = sessionStorage.getItem('phnno')
    }
    let payLoad = {
      "campid": this.campid,
      "mode": 2,
      // "phoneid": this.phoneid,
      "agentid": this.agentid,
      "fld_phoneno": fld_phoneno,
      "dispid": this.dispositionID,
      "cb": this.selectedCallBack,
      "cbtime": formattedDate,
      "cbassignedto": this.selectedAssignedTo,
      "ticketTypeId": this.selectedTicketType[0],
      // "ticketID": ticketID
    }

    const newObj = { ...payLoad };
    // const newObj = { ...payLoad, ...this.customForm.value };
    this.mailService.getLeadCustField(newObj).subscribe(
      (data: any) => {
        this.phoneData = data;

        let parsedData = JSON.parse(data.value);

        if (parsedData.status == 'success') {
          callback('Success');
        }

      }, (err: any) => {

      });
  }
  getDispositionId() {
    // original code
    // let selectedTicketType = this.ticketTypeDropdownData.find((element: any) => element.value == this.selectedTicketType[0]);
    // this.dispositionID = selectedTicketType.description;

    // modified code
    if (this.updatedticketTypeDropdownData) { // case of new ticket
      this.updatedticketTypeDropdownData.forEach((element: any) => {
        if (element.value == this.updatedTicketType) {
          // if (element.value == this.selectedTicketType[0]) {

          this.dispositionID = element.description;


        }
      });
    } else { // case of existing ticket


      let selectedTicketType = this.ticketTypeDropdownData[0].find((element: any) => element.value == this.selectedTicketType[0]);

      this.dispositionID = selectedTicketType.description;

    }
  }

  updateTiecket() {
    let formatedDate = new Date();
    this.ticketStartTimeUpdate = this.datePipe.transform(formatedDate, 'yyyy-MM-dd HH:mm:ss.S');
    this.showSaveButton = true;
    this.showUpdateButton = false;
    this.disabledTicketFields = false;
    this.valueSaveTrue = false
  }

  getDynamicFormFields() {
    if (sessionStorage.getItem("getDynamicFormFieldsCache") && JSON.parse(sessionStorage.getItem("getDynamicFormFieldsCache")).campid == this.campid) {
      this.formFields = JSON.parse(sessionStorage.getItem("getDynamicFormFieldsCache")).data;

      const formGroupControls = {};

      for (const field of this.formFields) {
        formGroupControls[field.fld_FieldName] = [field.value || ''];
      }
      this.customForm = this.fb.group(formGroupControls);

    } else {
      let payLoad = {
        "campid": this.campid,
      }
      this.mailService.getFormFields(payLoad).subscribe(
        (data: FormField) => {

          data = data['value'];
          let formFields = Object.values(data);
          this.formFields = formFields.sort((a, b) => a.reportDisplaySeqNo - b.reportDisplaySeqNo);


          this.getDynamicFormFieldsCache = {
            "campid": this.campid,
            data: this.formFields
          }
          sessionStorage.setItem("getDynamicFormFieldsCache", JSON.stringify(this.getDynamicFormFieldsCache))

          // by rajat // uncomment this to enable masking
          // this.formFields.forEach((element: any) => {
          //     if (element.name == "PhoneNo" || element.name == "Phone Number" || element.name == "PhoneNo*" || element.name == "Phone No") {
          //         this.isMasked = element.isMasked;
          //         this.maskOffSet = element.maskOffSet;
          //         localStorage.setItem('isMasked', element.isMasked);
          //         localStorage.setItem('maskOffSet', element.maskOffSet);
          //     }
          // })

          const formGroupControls = {};
          for (const field of this.formFields) {
            formGroupControls[field.fld_FieldName] = [field.value || ''];

            // value = this.formatPhoneNumber(value);

          }
          this.customForm = this.fb.group(formGroupControls);
        });
    }


  }
  async getDynamicLeadCustField() {
    try {
      let payLoad = {
        "campid": this.campid,
        "phoneid": this.phoneid,
        "mode": "1",
        "fld_phoneno": this.number,
        // "sourceType": "3" 
      }
      this.mailService.getLeadCustField(payLoad).subscribe(
        async (data) => {

          const parsedData = JSON.parse(data['value']);

          this.phoneDataa = parsedData

          if (parsedData.status == 'success') {
            this.phoneid = '';
            this.phoneid = parsedData.phoneid; // added for incoming.
            sessionStorage.setItem('phoneID', this.phoneid); // added for incoming.
            let ticketId;
            if (sessionStorage.getItem('ticketID')) {
              ticketId = sessionStorage.getItem('ticketID');
            }
            else {
              ticketId = 0;
            }
            let ticketData = {
              campid: this.campid,
              ticketid: ticketId,
              custid: this.phoneid
            }
            // if (this.sourceName == 'Twitter') {
            //     this.liveDM = true;
            // }
            // else {
            //     this.liveDM = false;
            // }

            const parsedValue = parsedData.value;

            const formGroupControls = {};
            for (const field of this.formFields) {

              if (parsedValue.hasOwnProperty(field.fld_FieldName)) {
                let value = parsedValue[field.fld_FieldName];

                if (value === 'true') {
                  value = true;
                }



                if (field.fld_FieldName == 'fld_phoneno') {
                  if (this.newVariableFalseTrueCheck) {
                    value = value;
                  } else {

                    value = this.formatPhoneNumber(value);
                  }

                }

                this.customForm.get(field.fld_FieldName).setValue(value);


              }
            }
            this.phoneData = parsedValue;

            if (this.setHistoryBooleanFalse) {
              await this.getTicketInformation(ticketData);
            }

          }
          else {

            for (const field of this.formFields) {


              if (field.name == "PhoneNo" || field.name == 'fld_phoneno' || field.name == 'Phone No') {
                // debugger;
                let value = sessionStorage.getItem('phnno');
                if (this.newVariableFalseTrueCheck) {
                  value = value;

                } else {

                  value = this.formatPhoneNumber(value);
                }
                this.customForm.get(field.fld_FieldName).setValue(value);
              }
            }
          }
        });
    }
    catch (error) {
      // Handle the error here if needed
    }
  }

  saveDynamicLeadCustField() {
    this.disposeCall = true;
    let cb;
    let newObj;
    let disposenlogout;
    let formattedDate: string;
    if (this.selectedCallBack == true) {
      cb = 1;
      if (!this.date) {
        this.disposeCall = false;
        this.messageService.add({ severity: 'info', summary: 'info', detail: 'Please Select Date' })
      }
      else {
        this.disposeCall = true;
        let date = new Date(this.date)
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };

        const formattedDateWithoutComma = new Intl.DateTimeFormat('en-US', options).format(date);
        formattedDate = formattedDateWithoutComma.replace(',', '');
      }
    }
    else {
      cb = 0;
      formattedDate = "";
    }
    if (this.selectedDisposeCall == 1) {
      disposenlogout = 1;
    }
    else {
      disposenlogout = 0;
    }

    let mode = sessionStorage.getItem('latestDialMode');

    if (this.selectedDisposeCall == 2) {
      sessionStorage.setItem('redialFunctionality', 'true');
    }
    else {
      sessionStorage.setItem('redialFunctionality', 'false');
    }

    let payLoad = {
      "campid": this.campid,
      "phoneid": 0,
      "mode": mode,
      "agentid": this.agentid,
      // "fld_phoneno":'undefined',
      "dispid": this.dispositionID,
      "dispremarks": this.solutionValue,
      "custremarks": this.feedbackValue,
      "otherremarks": this.remarksValue,
      "cb": this.selectedCallBack,
      "cbtime": formattedDate,
      "cbassignedto": this.selectedAssignedBy,
      "disposenlogout": disposenlogout,
      "date": this.date,
    }
    sessionStorage.setItem('disposenlogout', disposenlogout)
    if (!this.newVariableFalseTrueCheck) {
      newObj = { ...payLoad, ...this.customForm.value };
      newObj.fld_fieldtext3 = this.schoolCodeValue ? this.schoolCodeValue : newObj.fld_fieldtext3
      newObj.fld_fieldtext4 = this.schoolNameValue ? this.schoolNameValue : newObj.fld_fieldtext4
      newObj.fld_fieldtext5 = this.districtValue ? this.districtValue : newObj.fld_fieldtext5
      newObj.fld_fieldtext6 = this.blockNameValue ? this.blockNameValue : newObj.fld_fieldtext6
      newObj.fld_fieldtext8 = this.problemReportedValue ? this.problemReportedValue : newObj.fld_fieldtext8
    } else {
      newObj = { ...payLoad, ...this.customForm.value };

    }

    if (!newObj.fld_phoneno) {
      return this.messageService.add({ summary: 'info', severity: 'info', detail: 'Please Enter Phone Number.' })
    }
    this.mailService.getLeadCustField(newObj).subscribe(
      (data) => {
        if (data) {
          this.phoneData = data;
          let phonedata = JSON.parse(this.phoneData.value)
          if (phonedata && phonedata.status == 'success') {

            sessionStorage.setItem('redialPayload', JSON.stringify(payLoad))
            // this.customService.disposeCallApiwithoutTicket(payLoad);
            sessionStorage.setItem('phoneID', phonedata.phoneid); // added for incoming.

            this.saveTicketData(phonedata.phoneid)
          }
        }
        else {
          this.disposeCall = false;
          this.messageService.add({ severity: 'info', summary: 'Warning', detail: 'call not disposed' })
        }
      }, (err: any) => {

      });
    // }
  }

  closeDetailsTicket() {
    this.newTicketFlag = false
    this.sideBarMange = true
  }
  onRowClick(value) {

  }
  exportExcel() {

  }
  closeDetailsTicketNew() {
    this.ticketHistoryValueOpen = false
    this.sideBarMange = true
  }
  manageSideBar() {
    this.sideBarMange = !this.sideBarMange
    // this.sideBarMange != true
    if (this.ticketEnable) {
      this.ticketHistoryValueOpen = false
      this.newTicketFlag = false
    }
  }
  manageDataSideBAr() {
    this.sideBarMange1 = !this.sideBarMange1
  }
  phoneNumberGetting(value) {
    let phone = value.phone
    const phoneNumberWithoutCountryCode = phone.replace('+91', '').trim();
    // Remove any remaining spaces
    const formattedPhoneNumber = phoneNumberWithoutCountryCode.replace(/\s+/g, '');
    let newData = formattedPhoneNumber;
    sessionStorage.setItem('redialFromWhatsapp', 'trueOne')
    sessionStorage.setItem('getNumberFromWh', newData);

  }
  gettingEmailAddress(value) {
    this.emailPopUpTrueFalse = true
    let emailId = value.email
    if (this.emailPopUpTrueFalse) {
      this.getSignature();
      this.listOfTo();
      let oneValue = emailId
      if (oneValue.includes('.com') || oneValue.includes('.net') || oneValue.includes('.in') || oneValue.includes('.org') || oneValue.includes('.co.uk') || oneValue.includes('.hotmail') || oneValue.includes('.co.jp')) {
        const newValuseSEnd = oneValue.toLowerCase()
        this.addText(newValuseSEnd)
      }

    }
  }
  /***
   * @Rejection Reason Function
   */
  getRejectionReason(message) {
    let data = {
      errorcode: message.errorcode
    }
    this.chatService.getRejectReasonValue(data).subscribe((res) => {
      if (res.status == "Success") {
        this.isReasonRejection = true
        this.myRejectionMessage = res
      }
    })
  }
  getDownloadData(mediaid) {
    this.myImageIconVariable[mediaid] = true; // Activate the spinner for the specific image

    let data = {
      "mediaid": mediaid,
      "campid": this.campid
    }
    this.chatService.getDownloadDataNew(data).subscribe((res) => {
      if (res.status === "Success") {
        this.sendMobile(this.number,'1')
setTimeout(() => {
  this.myImageIconVariable[mediaid] = false; // Deactivate the spinner for the specific image
}, 3000);
        // Handle success response, e.g., updating the image or saving the download
      } else {
        this.myImageIconVariable[mediaid] = false; // Deactivate the spinner for the specific image on failure
        // Handle failure response, if needed
      }
    }, (error) => {
      this.myImageIconVariable[mediaid] = false; // Ensure the spinner is deactivated in case of error
      // Handle error response, if needed
    })
  }
  removeIntervalAfterCloseTab() {
    clearInterval(this.intervalValueGreat);
    this.number = ''
    this.activeUser = ''
    sessionStorage.removeItem('indexingCheckValue')
  }
  getAvatarStyle(phoneNumber: string): any {

    const startingDigits = phoneNumber.substring(3, 4); // Extract the first three digits
    let backgroundColor: string;
    let borderClr: string;
    switch (startingDigits) {
      case '1':
        backgroundColor = '#FF5733'; // Example color for starting digit 1
        borderClr = '#FF5733'; // Example color for starting digit 1
        break;
      case '2':
        backgroundColor = '#29a63f'; // Example color for starting digit 2
        borderClr = '#29a63f'; // Example color for starting digit 2
        break;
      case '3':
        backgroundColor = '#3357FF'; // Example color for starting digit 3
        borderClr = '#3357FF'; // Example color for starting digit 3
        break;
      case '4':
        backgroundColor = '#F1C40F'; // Example color for starting digit 4
        borderClr = '#F1C40F'; // Example color for starting digit 4
        break;
      case '5':
        backgroundColor = '#8E44AD'; // Example color for starting digit 5
        borderClr = '#8E44AD'; // Example color for starting digit 5
        break;
      case '6':
        backgroundColor = '#f40c9a'; // Example color for starting digit 6
        borderClr = '#f40c9a'; // Example color for starting digit 6
        break;
      case '7':
        backgroundColor = '#1F8DD6'; // Example color for starting digit 7
        borderClr = '#1F8DD6'; // Example color for starting digit 7
        break;
      case '8':
        backgroundColor = '#16A085'; // Example color for starting digit 8
        borderClr = '#16A085'; // Example color for starting digit 8
        break;
      case '9':
        backgroundColor = '#E74C3C'; // Example color for starting digit 9
        borderClr = '#E74C3C'; // Example color for starting digit 9
        break;
      default:
        backgroundColor = '#e90a13'; // Default color
        borderClr = '#e90a13'; // Default color
    }

    return {
      'background-color': backgroundColor,
    'border-color':borderClr,
      'border-radius': '50%', // Makes the avatar round
      'width': '20px',
      'height': '20px',
      'display': 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'color': '#fff', // Text color
      'font-weight': 'bold',
      'text-transform': 'uppercase', // Optional: transform text to uppercase
      'font-size': '10px', // Adjust font size as needed
      'position': 'absolute',
      'left': '5px'
    };
  }
  getTemplateDesignStyle(templateType: string): any {
    let backgroundColor: string;
    let text: string;

    switch (templateType) {
      case 'text':
        backgroundColor = '#FF5733'; // Color for 'text'
        text = 'T';
        break;
      case 'image':
        backgroundColor = '#33FF57'; // Color for 'image'
        text = 'I';
        break;
      case 'document':
        backgroundColor = '#3357FF'; // Color for 'document'
        text = 'D';
        break;
      case 'video':
        backgroundColor = '#F1C40F'; // Color for 'video'
        text = 'V';
        break;
      case 'audio':
        backgroundColor = '#8E44AD'; // Color for 'audio'
        text = 'A';
        break;
      case 'template':
        backgroundColor = '#E67E22'; // Color for 'template'
        text = 'MT';
        break;
      case 'location':
        backgroundColor = '#1F8DD6'; // Color for 'location'
        text = 'L';
        break;
      case 'contacts':
        backgroundColor = '#16A085'; // Color for 'contacts'
        text = 'C';
        break;
      case 'bot':
        backgroundColor = '#E74C3C'; // Color for 'bot'
        text = 'B';
        break;
      default:
        backgroundColor = '#BDC3C7'; // Default color
        text = '?'; // Default text
    }

    return {
      'background-color': backgroundColor,
      'border-radius': '50%', // Makes the avatar round
      'width': '30px',
      'height': '30px',
      'display': 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'color': '#fff', // Text color
      'font-weight': 'bold',
      'text-transform': 'uppercase', // Transform text to uppercase
      'font-size': '12px', // Adjust font size based on text length
      'line-height': '40px', // Adjust line height for vertical centering
      'margin-right': '15px'

    };
  }
  getDropdownText(templateType: string): string {
    switch (templateType) {
      case 'text':
        return 'T';
      case 'image':
        return 'I';
      case 'document':
        return 'D';
      case 'video':
        return 'V';
      case 'audio':
        return 'A';
      case 'template':
        return 'MT';
      case 'location':
        return 'L';
      case 'contacts':
        return 'C';
      case 'bot':
        return 'B';
      default:
        return '?';
    }
  }

  sendBusinessContact() {
    let bodyData = {
      "campID": this.campid,
      "phoneno": this.number,
      LoginUserID: this.agentid,
      userType: this.userType,
    }
    this.chatService.sendBusinessContacs(bodyData).subscribe((res) => {
      if (res.status == "failure") {
        this.messageService.add({ severity: 'warn', summary: res.status, detail: res.value });
      } else {
        this.messageService.add({ severity: 'success', summary: res.status, detail: res.value });
      }

    })

  }
  sendSMSDetails() {
    let body = {
      "campID": this.campid,
      "phoneno": String(this.smsNumber),
      LoginUserID: this.agentid,
      userType: this.userType,
    }
    this.chatService.sendSMSAPI(body).subscribe((res: any) => {
      if (res.status == "failure") {
        this.messageService.add({ severity: 'warn', summary: res.status, detail: res.value });
      } else {
        this.messageService.add({ severity: 'success', summary: res.status, detail: res.value });
      }
    })
  }

  // controler sleep long
  private startPolling() {
    // Start polling with the initial interval (1000ms)
    this.setPollingInterval(this.intervals1[this.currentIntervalIndex]);
  }

  private setPollingInterval(interval: number) {
    if (this.intervalValueGreat) {
      clearInterval(this.intervalValueGreat);
    }

    // Set a new interval
    this.intervalValueGreat = setInterval(() => {
      try {
        this.sendMobile(this.number, '2');
      } catch (error) {
      }
    }, interval);
  }


  updateInterval(durationIndex: number) {
    if (durationIndex >= 0 && durationIndex < this.intervals1.length) {
      this.currentIntervalIndex = durationIndex;
      this.setPollingInterval(this.intervals1[this.currentIntervalIndex]);
    }
  }

  startChecking() {
    setInterval(() => {
      const elapsed = Date.now() - this.lastDataReceivedTime;

      if (elapsed >= 50000) { // 4 minutes
        if (this.currentIntervalIndex !== 4) { // 
          this.updateInterval(4); // 5000ms
        }
      }
      else if (elapsed >= 40000) { // 4 minutes
        if (this.currentIntervalIndex !== 3) { // 
          this.updateInterval(3); // 5000ms
        }
      } else if (elapsed >= 30000) { // 3 minutes
        if (this.currentIntervalIndex !== 2) { // 
          this.updateInterval(2); // 3000ms
        }
      } else if (elapsed >= 20000) { // 2 minutes
        if (this.currentIntervalIndex !== 1) { // 
          this.updateInterval(1); // 2000ms
        }
      } else if (elapsed >= 10000) { // 1 minute
        if (this.currentIntervalIndex !== 0) { // 
          this.updateInterval(0); // 1000ms
        }
      }
    }, this.pollingIntervalCheck); // Check elapsed time every 1s
  }
  public onDataReceived() {
    this.lastDataReceivedTime = Date.now();
    // Reset interval to the shortest duration (1s)
    this.updateInterval(0); // 1000ms
  }

  sendInviteApi(event: Event) {
    this.smsNumber = this.number
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure want to send invite to user.',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-outlined p-button-sm cancelBtn',
      acceptButtonStyleClass: 'p-button-sm newcls successBtnN',
      accept: () => {
        this.sendSMSDetails()
        // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'SMS Send Successfully.', life: 3000 });
      },
      reject: () => {
        // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }
  getFaqDetails() {
    let data = {
      campID: this.campid
    }
    this.chatService.getFaqDeatisl(data).subscribe((res) => {
      if (res.status == "success") {
        this.faqValue = res.value
        window.open(this.faqValue, '_blank');
      }
    })
  }


  inTimeOfSendMessage() {
    interval(1000).pipe(
      take(3),                // Take only 3 emissions
      takeUntil(this.destroy$) // Cleanup when component is destroyed
    ).subscribe(value => {
      this.sendMobile(this.number, '2');
      // Your logic to handle the emitted value here
    });
  }
}