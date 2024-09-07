import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Message } from 'src/app/demo/service/message';
import { User } from 'src/app/demo/service/user';
import { ChatService } from '../service/chat.service';
import { DataSharingService } from '../service/shared/data-sharing.service';
import { interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FileUpload } from 'primeng/fileupload';
import { SharedService } from 'src/app/demo/service/shared.service';
import { MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';



declare function setmakecall();
declare function openWhatsappTicket(mobileNo);
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatBoxComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @ViewChild('fileInput') fileInput: ElementRef;
  completeArray:any
  defaultUserId: number = 123;
  selectedExcelFiles: any[] = [];
  message!: Message;
  textContent: string = '';
  uploadedFiles: any[] = [];
  loginData: any;
  campid: any;
  userType: any;
  userDetails: any;
  agentid: any;
  @Input() user!: User;
  msg: any[] = [];
  mobileNo: any;
  httpClient: any;
  myfile: any;
  pollingInterval: any;
  // chatcount: any = 10;
  templateDropdown = [];
  selectedTemp: any;
  isPlaying: boolean = false;
  audio: HTMLAudioElement;
  replyForwardDialog: boolean = false;
  repliedMsg: any;
  sessionStatus: boolean = false;
  textMediaMetaTemplates: any;
  selectedTextTemp: any;
  selectedMediaTemp: any;
  selectedMetaTemp: any;

  templateTextDropdown: any[] = [];
  templateMediaDropdown: any[] = [];
  templateMetaDropdown: any[] = [];
  myForwardDataSend: any;
  isForwadMessage: boolean = false;
  forwardContacts: { phone_number: string }[] = [];
  
  newObj:any
  constructor(
    private chatService: ChatService,
    private dataSharingService: DataSharingService,
    private cdr: ChangeDetectorRef,
    private HttpClient: HttpClient,
    private sharedService: SharedService,
    private messageService: MessageService,) { }

  setMessage() {
    if (this.user) {
      let filteredMessages = this.user.messages.filter(m => m.ownerId !== this.defaultUserId);
      this.message = filteredMessages[filteredMessages.length - 1];
    }
  }

  ngOnInit(): void {
    this.setMessage();
    this.receivedMessages();
    this.receiveMobileNo();
    // this.getTemplateData();
    this.getEmptyChats();
    this.getSession();
    this.getTemplates();
    // this.checkDuplicacy();
  }

  xyz(item){
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
  mapValue :Map<any,any> = new Map<any,any>();
  receivedMessages() {
    this.dataSharingService.receivingMessage().subscribe((res: any) => {
      this.msg = res;
      let dynamicRowid
     if(this.msg){
      this.msg.forEach((obj: any) => {
        let existingObject = this.mapValue.get(obj.rowid);
        if (existingObject) {
          existingObject.messageText = obj.messageText;
          this.mapValue.set(obj.rowid, existingObject);
        } else {
          this.mapValue.set(obj.rowid, obj);
        }
      });

      // Get complete array of objects from the Map
      this.completeArray = Array.from(this.mapValue.values());
    }

    this.dataSharingService.sendChats();
    this.cdr.detectChanges();
    })
  }

  getEmptyChats() {

    this.dataSharingService.getEmptyChats().subscribe((res: any) => {
      this.msg = [];
      this.cdr.detectChanges();
    })
  }

  receiveMobileNo() {
    this.dataSharingService.receiveMobileNumber().subscribe((res: any) => {
      this.mobileNo = res;
      this.cdr.detectChanges();
    })
    this.loginResData();
  }

  getSession() {
    this.dataSharingService.getSession().subscribe((res: any) => {
      this.sessionStatus = res;
      this.cdr.detectChanges();
    })
  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));
    for (let i = 0; i < this.loginData['value'].length; i++) {
      this.campid = this.loginData['value'][i]['campid'];
      this.userType = this.loginData['value'][i]['userType'];
      this.agentid = sessionStorage.getItem('agentid');
    }
  }

  fileArr: any[] = [];
  dealWithFiles(event: any) {
    // debugger;
    this.selectedExcelFiles = null;
    if (event) {
      this.selectedExcelFiles = event.currentFiles[0];
      this.saveExcelContactData();
    }
  }

  removeAttachment() {
    this.selectedExcelFiles = null;
  }

  saveExcelContactData() {
    if (this.selectedExcelFiles) {
      this.fileArr.push(this.selectedExcelFiles);
      this.chatService.saveFile(this.selectedExcelFiles).subscribe((res: any) => {
        this.myfile = res;
      });
    }
  }

  templatelang: any = "";
  templatename: any = "";
  sendMessage() {

    let message
    if (this.isForwadMessage) {
      message = {
        text: this.myForwardDataSend.messageText,
        LoginUserID: this.agentid,
        userType: this.userType,
        campID: this.campid,
        // campID: '96',
        phoneno: this.newNo,
        sourcetype: "",
        mediatype: this.myForwardDataSend.mediatype ? this.myForwardDataSend.mediatype : '0',
        newphoneno: this.mobileNo,
        ftpmediafile: this.myForwardDataSend && this.myForwardDataSend.mediaurl ? this.myForwardDataSend.mediaurl : "",
        templatelang: this.templatelang,
        templatename: this.templatename,
        isForward: this.isForwadMessage ? true : false,
        "rowid": this.myForwardDataSend.rowid,
        "business_AccountID": 0,
        "frdFromRowID": this.myForwardDataSend.frdFromRowID,
        "frdToRowID": this.myForwardDataSend.frdToRowID,
        "frdFirstRowID": this.myForwardDataSend.frdFirstRowID,
      }
    } else if (this.repliedMsg) {
      message = {
        text: this.textContent,
        createdAt: new Date().toISOString(),
        LoginUserID: this.agentid,
        userType: this.userType,
        campID: this.campid,
        // campID: '96',
        phoneno: this.mobileNo,
        sourcetype: "",
        mediatype: this.myfile && this.myfile.mediatype ? this.myfile.mediatype : "0",
        newphoneno: this.mobileNo,
        ftpmediafile: this.myfile && this.myfile.ftpmediafile ? this.myfile.ftpmediafile : "",
        templatelang: this.templatelang,
        templatename: this.templatename,
        replyMsgID: this.repliedMsg.msgID ? this.repliedMsg.msgID : "",
        isReply: this.repliedMsg ? true : false,
      };
    } else if (this.disabledInput) {
      message = {
        text: this.textContent,
        createdAt: new Date().toISOString(),
        LoginUserID: this.agentid,
        userType: this.userType,
        campID: this.campid,
        // campID: '96',
        phoneno: this.mobileNo,
        sourcetype: "",
        mediatype: this.tempType,
        newphoneno: this.mobileNo,
        ftpmediafile: this.ftpTempType,
        templatelang: this.templatelang,
        templatename: this.templatename,
        // replyMsgID: this.repliedMsg.msgID ? this.repliedMsg.msgID : "",
        // isReply: this.repliedMsg ? true : false,
      };
    } else {
      message = {
        text: this.textContent,
        createdAt: new Date().toISOString(),
        LoginUserID: this.agentid,
        userType: this.userType,
        campID: this.campid,
        // campID: '96',
        phoneno: this.mobileNo,
        sourcetype: "",
        mediatype: this.myfile && this.myfile.mediatype ? this.myfile.mediatype : "0",
        newphoneno: this.mobileNo,
        ftpmediafile: this.myfile && this.myfile.ftpmediafile ? this.myfile.ftpmediafile : "",
        templatelang: this.templatelang,
        templatename: this.templatename,
        // replyMsgID: this.repliedMsg.msgID ? this.repliedMsg.msgID : "",
        // isReply: this.repliedMsg ? true : false,
      };
    }


    this.chatService.sendmessage(message).subscribe(
      (response) => {
        // if (response.status == "Success") {
        this.closeReply();
        if (response.status == 'Success') {
          this.selectedTemp = '';
          this.newNumberDialog = false;
          this.disabledInput = false;
        }
        this.textContent = '';
        this.selectedExcelFiles = [];
        this.myfile.mediatype = '';
        this.fileUpload.clear();
        this.dataSharingService.sendChats();
        this.cdr.detectChanges();
        this.selectedTemp = '';
        this.disabledInput = false;
        if (this.isForwadMessage == true) {
          this.isForwadMessage = false
          this.newNumberDialog = false
        } if (this.repliedMsg) {
          this.repliedMsg = false
        }
      },
      (error) => {
      }
    );


    this.textContent = '';
  }

  ngDoCheck() {

  }

  parseDate(timestamp: number) {
    return new Date(timestamp).toTimeString().split(':').slice(0, 2).join(':');
  }

  openLoadedChats() {
    // this.chatcount = this.chatcount + 10;
    // this.dataSharingService.sendingReloadingChats(this.chatcount);
  }

  // newWpTicket(){
  //   this.sharedService.whatsappTicketing('true');
  //   this.sharedService.whatsappTicktingMobile(this.mobileNo);
  // }

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
        if (res.statuscode == 200) {

          this.mobileNo = '';
          this.msg = [];
          this.dataSharingService.sendMobileNumber(this.mobileNo);
          this.msg = [];

          this.dataSharingService.sendCloseChat('close');
        }
      })
    }
  }

  disabledInput: boolean = false;
  tempType: any;
  ftpTempType: any;
  changeTemp() {
    this.templateDropdown.find((x) => {
      if (x.rowID == this.selectedTemp) {
        this.disabledInput = true;

        switch (x.template_type) {
          case 'text':
            this.textContent = x.text;

            this.tempType = '0'
            this.ftpTempType = '0'

            break;

          case 'image':
            this.textContent = x.ftpmediafile;
            this.tempType = '1'
            this.ftpTempType = '1'

            break;

          case 'document':
            this.textContent = x.ftpmediafile;
            this.tempType = '2'
            this.ftpTempType = '2'

            break;

          case 'audio':
            this.textContent = x.ftpmediafile;
            this.tempType = '4'
            this.ftpTempType = '4'


            break;

          case 'video':
            this.textContent = x.ftpmediafile;
            this.tempType = '3'
            this.ftpTempType = '3'

            break;

          case 'template':
            this.textContent = x.templatename;
            this.templatelang = x.templatelang;
            this.templatename = x.templatename

            this.tempType = '5'
            this.ftpTempType = '5'

            break;
        }


      }

    })
  }

  onClear() {
    this.textContent = '';
    this.disabledInput = false;
  }

  toggleAudioPlay(audioUrl: string) {
    if (this.isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0; // Reset audio to beginning
    } else {
      this.audio = new Audio(audioUrl);
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  onImageRightClick(event: MouseEvent, message: any): void {
    event.preventDefault();
  }

  forwardMsg(message) {
    this.myForwardDataSend = '';
    this.myForwardDataSend = message
    this.newNumberDialog = false;

    let data = {
      LoginUserID: this.agentid,
      userType: this.userType,
      campID: this.campid
    }
    this.chatService.getContacts(data).subscribe((res:any)=>{
      let contacts = res.data;
      this.forwardContacts = JSON.parse(contacts);
    })
  }

  replyMsg(message) {
    this.repliedMsg = '';
    this.repliedMsg = message
  }

  closeReply() {
    this.repliedMsg = '';
  }
  onScroll(event: Event): void {
    const scrollableDiv = event.target as HTMLElement;
    if (scrollableDiv.scrollTop === 0) {
      // Perform action to load next 100 items from API or any other action
      this.dataSharingService.sendOldChats("3");
    }
    if (scrollableDiv.scrollHeight - scrollableDiv.clientHeight <= scrollableDiv.scrollTop + 1) {
    }
  }


  selectt5empalet(value) {
    let data = {
      LoginUserID: this.agentid,
      userType: this.userType,
      campID: this.campid
    }

    switch (value) {
      case 'text':
        this.chatService.loadTextTemplates(data).subscribe((res: any) => {
          this.templateTextDropdown = res.data;
        })
        break;


      case 'media':
        this.chatService.loadMediaTemplates(data).subscribe((res: any) => {
          this.templateMediaDropdown = res.data
        })
        break;


      case 'meta':
        this.chatService.loadMetaTemplates(data).subscribe((res: any) => {
          this.templateMetaDropdown = res.data
        })

        break;
    }
  }


  selectedTempText() {
    this.textContent = this.selectedTextTemp;
  }

  selectednameText() {

  }

  selectedMetaText() {

  }

  mySendDat: any
  sendData(sendData: any) {
    this.mySendDat = sendData
  }

  newNumberDialog: boolean = false;
  newNo: any;

  sendNewMsg() {
    this.isForwadMessage = true
    if (this.isForwadMessage == true) {
      this.sendMessage()
    }
  }

}
