import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from './demo/service/app.menu.service';

// import '../assets/work.js';
import '../assets/work.js';
import { MywebrtcDetailsService } from './demo/service/mywebrtc-details.service';
import { SharedService } from './demo/service/shared.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
declare function setParams(agentid, password, serverip, socketIP, socketPort, serverport, crmType, userType, isOffline_Mode, isFld_Allow_Self_Dashboard, isEnableEmail, campName, campid, agentName, localClientIP, crmurlpopupstate);
// declare function loadDoc();SS
declare function sockStart();
declare function sethold();
declare function setdialmode(dialmode);
declare function setbreak(breakid);
declare function setrelease(releaseid);
declare function setmakecall();
declare function setredialmakecall();
declare function setConsultCall();
declare function setdispose();
declare function settransfercall();
declare function menucall(choice);
declare function setConsultHold();
declare function setConsultRelease();
declare function setTransferFromConsult();
declare function setConference();
declare function recivedPacket();
declare function setmakecallFromWhatsapp();
declare function recivedChannelPacket();
declare function setmakecallbyPhoneID(phoneNo: any, phoneid: any);
declare function setmakecallbyPhoneIDByPreview(phoneno, campid, leadid, recordid, phoneid);

declare function setupdatedmakecall(phoneno, campid, leadid, recordid, phoneid);
declare function setdiscardcall(leadid, calllistrecid, isdiscard, discardreason);
declare function blank()

declare function setPreviewDialSearch(phoneno, leadid, recordid, phoneid)

interface Break {
    name: string;
}

interface Campaign {
    name: string;
}

interface SkillSet {
    name: string;
}

declare let abc: any;
declare let channel: any;
declare let phone: any;
declare let state: any;
declare let schdTime: any;
declare let Prv_Phone_No: any;
declare var prviewTableData: any;
declare var consultTableData: any;

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styles: [`
    .p-ripple {
      margin-bottom: 1.5px !important;
      font-family: 'Arial' !important;
      padding: 3px !important;
      background-color: rgb(3, 83, 136) !important;
      border-radius: 7px !important;
      width: 40px !important;
      transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s !important;
      border: 1px solid rgb(3, 83, 136) !important;
      height: 38px;
    }
    ::ng-deep .p-menu{
        z-index: 1001 !important;
        transform-origin: center top !important;
        top: 72px !important;
        left: 328px !important;
    }
    
    ::ng-deep .layout-topbar {
        position: inherit !important;
        margin-bottom: -60px !important;
    }

    .status-container {
  display: flex;
  align-items: baseline; /* Align items on the baseline */
  flex-wrap: wrap; /* Allow flex items to wrap */
}

.status-label {
  font-size: 11px;
  font-weight: 500;
  color: rgb(3, 83, 136);
}

.status-data {
  font-size: 11px;
  color: rgb(3, 83, 136);
  margin-left: 5px;
}

.muted-button {
    background-color: red !important;
}

.unmuted-button {
}

  `]
})
export class AppMenuComponent implements OnInit,DoCheck,AfterViewInit {
    @ViewChild('remoteAudio', { static: true }) remoteAudio!: ElementRef;
    @ViewChild('localMedia', { static: true }) localMedia!: ElementRef;
    @ViewChild('remoteVideo', { static: true }) remoteVideo!: ElementRef;
    @ViewChild('localVideo', { static: true }) localVideo!: ElementRef;
    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHandler(event) {
        sessionStorage.setItem('setLoadgoutData', 'setDetails')
    }
 // for checkinjg two values
 positionNew = 'top-left'
 newVariableFalseTrueCheck:boolean = environment.newVariableFalseTrueCheck
 breakDialogBox1:boolean = true
    phone_number: any; // Assuming you have the phone number available in this variable
    newPhoneNumber:any
    newTicketValueSet:any = false
  newTicketValueSetValue:any = true
    checkInspectDisableEnable:any = environment.enableInspectMode
    previewDataTable;
    consultDataTable: any = [];
    breakId;
    loginData: any;
    campParamData: any;
    userDetails: any;
    xml: string = "";
    campid = "";
    element1: any[];
    serverip = "";
    socketIP = "";
    serverport = "";
    socketPort = "";
    campType: any;
    tcpserverportno: any;
    campname = "";
    isallowagentdashboard = "";
    isallowaprdashboard = "";
    isallowcampdashboard = "";
    isallowcampgroupdashboard = "";
    isallowcrmsearch = "";
    isallowofflinecrm = "";
    isallowofflinesearch = "";
    userid: "";
    accesscode = "";
    selectedPhoneId: boolean = false;
    campgroupid = "";
    crmType = "";
    userType = "";
    choice = "";
    isOffline_Mode = false;
    isFld_Allow_Self_Dashboard = true;
    isEnableEmail = true;
    agentid = "";
    agentName = "";
    campName = "";
    password: any;
    localClientIP = "";
    agnt_id_set = "";
    agnt_name_set = "";
    camp_name_set = "";
    extn_set = "";
    timecntrl = "";
    queuecount = "";
    iscallbackyes = "";
    phone_no = "";
    PhoneNo = "";
    skill12 = "";
    callstate = "";
    dnis_no = "";
    modeType = "";
    Prv_Phone_No = "";
    breakid = 1;
    releaseid = 1;
    makecallinput: any;
    phoneCallMakeCall = null;
    resBreakListData: any = [];
    selectedBreak = this.resBreakListData;
    resCampListData: any = [];
    selectCamp = this.resCampListData;
    resSkillListData: any = [];
    selectSkills = this.resSkillListData;
    resCampagentParamData: any = [];
    resGetAgentAprDetails: any = [];
    resGetConsultDetails: any = [];
    resGetPreviewDetails: any = [];
    breakes: Break[];
    campaigns: Campaign[];
    selectedCampaign: Campaign;
    skillSets: SkillSet[];
    selectedSkillSet: SkillSet;
    selectedCustomerID: string[] = [];
    mode1: string;
    mode2: string;
    submitted: boolean;
    holdDialogBox: boolean;
    modeDialogBox: boolean;
    releaseDialogBox: boolean;
    breakDialogBox: boolean;
    makeCallDialogBox: boolean;
    transferDialogBox: boolean;
    previewDialogBox: boolean;
    consultDialogBox: boolean;
    position: string = 'bottom';
    modeRadioBtn: any;
    // modeRadioBtn: any = "2";
    cols: any[];
    // mode = 'Manual';
    mode: any;
    crmurlpopupstate: any;
    extn_set_state: any;
    extn_set_state_value: boolean = false;
    phone_no_consult: any = '';
    getSessionDataStatus: any;
    allowManualDialing: boolean = false;
    ispreviewdial: any = false;
    isallowtrfrcall: any = false;

    // webrtc start
    muteUnmuteValue: boolean = false
    muteUnmuteText: any = 'Mute'
    // holdUnholdValue: boolean = false;
    // holdUnholdText: any = 'Hold'
    // userDeatails: '1006'
    // userPassword: '1234'

    // serverDetails= {
    //     agLoginCode:"2222",
    //     webRTCPort :  9025,
    //     webRTCServerIP : "wrtc1.icallmate.in"
    // }
    userServerDetailGet: any
    userServerDetail: any
    userId: any
    userPassW: any
    // webrtc end
    myStatusChangeValue: boolean = false;
    setNewVariable: boolean = false
    myDataStatus: any;
    enableWhatsApp: boolean = false;
    checkPhnNo: boolean = false;
    hideWhatsapp: boolean = true;
    state: boolean = false

    // preview box serach wise
    calls:any="1";
    todate: any;
    fromdate: any;
    mob_no: any;
    parentDispoition: any = [];
    subDispoition: any = [];
    parentDispoitionValue: any;
    subDispoitionValue: any;
    modeData: any = [];
    selectedMode: any;
    chkbox_refresh: boolean = false;
    showPreviewPacket:boolean=true;
    showPreviewAPI:boolean=false;
    mySerachApi:boolean=true;
    phoneNumberFromSession:any
    constructor(public app: AppMainComponent,private datePipe: DatePipe,
        private _fb: FormBuilder,
        private breakListData: MenuService,
        private _route: Router,
        private campListData: MenuService,
        private skillListData: MenuService,
        private campagentParamData: MenuService,
        private cdr: ChangeDetectorRef,
        private agentAprDetails: MenuService,
        private renderer: Renderer2,
        private mywebrtcdetailsService: MywebrtcDetailsService,
        private messageService: MessageService,
        private sharedService: SharedService) {
        this.resGetPreviewDetails = [
            { Prv_Phone_No: this.Prv_Phone_No, schdTime: schdTime }

        ];
        this.ispreviewdial = localStorage.getItem('ispreviewdial') === 'true';
        this.isallowtrfrcall = localStorage.getItem('isallowtrfrcall') === 'true';

        setTimeout(() => {
            this.userServerDetailGet = sessionStorage.getItem('serverIpDeatilsNew');
            this.userId = sessionStorage.getItem('agentid')
            this.userPassW = sessionStorage.getItem('userPass')
            if (this.userServerDetailGet) {
                this.userServerDetail = JSON.parse(this.userServerDetailGet);
            }
        }, 1000);
        setTimeout(() => {
            // this.mywebrtcdetailsService.initSipClient(this.localMedia, this.remoteAudio, this.userId, this.userPassW, this.userServerDetail);
            this.mywebrtcdetailsService.initSipClient(
                this.localMedia, 
                this.remoteAudio, 
                this.localVideo, 
                this.remoteVideo,
                this.userId, 
                this.userPassW, 
                this.userServerDetail
            );
        }, 1500);
        setTimeout(() => {
            if (localStorage.getItem('webrtcStatus')) {
                this.setNewVariable = true
            }
        }, 2000);
    }

    ngOnInit() {
        document.getElementById("hold").innerHTML = "Hold";
     this.phoneNumberFromSession = sessionStorage.getItem('phnno');
    if (this.phoneNumberFromSession) {
      // If phone number exists in sessionStorage, assign it to phone_number variable
      this.phone_number = this.phoneNumberFromSession;
    }
        this.mode = 'Manual';
        recivedPacket();
        this.loginResData();
        this.getUserDetails();
        this.campagentparamData();
        this.openSocket();
        this.hostParams();
        this.MenuCall();
        this.breakData();
        this.campData();
        this.skillData();
        this.getPreviewTableData();
        this.getTimeout()
        // this.getPreviewDahData();

        if (this.checkInspectDisableEnable === '1') {
            // Enable inspect mode
            this.enableInspectMode();
          } else {
            // Disable inspect mode
            this.disableInspectMode();
          }
       
    }
    enableInspectMode() {
      }
    
      disableInspectMode() {
        this.preventInspectMode();
      }
    
      preventInspectMode() {
        // Disable right-click
        document.addEventListener('contextmenu', event => event.preventDefault());
    
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        document.addEventListener('keydown', event => {
          if (
            event.keyCode === 123 || // F12
            (event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl+Shift+I
            (event.ctrlKey && event.shiftKey && event.keyCode === 74) || // Ctrl+Shift+J
            (event.ctrlKey && event.keyCode === 85) // Ctrl+U
          ) {
            event.preventDefault();
          }
        });
      }
    hidingWhp() {
        if (this.enableWhatsApp && this.checkPhnNo) {
            this.hideWhatsapp = false;
        }
    }

    searchvalue: any;
    searchpreview() {
        if (!this.searchvalue) {
            this.messageService.add({ severity: 'warn', summary: '', detail: 'Please enter number' });
        } else {
        this.mySerachApi = false
// let data 
        //  if(this.newVariableFalseTrueCheck){
        //      data = {
        //         campID: this.campid,
        //         searchvalue: this.searchvalue,
        //         loginuserId: this.agentid
        //     }
        //  }else{
          let  data = {
                campID: this.campid,
                searchvalue: this.searchvalue,
                loginuserId: this.agentid,
                iscampwise: false,
                count : this.myvalueSEt
            }
        //  }
            this.campListData.loadPreviewData(data).subscribe((res: any) => {
                if (res.status == 'success') {

                    if (res.value.length > 0) {
                        let convertedValue = res.value.map(item => item.value);
                        this.previewDataTable = convertedValue;
                    } else {
                        this.messageService.add({ severity: 'warn', summary: '', detail: 'Data Not Found' });
                    }

                }
            })
        }
    }
    myvalueSEt:any = 10
    minusValue(){
        this.myvalueSEt = this.myvalueSEt - this.myvalueSEt
        // this.pageChangeEvent(this.myvalueSEt)
        if( this.myvalueSEt && this.mySerachApi){
        this.searchpreviewss()
        }else if( this.myvalueSEt && !this.mySerachApi){
            this.searchpreview() 
        }
    }
    plusValue(){
        this.myvalueSEt = this.myvalueSEt + this.myvalueSEt
        if( this.myvalueSEt && this.mySerachApi){
            this.searchpreviewss()
            }else if( this.myvalueSEt && !this.mySerachApi){
                this.searchpreview() 
            }
    }
    pageChangeEvent(value){
        this.myvalueSEt = value.rows
       if(value.first === 0 &&  this.mySerachApi){
        this.searchpreviewss()
       } else if(!this.mySerachApi){
        this.searchpreview()
       }
    }
    searchpreviewss() {
          let  data = {
            iscampwise: true,
                campID: this.campid,
                // searchvalue: this.searchvalue ? this.searchvalue :'281001',
                loginuserId: this.agentid,
                count : this.myvalueSEt
            }
        //  }
            this.campListData.loadPreviewData(data).subscribe((res: any) => {
                if (res.status == 'success') {

                    if (res.value.length > 0) {
                        let convertedValue = res.value.map(item => item.value);
                        this.previewDataTable = convertedValue;
                    } else {
                        this.messageService.add({ severity: 'warn', summary: '', detail: 'Data Not Found' });
                    }

                }
            })
        // }
    }

    previewDashDialogBox: boolean = false;
    previewDashDataTable: any[] = [];
    searchDashvalue: any;

    getPreviewDahData() {
        let data = {
            "campID": this.campid,
            "loginuserId": this.agentid
        }

        this.campListData.loadPreviewCallBackData(data).subscribe((res: any) => {
            let value = res.value;
            this.previewDashDataTable = JSON.parse(value);
        })
    }

    openPReviewDash() {
        this.previewDashDialogBox = true;
        this.getPreviewDahData();
    }

    clearSearch() {
        this.searchvalue = '';
        this.getPreviewTableData();
    }


    getTimeout() {
        setInterval(() => {
            // webrtc start
            if (localStorage.getItem('webrtcStatus')) {
                this.getSessionDataStatus = localStorage.getItem('webrtcStatus');
                if (localStorage.getItem('webrtcStatus') == 'Idle' && sessionStorage.getItem('extn_set') == 'Idle') {
                    this.myStatusChangeValue = true

                }
                this.myDataStatus = sessionStorage.getItem('extn_set')
            }
if(sessionStorage.getItem('redialFromWhatsapp') == 'true'){
    this.Redial()
}
if(sessionStorage.getItem('redialFromWhatsapp') == 'trueOne'){
    setmakecallFromWhatsapp()
}
if(sessionStorage.getItem('openWhatsapp')){
this.openWhatsapp()
}
            // webrtc end
        }, 500)
    }

    getPreviewTableData() {
        if(this.newVariableFalseTrueCheck){
            
            this.previewDataTable = prviewTableData;
        }
    }

    ngDoCheck() {
        this.crmurlpopupstate = localStorage.getItem('crmurlpopupstate')
        this.consultDataTable = consultTableData;

        this.extn_set_state = sessionStorage.getItem('extn_set');
        if (this.extn_set_state != 'Idle') {
            this.extn_set_state_value = true;
        } else {
            this.extn_set_state_value = false;
        }

        if (sessionStorage.getItem('enableWhatsApp')) {
            let itm = sessionStorage.getItem('enableWhatsApp')
            if(itm == 'true'){
                this.enableWhatsApp = true
            }else{
                this.enableWhatsApp = false
            }
        }
        if (sessionStorage.getItem('phnno')) {
            this.checkPhnNo = true;
        }
        if (sessionStorage.getItem('extn_set') == 'Idle') {
            this.state = true;
        }

        this.hidingWhp();
        this.phoneNumberFromSession = sessionStorage.getItem('phnno');
        this.formatPhoneNumber(this.phoneNumberFromSession)
    }
ngAfterViewInit(): void {
    this.checkDetails()
    this.phoneNumberFromSession = sessionStorage.getItem('phnno');
    this.formatPhoneNumber(this.phoneNumberFromSession)
}
checkDetails(){
    this.phoneNumberFromSession = sessionStorage.getItem('phnno');
    this.formatPhoneNumber(this.phoneNumberFromSession)
    this.cdr.detectChanges();
}
    openSocket() {
        sockStart();
    }

    //After Login Response Data
    loginResData() {
        this.crmurlpopupstate = localStorage.getItem('crmurlpopupstate')
        if (localStorage.getItem("loginData")) {
            this.loginData = JSON.parse((localStorage.getItem("loginData")));
            // this.getMaskedDetails(this.loginData);

            for (let i = 0; i < this.loginData['value'].length; i++) {
                this.campid = this.loginData['value'][i]['campid'];
                this.serverip = this.loginData['value'][i]['serverip'];
                this.serverport = this.loginData['value'][i]['serverportno'];
                this.campType = this.loginData['value'][i]['campType'];
                this.userType = this.loginData['value'][i]['userType'];
                this.tcpserverportno = this.loginData['value'][i]['tcpserverportno'];
                document.getElementById('skill1').innerHTML = this.loginData['value'][i]['agentSkill'];


                this.allowManualDialing = this.loginData['value'][i]['allowManualDialing'];
                if (this.allowManualDialing == true) {
                    this.modeRadioBtn = "2";
                    setTimeout(() => {
                        this.selectMode();
                    }, 2000)
                } else {
                    this.modeRadioBtn = "1";
                    setTimeout(() => {
                        this.selectMode();
                    }, 2000)
                }
            }

        }
    }

    //Login Data
    getUserDetails() {
        // this.userDetails = JSON.parse(atob(localStorage.getItem("userDetails")));
        this.agentid = sessionStorage.getItem('agentid')
    }

    hostParams() {
        setParams(
            this.agentid,
            this.password,
            this.serverip,
            this.socketIP,
            this.serverport,
            this.socketPort,
            this.crmType,
            this.userType,
            this.isOffline_Mode,
            this.isFld_Allow_Self_Dashboard,
            this.isEnableEmail,
            this.campName,
            this.campid,
            this.agentName,
            this.localClientIP,
            this.crmurlpopupstate
        );
    }

    Hold() {
        sethold();
    }
    Mode() {
        this.modeDialogBox = true;
    }

    selectMode() {
        setdialmode(this.modeRadioBtn);
        if (this.modeRadioBtn == "1") {
            this.mode = 'Auto';
        }
        else {
            this.mode = 'Manual';
        }

        switch (this.modeRadioBtn) {
            case '1':
                this.mode = 'Auto';
                break;
            case '2':
                this.mode = 'Manual';
                break;
            default:
                this.mode = 'Manual';
                break;

        }
    }

    Break() {
        this.submitted = true;
        this.breakDialogBox = true;
    }

    breakCall() {
        sessionStorage.setItem('indexingCheckValue','NONWHATSAPPTAB')
        setbreak(this.selectedBreak);
    }

    Release() {
        setrelease(this.releaseid);
    }

    MakeCall() {
        if (this.extn_set_state == 'Idle') {
            this.submitted = true;
            this.makeCallDialogBox = true;
            this.phoneCallMakeCall = null;
        } else {
            alert("You are in " + this.extn_set_state + ' state')
        }
        this.phoneNumberFromSession = sessionStorage.getItem('phnno');
        this.formatPhoneNumber(this.phoneNumberFromSession)
    }

    dialCall() {
        this.app.onLayoutClick();
        sessionStorage.setItem('sendTicketDetails',this.newTicketValueSet)
        this.phoneNumberFromSession = sessionStorage.getItem('phnno');
        this.formatPhoneNumber(this.phoneNumberFromSession)
        if (this.selectedPhoneId == false) {
            setmakecall();
            this.submitted = true;
            this._route.navigate(['/iCallMate-cCP']);
            this.makeCallDialogBox = false;
        this.app.onLayoutClick();
        }
        else if (this.selectedPhoneId == true) {
            let dataSend = {
                    "campID": this.campid,
                    "userType":this.userType,
                    "LoginUserID":  this.agentid,
                    "id":String(this.phoneCallMakeCall)
                }
            this.campListData.makeCallByPhoneID(dataSend).subscribe((res: any) => {
                setmakecallbyPhoneID(res.PhoneNo, this.phoneCallMakeCall);
                this.makeCallDialogBox = false;
        this.app.onLayoutClick();
            });
        }
    }

    Redial() {
        sessionStorage.removeItem('redialFromWhatsapp')
        sessionStorage.setItem('sendTicketDetails',this.newTicketValueSet)

        if (this.modeRadioBtn == "2") {
            if (this.extn_set_state == 'Idle') {
                setredialmakecall();
                // blank() // comment kiya h
            } else {
                alert("You are in " + this.extn_set_state + ' state')
            }
        } else {
            alert("You must be in Manual Dial Mode")
        }
    }

    dispose() {
        setdispose();
    }

    TransferCall() {
        this.submitted = true;
        this.transferDialogBox = true;
    }

    consultTransferCall() {
        setTransferFromConsult();
    }

    consultConference() {
        setConference();

    }

    transferCall() {
        this.submitted = true;
    }

    transferDial() {
        settransfercall();
    }

    Preview() {
        this.showPreviewAPI=false;
        this.showPreviewPacket=true;
        this.previewDataTable = []
        this.searchvalue = '';
        this.previewDialogBox = true;
        // this.position =this.position
        this.previewDataSearchTablee = []
        this.submitted = true;
        this.getPreviewTableData();
        // if(!this.newVariableFalseTrueCheck){
        // }
        this.searchpreviewss()
    }
    onClearData(){
        this.previewDataSearchTablee = []
    this.calls="1";
    this.selectedMode = '';
    this.parentDispoition = ''
    this.mob_no = ''


    }
    consult() {
        this.consultDataTable = [];
        this.phone_no_consult = '';

        this.submitted = true;
        this.consultDialogBox = true;

    }


    MenuCall() {
        menucall(this.choice)
    }

    ConsultDial() {
        setConsultCall();
    }

    breakData() {
        this.resBreakListData = [];
        this.submitted = true;


        // let afterLoginDetails = sessionStorage.getItem('afterLoginUpdatedDetails');
        // let payLoad = {
        //     "campid": afterLoginDetails
        // }

        let payLoad = {
            "campid": this.campid
        }


        this.breakListData.breaklist(payLoad).subscribe(
            (data: any) => {
                let res: any = data['value'];

                for (let i = 0; i < res.length; i++) {
                    this.resBreakListData.push(res[i]);
                }
            });
    }


    campData() {
        this.resCampListData = [];
        this.submitted = true;
        let payLoad = {
            "campid": this.campid
        }
        this.campListData.camptrfrlist(payLoad).subscribe(
            (data: any) => {
                // 
                let res: any = data['value'];

                for (let i = 0; i < res.length; i++) {
                    this.resCampListData.push(res[i]);
                }
                for (let i = 0; i < this.resCampListData['value'].length; i++) {
                    // this.campgroupid = this.resCampListData['value'][i]['campgroupid'];
                    this.accesscode = this.resCampListData['value'][i]['accesscodes'];
                }


            });
    }


    skillData() {
        this.resSkillListData = [];
        this.submitted = true;
        let payLoad = {
            "campgroupid": "1",
            "accesscode": this.accesscode
        }
        this.skillListData.skillsetlist(payLoad).subscribe(
            (data) => {
                let res: any = data;

                if (res['value'].includes("No Record found")) {
                    this.resSkillListData.push({ 'label': 'No Record found' });
                }
                else {
                    let res: any = data['value'];

                    for (let i = 0; i < res.length; i++) {
                        this.resSkillListData.push(res[i]);
                    }

                }
            });
    }



    campagentparamData() {
        this.resCampagentParamData = [];
        this.submitted = true;
        let payLoad = {
            "campid": this.campid,
            "agentid": this.agentid
        }
        this.campagentParamData.campagentparam(payLoad).subscribe(
            (data: any) => {
                let res: any = data['value'];

                localStorage.setItem("campParamData", btoa(JSON.stringify(res)));
                this.campParamData = JSON.parse(atob(localStorage.getItem("campParamData")));
                for (let i = 0; i < this.campParamData.length; i++) {
                    this.campname = this.campParamData[i]['campname'];
                    this.isallowagentdashboard = this.campParamData[i]['isallowagentdashboard'];
                    this.isallowaprdashboard = this.campParamData[i]['isallowaprdashboard'];
                    this.isallowcampdashboard = this.campParamData[i]['isallowcampdashboard'];
                    this.isallowcampgroupdashboard = this.campParamData[i]['isallowcampgroupdashboard'];
                    this.isallowofflinecrm = this.campParamData[i]['isallowofflinecrm'];
                    this.isallowofflinesearch = this.campParamData[i]['isallowofflinesearch'];
                    this.userid = this.campParamData[i]['userid'];
                }

                for (let i = 0; i < res.length; i++) {
                    this.resCampagentParamData.push(res[i]);
                }

            }
        )
    }


    getagentaprdetails() {
        this.resGetAgentAprDetails = [];
        this.submitted = true;
        let payLoad = {
            "campid": this.campid,
            "agentid": this.agentid
        }
        this.agentAprDetails.getagentaprdetails(payLoad).subscribe(
            (data: any) => {
                let res: any = data['value'];

                for (let i = 0; i < res.length; i++) {
                    this.resGetAgentAprDetails.push(res[i]);
                }

            }
        )
    }


    consultHold() {
        setConsultHold();
    }

    consultRelease() {
        setConsultRelease();
    }

    info(phoneno, leadid, recordid, phoneid) {
        sessionStorage.setItem('sendTicketDetails',this.newTicketValueSetValue)
        if (!this.extn_set_state_value) {




            setPreviewDialSearch(phoneno, leadid, recordid, phoneid);
            this.previewDialogBox = false;
        }
    }

    previewCall(phoneno, campid, leadid, recordid, phoneid) {
        if (!this.extn_set_state_value) {
            setupdatedmakecall(phoneno, campid, leadid, recordid, phoneid);
            this._route.navigate(['/iCallMate-cCP']);
            this.previewDialogBox = false;
        }
    }

    
    previewCallNew(phoneno,campId, leadid, recordid, phoneid) {
        if (!this.extn_set_state_value) {
            setmakecallbyPhoneIDByPreview(phoneno, campId, leadid, recordid, phoneid);
            this._route.navigate(['/iCallMate-cCP']);
            this.previewDialogBox = false;
        }
    }
    previewCallSearch(phoneno, leadid, recordid, phoneid) {
        if (!this.extn_set_state_value) {
            setupdatedmakecall(phoneno, this.campid, leadid, recordid, phoneid);
            this._route.navigate(['/iCallMate-cCP']);
            this.previewDialogBox = false;
        }
    }

    disscardPreviewDialList(leadid, calllistrecid, isdiscard, discardreason, i) {
        if (!this.extn_set_state_value) {
            setdiscardcall(leadid, calllistrecid, isdiscard, discardreason);
            this.previewDataTable.splice(i, 1);
        }

    }

    remove(i) {
        if (!this.extn_set_state_value) {
            this.previewDataTable.splice(i, 1);
        }
    }

    // muteUnmuteValue:any;
    // muteUnmuteText:any;
    // holdUnholdValue:any;
    // holdUnholdText:any;

    checkMuteUnmute(value: any) {
        if (value == 'Mute') {
            this.muteUnmuteValue = true
            this.mywebrtcdetailsService.toggleMicrophoneMute(); // Call the service method to toggle microphone
            this.muteUnmuteText = 'Unmute'
        } else {
            this.muteUnmuteValue = false
            this.mywebrtcdetailsService.toggleMicrophoneUNmute(); // Call the service method to toggle microphone
            this.muteUnmuteText = 'Mute'
        }
    }
    openWhatsapp() {
        this.app.onLayoutClick()
        sessionStorage.removeItem('openWhatsapp')
        this.app.onLayoutClick()
        sessionStorage.setItem('myWhatsappStarted','myWhatsappStarted')
        this.sharedService.socialMediaDetected('whatsapp');
    }

    // preview Serch wise data
     
    parentDispoitionValueagent() {
        let data = {
            campid:this.campid,
        }
      this.agentAprDetails.getPreviewSearchDisposition(JSON.stringify(data)).subscribe(
        (res) => {
  
          if (res) {
            // this.parentDispoition = [];
            this.parentDispoition = res['value'][0];
          }
        });
  
    }
    getMode(){
        this.modeData=[
            {label:'Auto',value:"1"},
            {label:'Manaual',value:"2"},
            {label:'Both',value:"0"}
        ]
    }
    previewDataSearchTablee:any=[];
    onSubmitPreviewDashboard(){
        this.showPreviewPacket=false;
        this.showPreviewAPI=true;
        let fromDate:any="" , toDate:any=""; let disposition="";
        if(this.todate){
    let to = new Date (this.todate);
    toDate =  this.datePipe.transform(to, 'yyyy-MM-dd HH:mm:ss.SSS');
        }
        if(this.fromdate){
    let from = new Date (this.fromdate);
    fromDate =  this.datePipe.transform(from, 'yyyy-MM-dd HH:mm:ss.SSS');
        }
        if(!this.selectedMode){
            this.selectedMode="";
        }
        disposition= this.parentDispoitionValue

        if(!disposition || disposition==null){
            disposition="";
        }
        if(!this.mob_no || this.mob_no==null){
            this.mob_no="";
        }
        let data = {
            "campID": this.campid,
            "loginuserId": this.agentid,
            "fromDate":fromDate,
	        "toDate":toDate,
	        "disposition":disposition,
	        "refresh":this.calls,
	        "manual_auto":this.selectedMode,
	        "mobileNo":this.mob_no
        }

        this.agentAprDetails.loadPreviewCallBackData(data).subscribe((res: any) => {
            if(res.value && res.value.length!=0){
            let value = res.value;
            this.previewDataSearchTablee = JSON.parse(value);
            }
        })
    }
    
    disscardPreviewSearch(item:any){
        let data = {
            recordID:item.recordid,
            campID:this.campid
        }
        this.agentAprDetails.getPreviewSearchDiscard(JSON.stringify(data)).subscribe((res:any)=>{
            if(res.status=='success'){
                this.messageService.add({ severity: 'info', summary: 'info', detail: 'Data discard successfully' });
                this.onSubmitPreviewDashboard();
            }
        })

    }
   

    info1(item: any) {
        sessionStorage.setItem('sendTicketDetails',this.newTicketValueSetValue)
        let status = document.getElementById('extn_set') as HTMLSpanElement;
        if (status.innerText == 'Idle') {
            sessionStorage.setItem('phnno', item.phoneno);
            sessionStorage.setItem("phoneID", item.phoneid);
            sessionStorage.setItem("recordid", item.recordid);
            sessionStorage.setItem("leadid", item.leadid);
            setPreviewDialSearch(item.phoneno, item.leadid, item.recordid, item.phoneid);
        }
        else {
            this.messageService.add({ severity: 'info', summary: 'info', detail: 'Can not info during Active Call' })
        }
    }
    formatPhoneNumber(phoneNumber: any) {
        if(phoneNumber){
            const visibleDigits = 3;
            const visiblePart = phoneNumber.substring(phoneNumber.length - visibleDigits);
            const hiddenPart = '*'.repeat(phoneNumber.length - visibleDigits);
            this.newPhoneNumber =  hiddenPart + visiblePart;
        }else{
            // return  phoneNumber 
            this.newPhoneNumber =this.phoneNumberFromSession

            // return   this.phoneNumberFromSession 
        }
       
      }
      checkVideoEnableDisable(){
        this.breakDialogBox1 = !this.breakDialogBox1
      }
      videoCall(){
        this._route.navigateByUrl('iCallMate-cCP/new-home')

      }
}
