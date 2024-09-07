import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WebChatService } from '../web-chat-service/web-chat.service';
import { Observable, Subscription,timer } from 'rxjs';
import { map, share } from "rxjs/operators";
import { FileUpload } from 'primeng/fileupload';
import { AudioRecordService } from '../audio-record.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Mail } from 'src/app/model/mail';
import { environment } from 'src/environments/environment';
import { MailServiceAddedService } from '../mail-service-added.service';
import { FormField } from 'src/app/form-field';
import { DatePipe } from '@angular/common';
import { SharedService } from 'src/app/demo/service/shared.service';
interface assigendItem {
  name: string,
}

interface markItem {
  name: string,
}
// import { WebChatDetailsComponent } from '../web-chat-details.component';
@Component({
  selector: 'app-web-chat-box',
  templateUrl: './web-chat-box.component.html',
  styleUrls: ['./web-chat-box.component.scss']
})
export class WebChatBoxComponent implements OnInit,OnDestroy,OnChanges  {
  @ViewChild('chatWindow', {static: false}) chatWindow: ElementRef;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @ViewChild('fileInput') fileInput: ElementRef;

  @Output() sendChildValue: EventEmitter<any> = new EventEmitter<any>();

  // @ViewChild(WebChatDetailsComponent) webComan : WebChatDetailsComponent
  @Input() parentValue: any;
  uploadedFiles: any[] = [];
  selectedExcelFiles:any = [];
  time = new Date();
  smsVariableTrueFalse: boolean = false
  
  selectedContact: any[] = []
  selectedValueConatcs:any
  rxTime = new Date();
  NewTime:any
  faqValue: any
  currectData= new Date()
  intervalId;
  subscription: Subscription;
  msgs:any = [
   { type:'Left',
    message:'okay',

   },
   {
    type:'Right',
    message:'no'
   }
  ];
  newNo:any
  smsNumber: any
  formattedDateTime:any
nofificationDetailsArray:any[] = []
isForwadMessage: boolean = false;
forwardContacts:any[]= []
  replyiedTrue:boolean = false;
  repliedMsg: any;
  templateDropdown:any[]=[]
mySendDat: any
  message:any
  messages:any = []
  myAudioVariableTrueFalse:boolean = false
  urlExtention:any
  mediaUrlData:any
  mainVariableSet:any
  loginData:any
  noticount:any
  campid:any
  agentID:any
  selectedTemp:any
  newValueTrue:boolean =false;
  myForwardDataSend: any;
  newNumberDialog: boolean = false;
  userType: any;
  agentid: any;
  campID: any;

  // recording section
isRecording = false;
isRecordingFailed = false;
recordedBlob: Blob;
setMyFIleAudio:any
recordingDuration: number;
newRecordValue:boolean = false
visibleContacsDetails:boolean = false
myfile: any;
recordedTime;
blobUrl;
teste;    

/***
 * @contactslocationsharing
 */
locationVis: boolean = false;
myLOcationDataNew: any[] = []
sendContactSharing: boolean = false;
array: any = []
newNoSend: any
locationV: any
mainTwoVariablesASend: any
mysharingContact: boolean = false

/***
 * @AllVariablesTicketEmail
 */

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
emailStringData:any
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

// ticket variables declare
ticketForm: FormGroup;
subDistrictV: any ;
subBotValue: any ;
callID: any;
date: Date = new Date();
dispositionID;
getDynamicFormFieldsCache: any;
newVariableFalseTrueCheck:boolean = environment.newVariableFalseTrueCheck
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
valueSaveTrue:boolean =false;
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
ticketValue:any
schoolCodeValue:any
schoolNameValue:any
districtValue:any
blockNameValue:any
problemReportedValue:any
campName:any
sideBarMange:boolean = true
emailPopUpTrueFalse:boolean=false
redialCheckNumber: any = sessionStorage.getItem('redialNumberCheck')
myredialTrue: boolean = false
// sideBarMange:boolean = true

// ticket get
smsApi: boolean = false
  contactSharing: boolean = false
  showBusinessNumber: boolean = false
  showFaqDetails: boolean = false
//   currentDateTime = new Date().toISOString();
//  formattedDateTime = this.currentDateTime.replace('Z', '');
  constructor(private service:WebChatService,private messageService: MessageService,private audioRecordingService:AudioRecordService,private sanitizer: DomSanitizer,private mailService:MailServiceAddedService,private fb: FormBuilder,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private renderer: Renderer2,private cdr: ChangeDetectorRef,private datePipe: DatePipe,
  ) { 
    this.ticketForm = this.fb.group({

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
    this.loginData = JSON.parse((localStorage.getItem("loginData")));
    this.campid = this.loginData.value[0].campid;
    this.agentID = this.loginData.value[0].agentID;
   
//    if(this.agentID){
//     let data ={
//       agentId : '5001',
//       "phoneNo":"9582062029"
//     }
// setTimeout(() => {
//   this.service.sendMessage(data,'chatHistory')
// }, 1000);
//    }

this.audioRecordingService.data$.subscribe((data) =>{
  if(data){
    this.newRecordValue = true
this.myfile = data.data[0]
this.setMyFIleAudio = data.data[0]
this.message = this.setMyFIleAudio
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
  }

  ngOnInit(): void {
    this.service.receiveMessage().subscribe((data) => {
      if(data.chatData){
        this.messages = data.chatData
        this.noticount = data.notificationCount
      }else{
        this.messages.push(data);
        this.noticount = data.notificationCount
      }
      localStorage.setItem('notificationCOunt',this.noticount)
    });
    this.loginResData();
    this.getTime()
    this.getTemplates()
    this.scrollToBottom();
    // this.contactDetailsNew();
  }
  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));
    for (let i = 0; i < this.loginData['value'].length; i++) {
      this.campID = this.loginData['value'][i]['campid'];
      this.userType = this.loginData['value'][i]['userType'];
      this.agentid = sessionStorage.getItem('agentid');
      this.ticketEnable = this.loginData['value'][i]['ticketEnable'] != null ? this.loginData['value'][i]['ticketEnable'] : true;
      this.smsApi = this.loginData['value'][i]['SMS_API']
      this.contactSharing = this.loginData['value'][i]['contact_Shair']
      this.showBusinessNumber = this.loginData['value'][i]['fld_isShowBssID']
      this.showFaqDetails = this.loginData['value'][i]['fld_isShowFAQ']
    }
  }
  getTime(){
    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
  
    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        let hour = this.rxTime.getHours();
        let minuts = this.rxTime.getMinutes();
        let seconds = this.rxTime.getSeconds();
        //let a = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
         this.NewTime = hour + ":" + minuts + ":" + seconds
        this.rxTime = time;
      });
    }
  send(){
    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() + 5); // Add 5 hours
    currentDateTime.setMinutes(currentDateTime.getMinutes() + 30); // Add 30 minutes
     this.formattedDateTime = currentDateTime.toISOString().slice(0, -1);
    let data
    if(this.replyiedTrue){
      data = {
        "campaignId":this.campid,
        "phoneNo":this.parentValue.phoneNo,
        "agentId":this.agentID,
        // "message":this.repliedMsg.message,
        "message":this.message,
        "mediaType":this.urlExtention ? this.urlExtention : 'Text',
        "type":"AGENT",
        "currentTime": this.NewTime ? this.NewTime : this.currectData,
        isReply: true,
        replyMedia:this.repliedMsg.mediaType,
        // replyText:this.message,
        replyText:this.repliedMsg.message,
        sendDateTimeStr : this.formattedDateTime,
        // contacts:"",
        // contactName:"",
        // latitude:"",
        // longtitude:""
      }
       // let sendData = JSON.stringify(data)
    this.messages.push(data);
    this.service.sendMessage(data,'chatting')
 
    this.message = ''
    this.urlExtention = 'Text'
    this.selectedExcelFiles = [];
    // this.fileUpload.clear();

    if(this.mainVariableSet){
      this.fileUpload.clear();
    }
    this.mainVariableSet = ''
    this.myAudioVariableTrueFalse = false
    this.replyiedTrue = false
    this.repliedMsg = '';
    this.selectedTemp =''
    this.scrollToBottom();
    }
    else if(this.newValueTrue){
      data = {
        "campaignId":this.campid,
        "phoneNo":this.parentValue.phoneNo,
        "agentId":this.agentID,
        "message":this.selectedTemp,
        "mediaType": this.urlExtention ? this.urlExtention : 'Text',
        "type":"AGENT",
        "currentTime": this.NewTime ? this.NewTime : this.currectData,
        isReply: false,
        replyMedia:'',
        replyText:'',
        sendDateTimeStr : this.formattedDateTime,
        // contacts:"",
        // contactName:"",
        // latitude:"",
        // longtitude:""
    
      }
       // let sendData = JSON.stringify(data)
    this.messages.push(data);
    this.service.sendMessage(data,'chatting')
 
    this.message = ''
    this.urlExtention = 'Text'
    this.selectedExcelFiles = [];
    // this.fileUpload.clear();

    if(this.mainVariableSet){
      this.fileUpload.clear();
    }
    this.mainVariableSet = ''
    this.myAudioVariableTrueFalse = false
    this.replyiedTrue = false
    this.repliedMsg = '';
    this.selectedTemp =''
    this.newValueTrue = false
    this.scrollToBottom();
    }
    else if(this.newRecordValue){
      data = {
        "campaignId":this.campid,
        "phoneNo":this.parentValue.phoneNo,
        "agentId":this.agentID,
        "message":this.setMyFIleAudio,
        "mediaType": 'mp3',
        "type":"AGENT",
        "currentTime": this.NewTime ? this.NewTime : this.currectData,
        isReply: false,
        replyMedia:'',
        replyText:'',
        sendDateTimeStr : this.formattedDateTime,
        // contacts:"",
        // contactName:"",
        // latitude:"",
        // longtitude:""
    
      }
       // let sendData = JSON.stringify(data)
    this.messages.push(data);
    this.service.sendMessage(data,'chatting')
 
    this.message = ''
    this.urlExtention = 'Text'
    this.selectedExcelFiles = [];
    // this.fileUpload.clear();

    this.clearRecordedData()
    this.myAudioVariableTrueFalse = false
    this.replyiedTrue = false
    this.repliedMsg = '';
    this.selectedTemp =''
    this.scrollToBottom();
    }
    else if(this.locationVis){
      data = {
        "campaignId":this.campid,
        "phoneNo":this.parentValue.phoneNo,
        "agentId":this.agentID,
        "message":'',
        "mediaType": 'Location',
        "longtitude": this.mainTwoVariablesASend.fld_Location_Longitude,
        "latitude": this.mainTwoVariablesASend.fld_Location_Latitude,
        "type":"AGENT",
        "currentTime": this.NewTime ? this.NewTime : this.currectData,
        isReply: false,
        replyMedia:'',
        replyText:'',
        sendDateTimeStr : this.formattedDateTime,
        // contacts:"",
        // contactName:""
    
      }
       // let sendData = JSON.stringify(data)
    this.messages.push(data);
    this.service.sendMessage(data,'chatting')
 
    this.message = ''
    this.urlExtention = 'Text'
    this.selectedExcelFiles = [];
    // this.fileUpload.clear();

    // this.clearRecordedData()
    this.myAudioVariableTrueFalse = false
    this.replyiedTrue = false
    this.repliedMsg = '';
    this.selectedTemp =''
    this.locationVis = false
    this.scrollToBottom();
    }
    else if(this.mysharingContact){
      data = {
        "campaignId":this.campid,
        "phoneNo":this.parentValue.phoneNo,
        "agentId":this.agentID,
        "message":this.selectedValueConatcs.phone,
        "mediaType": 'Contacts',
        "contacts": this.selectedContact,
        "contactName": this.selectedValueConatcs.name,
        // "longtitude": this.mainTwoVariablesASend.fld_Location_Longitude,
        // "latitude": this.mainTwoVariablesASend.fld_Location_Latitude,
        "type":"AGENT",
        "currentTime": this.NewTime ? this.NewTime : this.currectData,
        isReply: false,
        replyMedia:'',
        replyText:'',
        sendDateTimeStr : this.formattedDateTime,
        // latitude:"",
        // longtitude:""
    
      }
       // let sendData = JSON.stringify(data)
    this.messages.push(data);
    this.service.sendMessage(data,'chatting')
 
    this.message = ''
    this.urlExtention = 'Text'
    this.selectedExcelFiles = [];
    // this.fileUpload.clear();

    // this.clearRecordedData()
    this.myAudioVariableTrueFalse = false
    this.replyiedTrue = false
    this.repliedMsg = '';
    this.selectedTemp =''
    this.mysharingContact = false
    this.scrollToBottom();
    }
    else if(this.myAudioVariableTrueFalse == true){
      for (let i = 0; i < this.mainVariableSet.length; i++) {
        const message = this.mainVariableSet[i];
          let  mediaType = message.split('.').pop();
         data = {
          "campaignId":this.campid,
        "phoneNo":this.parentValue.phoneNo,
        "agentId":this.agentID,
            message: message,
            "type":"AGENT",
            mediaType: mediaType ? mediaType : 'Text',
            "currentTime": this.NewTime ? this.NewTime : this.currectData,
            isReply: false,
            replyMedia:'',
            replyText:'',
        sendDateTimeStr : this.formattedDateTime,
        };
        // return
        this.messages.push(data);
        
        this.service.sendMessage(data,'chatting')

        
      }  
    //    // let sendData = JSON.stringify(data)
    // this.messages.push(data);
    // this.service.sendMessage(data,'chatting')
 
    this.message = ''
    this.urlExtention = 'Text'
    this.selectedExcelFiles = [];
    // this.fileUpload.clear();

  
   
    this.myAudioVariableTrueFalse = false
    this.replyiedTrue = false
    this.repliedMsg = '';
    this.selectedTemp =''
    this.scrollToBottom();
      if(this.mainVariableSet){
      this.fileUpload.clear();
    }
    this.selectedExcelFiles = null;
     this.mainVariableSet = ''
    }
    else{
      data = {
        "campaignId":this.campid,
        "phoneNo":this.parentValue.phoneNo,
        "agentId":this.agentID,
        "message": this.message,
        "mediaType":this.urlExtention ? this.urlExtention : 'Text',
        "type":"AGENT",
        "currentTime": this.NewTime ? this.NewTime : this.currectData,
        isReply: false,
        replyMedia:'',
        replyText:'',
        sendDateTimeStr : this.formattedDateTime

      }
       // let sendData = JSON.stringify(data)
    this.messages.push(data);
    this.service.sendMessage(data,'chatting')
 
    this.message = ''
    this.urlExtention = 'Text'
    this.selectedExcelFiles = [];
    // this.fileUpload.clear();

    if(this.mainVariableSet){
      this.fileUpload.clear();
    }
    this.mainVariableSet = ''
    this.myAudioVariableTrueFalse = false
    this.replyiedTrue = false
    this.repliedMsg = '';
    this.selectedTemp =''
    this.scrollToBottom();
    }
   
  

  }
  ngAfterViewChecked() {
    // if(this.parentValue){
    //   this.scrollToBottom();
    // }
    // this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatWindow) {
        this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
      }
    }, 0);
  }
  
   
  onUpload(event: any) {
    this.myAudioVariableTrueFalse = true
      this.selectedExcelFiles = null;
    this.selectedExcelFiles = event.currentFiles;
   if(this.selectedExcelFiles){
    this.uploadHandler(this.selectedExcelFiles);
   }
}

uploadHandler(file: any) {
  let dataa = {
    mediaType: 1,
    messageType:'IMAGE',
    // message: this.selectedFile ? this.selectedFile['preview'] : null,
    userName: 'Somya Tyagi',
    userId: '2',
    "campaignId":this.campid,
    // type : this.selectView,
    // campId:this.campIdDetails,
    // imageNew:this.imageSend,
  }
  let newData = JSON.stringify(dataa)
    this.service.uploadFile(file,newData).subscribe((res: any) => {
        if(res){
          let newData = res.data
      this.mainVariableSet = res.data;
      this.message  =  this.mainVariableSet  
            this.messageService.add({ severity: 'info', summary: res.status, detail: 'File Uploaded Successfully' });
            this.uploadedFiles=[];
            // this.onUpload(file)  
          
        }
        else

        {
            this.messageService.add({ severity: 'info', summary: res.status, detail: res.status });
            this.selectedExcelFiles = []
            this.myAudioVariableTrueFalse = false
        }
       
    })
}
file: any;
  fileName: any = 'File Name';
uploadHandlers(file: any) {
  this.myAudioVariableTrueFalse = true
  this.file = file.files[0];
  this.fileName = file.files[0].name;
  let dataa = {
    mediaType: 1,
    messageType:'IMAGE',
    // message: this.selectedFile ? this.selectedFile['preview'] : null,
    userName: 'Somya Tyagi',
    userId: '2',
    "campaignId":this.campid,
    // type : this.selectView,
    // campId:this.campIdDetails,
    // imageNew:this.imageSend,
  }
  let newData = JSON.stringify(dataa)
    this.service.saveFile(file,newData).subscribe((res: any) => {
        if(res){
          let newData = res.data
      this.mainVariableSet = res.data;
      this.message  =  this.mainVariableSet  
            this.messageService.add({ severity: 'info', summary: res.status, detail: 'File Uploaded Successfully' });
            this.uploadedFiles=[];
            this.onUpload(file)  
          
        }
        else

        {
            this.messageService.add({ severity: 'info', summary: res.status, detail: res.status });
            this.selectedExcelFiles = []
            this.myAudioVariableTrueFalse = false
        }
       
    })
}

ngOnDestroy() {
  clearInterval(this.intervalId);
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
  this.abortRecording();
}
sessionClose(mobileNo){
let data  = {
    isUnAssign : true,
	  agentId : this.agentID,
	  phoneNo: mobileNo,
    "type":"AGENT",
    "campaignId":this.campid,
    // sendDateTimeStr : this.formattedDateTime

}
this.service.sendMessage(JSON.stringify(data),'unassignagent')
 if(mobileNo){
setTimeout(() => {
  this.getCustomerDetails()
  this.messages = []
  this.parentValue  = ''
}, 1500);
 }
}

getCustomerDetails(){
  let data = {
    "agentId":this.agentID,
    "campaignId":this.campid
  }
  this.service.getCustomerNoDetails(data).subscribe((res)=>{
    if(res['data']){
      this.nofificationDetailsArray = res['data']
      this.sendChildValue.emit(this.nofificationDetailsArray);

      
    }
  })
}

  sendData(sendData: any) {
    this.mySendDat = sendData
  }
  replyMsg(message) {
    this.repliedMsg = '';
    this.replyiedTrue = true
    this.repliedMsg = message
  }
  closeReply() {
    this.repliedMsg = '';
    this.replyiedTrue = false
  }

  getTemplates(){
    this.service.getTemplates().subscribe((res:any)=>{
      this.templateDropdown = res.data
    })
  
  }
  checkTemplate(event){
const fileExtensionRegex = /\.(mp3|pdf|docx?|xlsx?|pptx?|txt|jpg|jpeg|png|gif|bmp|tiff?|svg|mp4|avi|mkv|mov|wmv|flv|webm|ogg|wav|aac|zip|rar|7z|tar|gz|bz2|iso|html?|css|js|json|xml)$/i;
  // Extract the value from the event
  const value = event.value;
if(event.value){
this.newValueTrue = true
this.message = this.selectedTemp
  // Check if the value matches the file extension regex
  if (fileExtensionRegex.test(value)) {
    this.urlExtention = value.split('.').pop();
  } else {
    this.urlExtention = 'Text'
  }

// }
}
    this.showSuggestions = false
  }

// Define a method to handle replying to a message
replyToMessage(item: any) {
  // Set a property to indicate that this message has been replied to
  item.repliedTo = true;
}

ngOnChanges(changes: SimpleChanges) {
  if (changes.parentValue) {
    // this.onDataChange()
    // this.scrollToBottom();
    setTimeout(() => {
      this.onDataChange()
    }, 500);
  }
}

onDataChange() {
  if(this.chatWindow){
    this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;

  }
}
contactDetailsNew(){
  this.service.getPhoneBookDetails().subscribe((res)=>{
    this.forwardContacts = res.data
  })
}

forwardMsg(message) {
  this.myForwardDataSend = '';
  this.myForwardDataSend = message
  this.newNumberDialog = true;
  this.contactDetailsNew()
}
sendForward() {
  this.isForwadMessage = true
  if (this.isForwadMessage == true) {
    this.sendMessage()
  }
}
onChangeData(event){
  this.selectedValueConatcs = event.value
  const selectedPhoneNumber = event.value.phone;
  this.mysharingContact = true
  let data = this.array.find((contact: any) => contact.phones.some((phone: any) => phone.phone === selectedPhoneNumber));
  this.selectedContact.push(data)
}
mediaTypeCheck:any

sendMessage(){

  if (this.myForwardDataSend.mediaType === 'png' || this.myForwardDataSend.mediaType === 'jpg' || this.myForwardDataSend.mediaType === 'jpeg' || this.myForwardDataSend.mediaType === 'gif' || this.myForwardDataSend.mediaType === 'bmp' || this.myForwardDataSend.mediaType === 'svg') {
    this.mediaTypeCheck = "1";
} else if (this.myForwardDataSend.mediaType === 'doc' || this.myForwardDataSend.mediaType === 'csv' || this.myForwardDataSend.mediaType === 'docx' || this.myForwardDataSend.mediaType === 'pdf' || this.myForwardDataSend.mediaType === 'txt' || this.myForwardDataSend.mediaType === 'xls' || this.myForwardDataSend.mediaType === 'xlsx' || this.myForwardDataSend.mediaType === 'ppt' || this.myForwardDataSend.mediaType === 'pptx') {
    this.mediaTypeCheck = "2";
} else if (this.myForwardDataSend.mediaType === 'mp4' || this.myForwardDataSend.mediaType === 'avi' || this.myForwardDataSend.mediaType === 'mkv' || this.myForwardDataSend.mediaType === 'mov' || this.myForwardDataSend.mediaType === 'wmv' || this.myForwardDataSend.mediaType === 'flv' || this.myForwardDataSend.mediaType === 'webm') {
    this.mediaTypeCheck = "3";
} else if (this.myForwardDataSend.mediaType === 'mp3' || this.myForwardDataSend.mediaType === 'wav' || this.myForwardDataSend.mediaType === 'aac' || this.myForwardDataSend.mediaType === 'flac' || this.myForwardDataSend.mediaType === 'ogg' || this.myForwardDataSend.mediaType === 'wma') {
    this.mediaTypeCheck = "4";
} else if (this.myForwardDataSend.mediaType === 'html' || this.myForwardDataSend.mediaType === 'htm' || this.myForwardDataSend.mediaType === 'xml' || this.myForwardDataSend.mediaType === 'json' || this.myForwardDataSend.mediaType === 'tpl') {
    this.mediaTypeCheck ="5";
} else if (this.myForwardDataSend.mediaType === 'kml' || this.myForwardDataSend.mediaType === 'kmz' || this.myForwardDataSend.mediaType === 'gpx') {
    this.mediaTypeCheck = "6";
} else if (this.myForwardDataSend.mediaType === 'vcf' ) {
    this.mediaTypeCheck = "8";
} else {
    this.mediaTypeCheck = "0"; // Default to text if no match
}
  let  message = {
    text: this.myForwardDataSend.message,
    createdAt: new Date().toISOString(),
    LoginUserID: this.agentid,
    userType: this.userType,
    campID: this.campID,
    // campID: '96',
    phoneno: this.newNo,
    sourcetype: "",
    mediatype: this.mediaTypeCheck && this.mediaTypeCheck ? this.mediaTypeCheck : "0",
    newphoneno: this.newNo,
    ftpmediafile: this.myForwardDataSend.mediaType && this.myForwardDataSend.mediaType != 'Text' ? this.myForwardDataSend.message : "",
    templatelang: "",
    templatename: "",
    // replyMsgID: this.repliedMsg.msgID ? this.repliedMsg.msgID : "",
    // isReply: this.repliedMsg ? true : false,
    fld_Location_Longitude: "77.40336908574157",
    fld_Location_Latitude: "28.49572570568702"
  };
  this.service.sendmessage(message).subscribe(
    (response) => {
    },
    (error) => {
    }
  );
}

// textContent: string = '';
showSuggestions: boolean = false;
suggestions: string[] = []; // This will hold the filtered suggestions
allTemplates: string[] = ['Template1', 'Template2', 'Template3']; // Your full list of templates

// Method to filter and show suggestions
newFunction() {
  const atSymbolIndex = this.message.lastIndexOf('@');
  if (atSymbolIndex !== -1 && atSymbolIndex === this.message.length - 1) {
    const searchText = this.message.substring(atSymbolIndex + 1);
    this.suggestions = this.templateDropdown.filter(template => 
      template.templateName.toLowerCase().includes(searchText.toLowerCase())
    );
    this.showSuggestions =  this.suggestions.length > 0;
  } else {
    this.showSuggestions = false;
  }
  this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;

}

// Method to handle the selection of a suggestion
selectSuggestion(suggestion: string) {
  const atSymbolIndex = this.message.lastIndexOf('@');
  this.message = this.message.substring(0, atSymbolIndex + 1) + suggestion + ' ';
  this.showSuggestions = false;
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
  this.message = ''
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

// location and contacts sharing
getLocation() {
  this.loadLocationContacts()
  this.locationVis = true
}
loadLocationContacts() {
  let data = {
    campID: this.campid
  }
  this.service.getLocationContacts(data).subscribe((res) => {
    this.myLOcationDataNew = res.data
  })
}

sendContactDEatisl() {
  this.sendContactSharing = true
  let data = {
    LoginUserID: this.agentid,
    userType: this.userType,
    campID: this.campid
  }
  this.service.getContacts(data).subscribe((res: any) => {
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
        this.matchedContacts.push({ phone, name: 'No matching name found' });
      }

    }
  }
}
trigger() {
  let element = document.getElementById('upload_file') as HTMLInputElement;
  element.click();
}
checkValueNew(event) {
  
  this.mainTwoVariablesASend = event.value
}
onSelectMaps(json) {
  if (json) {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${json.latitude},${json.longtitude}`;
    window.open(mapsUrl, '_blank');
  }
}
mainContactDetailsArr: any
  myContactDetails(itemValue) {
    this.mainContactDetailsArr = itemValue.contacts[0]
    this.visibleContacsDetails =true
  }

  /***
   * @Redial  redial number
   * @Email email open
   * @Ticket ticket sytem added with chat 
   */

  
  // for make call and redial number value 
  RedialNumber() {
    if (`91${this.redialCheckNumber}` == this.parentValue.phoneNo) {
      this.myredialTrue = true
      if (this.myredialTrue) {
sessionStorage.setItem('redialFromWhatsapp','true')
      }
    }else{
      let numberValue = this.parentValue.phoneNo;
      if (numberValue.startsWith('91')) {
        numberValue = numberValue.substring(2); // Remove the country code '91'
      }
      sessionStorage.setItem('redialFromWhatsapp','trueOne')
      sessionStorage.setItem('getNumberFromWh', numberValue);
    }
  }
  emaildialogTrue(){
    sessionStorage.setItem('openN','open')
    this.sharedService.socialMediaDetected('email');
    this.emailPopUpTrueFalse = true
    let oneValue = 'somya.tyagi@novusconnect.in'
    if(oneValue.includes('.com') || oneValue.includes('.net') || oneValue.includes('.in') || oneValue.includes('.org') || oneValue.includes('.co.uk') || oneValue.includes('.hotmail') || oneValue.includes('.co.jp')){
  const newValuseSEnd =  oneValue.toLowerCase()
  this.addText(newValuseSEnd)
    }

    // if(this.emailPopUpTrueFalse){
    // }
    // this.chatService.socialMediaDetected('email')
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
  if(query){
      this.filteredMails = this.selectedMailsTo.filter(mail => mail.name.toLowerCase().includes(query));
  }else{
    this.filteredMails = [];
  }


}
clearInput() {
  this.newMail.to = '';
}
onAddE(event){
  
    this.addText(event.value)
}
onRemoveE(event){
  this.resultArray = this.resultArray.filter(email => email !== event.value);
  this.selectedItems = this.resultArray.filter(email => email !== event.value);
  this.generateResult()
}


updateValueNew(){
  let oneValue = this.newMail.to
  if(oneValue.includes('.com') || oneValue.includes('.net') || oneValue.includes('.in') || oneValue.includes('.org') || oneValue.includes('.co.uk') || oneValue.includes('.hotmail') || oneValue.includes('.co.jp')){
const newValuseSEnd =  oneValue.toLowerCase()
this.addText(newValuseSEnd)
  }
  
}
newValueDetails(){
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
      this.fld_CC= '';
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
this.emailStringDataCC = this.resultArrayCC[0] ;
}
}

filterMailsCC() {
  const query = this.fld_CC.toLowerCase();
  if(query){
      this.filteredMailsCC = this.selectedMailsTo.filter(mail => mail.name.toLowerCase().includes(query));
  }else{
    this.filteredMailsCC = [];
  }
}
clearInputCC() {
  this.fld_CC = '';
}
onAddECC(event){
  
    this.addTextCC(event.value)
}
onRemoveECC(event){
  this.resultArrayCC = this.resultArrayCC.filter(email => email !== event.value);
  this.selectedItemsCC = this.resultArrayCC.filter(email => email !== event.value);
  this.generateResultCC()
}

updateValueNewCC(){
  let oneValue = this.fld_CC
  if(oneValue.includes('.com') || oneValue.includes('.net') || oneValue.includes('.in') || oneValue.includes('.org') || oneValue.includes('.co.uk') || oneValue.includes('.hotmail') || oneValue.includes('.co.jp')){
const newValuseSEnd =  oneValue.toLowerCase()
this.addTextCC(newValuseSEnd)
  }
}

newValueDetailsCC(){
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
      this.fld_BCC= '';
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
this.emailStringDataBCC = this.resultArrayBCC[0] ;
}
}

filterMailsBCC() {
  const query = this.fld_BCC.toLowerCase();
  if(query){
      this.filteredMailsBCC = this.selectedMailsTo.filter(mail => mail.name.toLowerCase().includes(query));
  }else{
    this.filteredMailsBCC = [];
  }
}
clearInputBCC() {
  this.fld_BCC = '';
}
onAddEBCC(event){
  
    this.addTextBCC(event.value)
}
onRemoveEBCC(event){
  this.resultArrayBCC = this.resultArrayBCC.filter(email => email !== event.value);
  this.selectedItemsBCC = this.resultArrayBCC.filter(email => email !== event.value);
  this.generateResultBCC()
}

updateValueNewBCC(){
  let oneValue = this.fld_BCC
  if(oneValue.includes('.com') || oneValue.includes('.net') || oneValue.includes('.in') || oneValue.includes('.org') || oneValue.includes('.co.uk') || oneValue.includes('.hotmail') || oneValue.includes('.co.jp')){

const newValuseSEnd =  oneValue.toLowerCase()
this.addTextBCC(newValuseSEnd)
  }
}

newValueDetailsBCC(){
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
// uploadedFiles = [];
successfulFileUploadResponse: any;

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
                    fld_TicketID:  this.ticketNo ?  this.ticketNo : '0',
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
    gettingValue:any
    getMessageDetailsNew(getValue){
      this.selectedItems = []
      // this.newTicket()
      this.gettingValue = getValue
  setTimeout(() => {
    if(this.emailPopUpTrueFalse){
      this.getSignature();
    this.listOfTo();
      let oneValue = getValue.messageText
      if(oneValue.includes('.com') || oneValue.includes('.net') || oneValue.includes('.in') || oneValue.includes('.org') || oneValue.includes('.co.uk') || oneValue.includes('.hotmail') || oneValue.includes('.co.jp')){
    const newValuseSEnd =  oneValue.toLowerCase()
    this.addText(newValuseSEnd)
      }
     
     } 
  }, 1000);
    }
    newTicketFlag1:boolean =false;
getNewDetails(value){
  this.sideBarMange = true
  this.getDynamicFormFields();
this.ticketValue = value
if(this.ticketValue.ticketid !=0){
let ticketd = this.ticketValue.ticketid ? this.ticketValue.tickeid : this.ticketValue.ticketID
// // this.getTicketInformation(ticketData);
  this.mailService.getTicketHistoryData(this.campid, ticketd).subscribe((res: any) => {
      this.ticketTypeHistory = res.value;
  this.showTicketCard = true;
  this.showSaveButton = false;
  this.showUpdateButton = true;
  this.disabledTicketFields = true;
  if(this.ticketTypeHistory){
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
    this.selectedTicketType[0] = this.ticketRecords.ticket_TypeID; // for multi level dropdown
    this.ticketID = this.ticketValue.ticketid; // by rajat
    if(this.phoneid){
    this.getDynamicLeadCustField();
    }
  }
  });
  
}else{
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
newTicket(){
  this.newTicketFlag1 =true
  if(this.newTicketFlag1){
    this.getNewDetails(this.gettingValue)
  }
  // this.getNewDetails()
}

    formatPhoneNumber(phoneNumber: any): any {
      if(phoneNumber == 'Contact Not Found' || phoneNumber == '91null'){
    return
      }else{
        const visibleDigits = 7;  // Number of visible digits at the start
        const visiblePart = phoneNumber.substring(0, visibleDigits);
        const hiddenPart = '*'.repeat(phoneNumber.length - visibleDigits);
        return visiblePart + hiddenPart;
      }
     
      // return this.number
  }

  // Ticket functions added
sendMessageAfterTicketSave(){
  let firstObj = this.ticketValue
  
let data  = {
  ticket : true,
  isticket : true,
  ticketId : this.ticketNo ? this.ticketNo : 0,
  messageId : this.ticketValue.messageId ? this.ticketValue.messageId : 0,
  message : this.ticketValue.message,
  type :  "AGENT",
  phoneNo : firstObj.phoneNo,
  agentId : firstObj.agentId,
  campaignId : firstObj.campaignId,
  phoneID: this.myPhoneid,

}
// let mergedObj = { ...firstObj, ...data };
// if(mergedObj == )
this.service.sendMessage(data,'chatting')
setTimeout(() => {
  let data ={
    agentId :  this.agentID,
    "phoneNo":this.parentValue.phoneNo
  }
// setTimeout(() => {
this.service.sendMessage(data,'chatHistory')
}, 500);
}
 newTicketValueOPenT:boolean = false
 getUdatedDialogData:boolean = false
  ticketOpen(value) {
    
  this.ticketHistoryValueOpen = false;
        this.getDynamicFormFields();
    this.ticketValue = value
    if(this.ticketValue.ticketId){
      this.sideBarMange = true
      this.getUdatedDialogData =true
      let ticketd = this.ticketValue.ticketId ? this.ticketValue.ticketId : this.ticketValue.ticketid
      // // this.getTicketInformation(ticketData);
        this.mailService.getTicketHistoryData(this.campid, ticketd).subscribe((res: any) => {
            this.ticketTypeHistory = res.value;
        this.showTicketCard = true;
        this.showSaveButton = false;
        this.showUpdateButton = true;
        this.disabledTicketFields = true;
        if(this.ticketTypeHistory){
          this.ticketRecords = res.value[0];
          // voice file
          this.voicefile = res.value[0].voicefile;
          this.phoneid = this.ticketRecords.phoneID
          this.ticketNo = this.ticketValue.ticketId;
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
          this.selectedTicketType[0] = this.ticketRecords.ticket_TypeID; // for multi level dropdown
          this.ticketID = this.ticketValue.ticketId; // by rajat
          if(this.phoneid){
          this.getDynamicLeadCustField();
          }
        }
        });
  this.sendChildValue.emit(this.sideBarMange);
      }else{
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
  this.sendChildValue.emit(this.sideBarMange);
    }
   
}

closeNewnewTicketValueOPenT(){
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
ticketHistoryValueOpen:boolean =false
callHistory() {
  this.historyDialogBox = true;
  this.ticketNo = this.ticketNo ? this.ticketNo : '0'
  this.mailService.getTicketHistoryData(this.campid, this.ticketNo).subscribe((res: any) => {
      this.ticketTypeHistory = Object.values(res.value);
  });
}
setHistoryBooleanFalse:boolean = true
callHistoryOne(ticket) {
  this.getDynamicFormFields();
  this.setHistoryBooleanFalse = false
  let data = ticket
  this.phoneid = data.phoneID
  this.historyDialogBox = true;
  this.mailService.getTicketHistoryData(this.campid, data.ticketID).subscribe((res: any) => {
      this.ticketTypeHistory = Object.values(res.value);
  });
  if(this.phoneid){
    this.getDynamicLeadCustField()
  }
}
getAllTickets() {
  this.newTicketFlag = false;
  this.getUdatedDialogData =false;
  this.sideBarMange = false
  this.ticketHistoryValueOpen = true;
  let bodyData = {
    campid: this.campid,
    refvalue : this.parentValue.phoneNo
  }
  this.getTicketInformation(bodyData)
  this.sendChildValue.emit(this.sideBarMange);
  // this.mailService.getTicketHistoryDataa(bodyData).subscribe((res: any) => {
  //     this.ticketTypeHistory = Object.values(res.value);
  // });
}
callHistoryNew(ticketID) {
  this.sideBarMange =false
  if(ticketID){
  this.getUdatedDialogData =false;
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
  this.sendChildValue.emit(this.sideBarMange);
}

ticketTypeIDdd: any;
myPhoneid: any;
saveTicketData(phoneid) {
  this.myPhoneid  =phoneid
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
        this.ticketRecords.source_Type = 2;
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
        source_ID:(this.ticketValue && this.ticketValue.messageId) ? this.ticketValue.messageId : this.parentValue.phoneNo,
        // source_ID: this.accountDropdown[0].label,
        fld_Source_Value: this.ticketRecords.fld_Source_Value,
        // call_Time: this.ticketRecords.call_Time,
        ticket_closureID: this.ticketRecords.ticket_closureID,
        loginUserID: this.agentid,
        userType: 3,
        campID: this.campid,
        ticketID: this.ticketNo,
        sourceName: "WebChat",
        campName: this.campName,
        action_No: this.actionNo,
        ticket_Time: this.ticketTime,
        ticketTime: this.ticketDuration,
        assignedByID: this.selectedAssignedBy,
        ticket_statusID: this.selectedticketStatus,
        remarks: this.agentRemarks,
        ticket_TypeID: this.ticketTypeIDdd,
        refvalue:this.parentValue.phoneNo
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
                    this.sendMessageAfterTicketSave()

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
        "fld_phoneno": this.parentValue.phoneNo,
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

                        
                        
                        if(field.fld_FieldName == 'fld_phoneno'){
                            if(this.newVariableFalseTrueCheck){
                                value =   value;
                            }else{

                                value =   this.formatPhoneNumber(value);
                            }

                        }

                        this.customForm.get(field.fld_FieldName).setValue(value);
                        
                        
                    }
                }
                this.phoneData = parsedValue;
               
                if(this.setHistoryBooleanFalse){
                  await this.getTicketInformation(ticketData);
                }

            }
            else {

                for (const field of this.formFields) {
                    

                    if (field.name == "PhoneNo" || field.name == 'fld_phoneno' || field.name == 'Phone No') {
                        // debugger;
                        let value = sessionStorage.getItem('phnno');
                        if(this.newVariableFalseTrueCheck){
                            value =   value;

                        }else{

                            value =   this.formatPhoneNumber(value);
                        }
                        this.customForm.get(field.fld_FieldName).setValue(value);
                    }
                }
            }
        });
}
catch (error) {
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

  let mode=sessionStorage.getItem('latestDialMode');

  if(this.selectedDisposeCall==2  ){
   sessionStorage.setItem('redialFunctionality','true');
  }
  else 
  {
  sessionStorage.setItem('redialFunctionality','false');
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
  // const newObj = { ...payLoad, ...this.customForm.value };
  // newObj.fld_fieldtext3 = this.schoolCodeValue
  // newObj.fld_fieldtext4 = this.schoolNameValue
  // newObj.fld_fieldtext5 = this.districtValue
  // newObj.fld_fieldtext6 = this.blockNameValue
  if(!this.newVariableFalseTrueCheck){
      newObj = { ...payLoad, ...this.customForm.value };
     newObj.fld_fieldtext3 = this.schoolCodeValue ? this.schoolCodeValue :newObj.fld_fieldtext3
     newObj.fld_fieldtext4 = this.schoolNameValue ? this.schoolNameValue : newObj.fld_fieldtext4
     newObj.fld_fieldtext5 = this.districtValue ? this.districtValue :newObj.fld_fieldtext5
     newObj.fld_fieldtext6 = this.blockNameValue ? this.blockNameValue : newObj.fld_fieldtext6
     newObj.fld_fieldtext8 = this.problemReportedValue ? this.problemReportedValue : newObj.fld_fieldtext8
    }else{
      newObj = { ...payLoad, ...this.customForm.value };

    }
  if(!newObj.fld_phoneno){
      return    this.messageService.add({ summary: 'info', severity: 'info', detail: 'Please Enter Phone Number.' }) 
  }
  this.mailService.getLeadCustField(newObj).subscribe(
      (data) => {
       if(data){
          this.phoneData = data;
          let phonedata = JSON.parse(this.phoneData.value)
          this.saveTicketData(phonedata.phoneid)
          if (phonedata && phonedata.status == 'success') {

              sessionStorage.setItem('redialPayload',JSON.stringify(payLoad))
              // this.customService.disposeCallApiwithoutTicket(payLoad);
              sessionStorage.setItem('phoneID', phonedata.phoneid); // added for incoming.

          }
        //   else{
        //     let id = '0'
        //     this.saveTicketData(id)
        // }
       }
          else {
              this.disposeCall = false;
              this.messageService.add({ severity: 'info', summary: 'Warning', detail: 'call not disposed' })
          }
      }, (err: any) => {

      });
  // }
}

closeDetailsTicket(){
  this.newTicketFlag = false
  this.sideBarMange =true
  this.sendChildValue.emit(this.sideBarMange);

}
onRowClick(value){

}
exportExcel(){

}
closeDetailsTicketNew(){
  this.ticketHistoryValueOpen = false
  this.sideBarMange =true
  this.sendChildValue.emit(this.sideBarMange);

}
manageSideBar(){
  this.sideBarMange = true
  this.ticketHistoryValueOpen = false
  this.newTicketFlag = false
  this.sendChildValue.emit(this.sideBarMange);

}
newTicketOpen(){
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
  this.sendChildValue.emit(this.sideBarMange);
}
notifyMe() {
  this.service.showNotification('Notification', {
    icon: 'http://novusconnect.in/assets/images/logo.png',
    body: "Hey there! You've been notified!",
  });
}
sendBusinessContact() {
  let bodyData = {
    "campID": this.campid,
    "phoneno": this.parentValue.phoneNo,
    LoginUserID: this.agentid,
    userType: this.userType,
  }
  this.service.sendBusinessContacs(bodyData).subscribe((res) => {
    if (res.status == "failure") {
      this.messageService.add({ severity: 'warn', summary: res.status, detail: res.value });
    } else {
      this.messageService.add({ severity: 'success', summary: res.status, detail: res.value });
    }

  })

}
sendInviteApi(event: Event) {
  this.smsNumber = this.parentValue.phoneNo
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
sendSMSDetails() {
  let body = {
    "campID": this.campid,
    "phoneno": String(this.smsNumber),
    LoginUserID: this.agentid,
    userType: this.userType,
  }
  this.service.sendSMSAPI(body).subscribe((res: any) => {
    if (res.status == "failure") {
      this.messageService.add({ severity: 'warn', summary: res.status, detail: res.value });
    } else {
      this.messageService.add({ severity: 'success', summary: res.status, detail: res.value });
    }
  })
}

getFaqDetails() {
  let data = {
    campID: this.campid
  }
  this.service.getFaqDeatisl(data).subscribe((res) => {
    if (res.status == "success") {
      this.faqValue = res.value
      window.open(this.faqValue, '_blank');
    }
  })
}
 
}