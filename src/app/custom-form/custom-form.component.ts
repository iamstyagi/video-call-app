import { Component, OnInit, HostListener, ChangeDetectorRef, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { DynamicFormComponent, Field } from 'dynaform';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CustomService } from '../demo/service/custom.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DynamicFormService } from '../demo/service/dynamic-form.service';
import { FormField, FormFieldJSON } from '../form-field';
import { DatePipe } from '@angular/common';
import { TwitterService } from '../twitter/services/twitter.service';
import { environment } from 'src/environments/environment';
import { Mail } from '../model/mail';
import { SharedService } from '../demo/service/shared.service';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
declare function setlogout();
declare function setdispose(campid, dispremarks, dispid, iscallback, callbacktime, assigntoid, custfeedback, otherrems, isdisplogout, NextAltNumberType)
declare function openLogin()
declare function blank()
interface assigendItem {
    name: string,
}

interface markItem {
    name: string,
}


@Component({
    selector: 'app-custom-form',
    templateUrl: './custom-form.component.html',
    styleUrls: ['./custom-form.component.scss'],
    styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }

  @media screen and (max-width: 960px) {
      :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
          text-align: center;
      }

      :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:nth-child(6) {
          display: flex;
      }
  }
`],
    providers: [MessageService, ConfirmationService, DatePipe]
})



export class CustomFormComponent implements OnInit, AfterViewInit, OnDestroy {
    private subscription: Subscription;

    // for checkinjg two values

    newVariableFalseTrueCheck: boolean = environment.newVariableFalseTrueCheck
    dispoitionIdUsed: any = environment.dispoitionIdUsed

    ticketSaved: boolean = false;
    selectedAssignedTo: any;
    ticketTypeHistory: any = [];
    ticketStartTimeUpdate: any;
    ticketRecords: any = [];
    ticketStartTime: any;
    ticketEndTime: any;
    duration: any;
    tree: any;
    mainVariable: boolean = false
    hideDropDownEnableDIsable: boolean = false
    getDataNew: any = false
    disabledTicketFields: boolean = true;
    ticketNo: any; sourceName: any; ticketCampaignName: any; actionNo: any; ticketTime: any; ticketDuration: any;
    showUpdateButton: boolean = false;
    showSaveButton: boolean = false;
    showDynaTicketCard: boolean = false;
    showTicketCard: boolean = false;
    assignredByDataDropdown: any = [];
    selectedAssignedBydata: any;
    ticketTypeDropdownData: any[] = [];
    selectedTicketType: any[] = [];
    ticketStatusDropdownData: any = [];
    selectedticketStatus: any;
    agentRemarks: any;
    customArray = {};
    userDetails: any;
    loginData: any;
    PhoneNo;
    dropdownValue;
    checkValue;
    radioButtonValue;
    listBoxValue;
    textAreaValue;
    selectedCities;
    solutionValue;
    feedbackValue;
    remarksValue;
    agentid = "";
    campid: string;
    campName = "";
    agentName = "";
    serverip = "";
    serverport = "";
    campType = "";
    userType = "";
    tcpserverportno = "";
    getCrmId = "";
    getAgentName = "";
    // products: Product[];
    products1: any[];
    phoneData: any;
    street: string = 'Main Street';
    selectedProducts: any;
    number: string;
    submitted: boolean;
    valRadio: string;
    val: "";
    valData: any = [];
    date: Date = new Date();
    selectedCallBack: boolean;
    selectedDisposeCall: any;
    resLabelData: any = [];
    subDispositionData: any = [];
    subDisposition1Data: any = [];
    subDisposition2Data: any = [];
    subDisposition3Data: any = [];
    subDisposition4Data: any = [];
    resData: any = [];
    selectedType;
    selectedType1;
    selectedType2;
    selectedType3;
    selectedType4;
    isValueDisable: boolean = false;
    disabled: true;
    showClear: boolean = true;
    fld_phoneno = "";
    dispID = "";
    dispid = "";
    newPhoneIdSet: any
    phoneid = sessionStorage.getItem("phoneID");
    callsattus;
    contactstate = sessionStorage.getItem('contactstate');
    newContactstate = "0";
    parentlistdisposeid = "0";
    dispremarks = "";
    isCBChecked = "";
    cbDateTime = "";
    assigntoid = "";
    custfeedback = "";
    otherrems = "";
    isMarkAsClosed = "";
    phoneNo = "";
    ngForm: FormGroup;
    dispositionForm: FormGroup;
    dispositionForm1: FormGroup;
    AssignedBy: assigendItem[];
    selectedAssignedBy: any;
    MarkAs: markItem[];
    selectedMarkAs: markItem;
    enableButton: boolean = false;
    disableSubDisposition: boolean = true;
    disableSubDisposition1: boolean = true;
    disableSubDisposition2: boolean = true;
    disableSubDisposition3: boolean = true;
    disableSubDisposition4: boolean = true;
    selectedState: any = null;
    selectedSchoolCode: any;
    slectedProblemV: any;
    checkDependentV: any;
    selectedSchoolName: any;
    subDistrictV: any;
    subBotValue: any;
    historyDialogBox: boolean;
    consultDialogBox: boolean;
    resLeadCustFieldData: any = [];
    selectedBreak = this.resLeadCustFieldData;
    customForm: FormGroup;
    ticketForm: FormGroup;
    ticketFields: any = [];
    formFields: any[];
    ticketHistoryForm: FormGroup;
    dynamicStore: any;
    jsonformModel: any[];
    jsonformModel1: any[];
    cols: any[];
    stringSaveDynamicFormData;
    saveData = {};
    fld_FieldName: string;
    choice = "";
    eventData: string;
    fld_FieldNames;
    values;
    disposeCall: boolean = true;
    setFieldDisable: boolean;
    dispositionID;
    callHistoryTableData: any = [];
    abc: any = [];

    getValueParakhBot: any[] = []
    liveDM: boolean = false;
    ticketID: any;
    chatMessages: any[] = [];
    liveChatDialog: boolean = true;
    chatUser: any;
    accountid: any;
    remoteUserid
    liveChat: boolean = false;
    textContent: any;
    selectedAttachment: any;
    showDisposeButton: boolean;
    callinvid: any;
    callID: any;
    voicefile: any;
    isMasked: any = false;
    maskOffSet: any;
    phone_no: string = '';
    extn_set: any;
    arrObj: number[] = new Array(1);
    getDynamicFormFieldsCache: any;
    phoneDataa: any;
    newTicketFlag: boolean = false;
    ticketEnable: boolean = false;
    inputCheck: boolean = false;


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
    emailFound = false;
    emailPopUpTrueFalse: boolean = false
    selctedSchoolCode: any[] = []
    mainValueGet: any

    // schoolname
    schoolCodeValue: any
    schoolNameValue: any
    districtValue: any
    blockNameValue: any
    filterValue: any
    myValueLatest: any
    gettingGraphVariable: boolean = false
    dataN: any;
    enableChat: boolean = false;
    enableWhatsApp: boolean = false;
    options: any;
    myNewArrayValue: any[] = []
    myNewArrayValue1: any[] = []; // Ensure it's an array
    enableEmail:boolean = false
    constructor(
        private ref: ChangeDetectorRef,
        private datePipe: DatePipe,
        private fb: FormBuilder,
        private customService: CustomService,
        private _route: Router,
        private messageService: MessageService,
        private dynamicFormService: DynamicFormService,
        private builder: FormBuilder,
        private twitterService: TwitterService,
        private renderer: Renderer2,
        private sharedService: SharedService,
    private confirmationService: ConfirmationService,


    ) {

        // this.customForm = this.fb.group({

        // })
        this.ticketForm = this.fb.group({

        });
        

        this.ticketHistoryForm = this.fb.group({

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
        this.getDataNew = sessionStorage.getItem('sendTicketDetails')
        if (this.getDataNew == true || this.getDataNew == 'true') {
            this.mainVariable = true
        } else {
            this.mainVariable = false
        }
        this.customService.getData().subscribe(updatedData => {
            this.oneFunctioNRepeat(updatedData);

        });
    }

    @HostListener('window:storage', ['$event'])
    onStorageChange(event: StorageEvent) {
        if (event.key === 'extn_set') {
            //   this.extnSet = event.newValue;
            sessionStorage.setItem('extn_set', event.newValue)
            this.onShowDispositionButton();
        }


        const currentDate = new Date();
        this.minDate = currentDate;
    }



    onShowDispositionButton() {
        if (sessionStorage.getItem('extn_set') == 'Idle') {
            this.showDisposeButton = false;
        }
        else {
            this.showDisposeButton = true;
        }
    }


    ngOnInit(): void {
        this.agentid = sessionStorage.getItem('agentId');
        this.callinvid = sessionStorage.getItem('callinvid');
        this.callID = sessionStorage.getItem('callID')
        this.loginResData();
        this.getDynamicFormFields();

        this.cols = [
            { field: 'code', header: 'Channel No' },
            { field: 'name', header: 'Phone No' },
            { field: 'category', header: 'State' },
            { field: 'quantity', header: 'Hold' },
            { field: 'quantity', header: 'HangUp' }
        ];
        this.onShowDispositionButton();
        this.tabName()
        // this.getMaskedNo();
        this.getItemDetails()

    }

    ngDoCheck() {
        // this.getMaskedNo();
        this.extn_set = sessionStorage.getItem('extn_set');
        this.logoutOnCacheClear();
    }

    logoutOnCacheClear() {
        if (this.extn_set === '' || this.extn_set === undefined) {
            location.reload();
            openLogin();
        }
    }


    // uncomment this to enable masking
    getMaskedNo() {
        const phnno = sessionStorage.getItem('phnno');
        this.isMasked = localStorage.getItem('isMasked');

        if (this.isMasked) {
            const maskOffSet: any = localStorage.getItem('maskOffSet');
            this.phone_no = "X".repeat(maskOffSet) + phnno.slice(maskOffSet);

            const phoneInput = document.getElementById('phoneInput') as HTMLInputElement;
            if (phoneInput) {
                phoneInput.value = this.phone_no;
            }
        }
    }

    tabName() {
        localStorage.setItem('tabName', 'custForm')
    }

    loginResData() {
        this.loginData = JSON.parse((localStorage.getItem("loginData")));
        for (let i = 0; i < this.loginData['value'].length; i++) {
            this.campid = this.loginData['value'][i]['campid'];
            this.serverip = this.loginData['value'][i]['serverip'];
            this.serverport = this.loginData['value'][i]['serverportno'];
            this.campType = this.loginData['value'][i]['campType'];
            this.userType = this.loginData['value'][i]['userType'];
            this.tcpserverportno = this.loginData['value'][i]['tcpserverportno'];
            this.ticketEnable = this.loginData['value'][i]['ticketEnable'] != null ? this.loginData['value'][i]['ticketEnable'] : true;
        this.enableEmail = this.loginData.value[i].enableEmail;
        this.enableWhatsApp = this.loginData.value[0].enableWhatsApp;
        this.enableChat = this.loginData.value[0].enableChat;

        }
        if (sessionStorage.getItem('campSharedDataGet')) {
            let newDa = sessionStorage.getItem('campSharedDataGet')
            let dataOfNewVal = JSON.parse(newDa)
            this.gettingGraphVariable = dataOfNewVal['isenablebiometric']
            this.myNewArrayValue = dataOfNewVal['biometricsuccessper']
            if (this.gettingGraphVariable) {
                this.getDataNewOnew()
            }
        }
    }



    activeCallbackCalendar() {
        this.inputCheck = true
    }


    getDynamicFormFields() {
        if (sessionStorage.getItem("getDynamicFormFieldsCache") && JSON.parse(sessionStorage.getItem("getDynamicFormFieldsCache")).campid == this.campid) {
            this.formFields = JSON.parse(sessionStorage.getItem("getDynamicFormFieldsCache")).data;

            const formGroupControls = {};
            this.getDynamicLeadCustField();
            for (const field of this.formFields) {
                formGroupControls[field.fld_FieldName] = [field.value || ''];
            }
            this.customForm = this.fb.group(formGroupControls);

        } else {
            let payLoad = {
                "campid": this.campid,
            }
            this.dynamicFormService.getFormFields(payLoad).subscribe(
                (data: FormField) => {
                if(data['status'] == 'failure'){
                    this.messageService.add({ summary: 'info', severity: 'info', detail: data['value'] });
                }else{
                    data = data['value'];
                    let formFields = Object.values(data);
                    this.formFields = formFields.sort((a, b) => a.reportDisplaySeqNo - b.reportDisplaySeqNo);

                    this.getDynamicFormFieldsCache = {
                        "campid": this.campid,
                        data: this.formFields
                    }
                    sessionStorage.setItem("getDynamicFormFieldsCache", JSON.stringify(this.getDynamicFormFieldsCache))
                    const formGroupControls = {};
                    this.getDynamicLeadCustField();
                    for (const field of this.formFields) {
                        formGroupControls[field.fld_FieldName] = [field.value || ''];

                        // value = this.formatPhoneNumber(value);

                    }
                    this.customForm = this.fb.group(formGroupControls);
                }
                });
        }


    }


    async getDynamicLeadCustField() {
        try {
            let payLoad = {
                "campid": this.campid,
                "phoneid": this.phoneid,
                "mode": "1",
                "fld_phoneno": sessionStorage.getItem('phnno'),
                // "sourceType": "3" 
            }
            this.dynamicFormService.getLeadCustField(payLoad).subscribe(
                async (data) => {

                    const parsedData = JSON.parse(data['value']);

                    this.phoneDataa = parsedData
                    if (!this.newVariableFalseTrueCheck) {
                        this.schoolCodeValue = parsedData.value.fld_fieldtext3
                        this.schoolNameValue = parsedData.value.fld_fieldtext4
                        this.districtValue = parsedData.value.fld_fieldtext5
                        this.blockNameValue = parsedData.value.fld_fieldtext6

                        if (parsedData.value.fld_fieldtext7 === 'Meri Upashthiti') {
                            // this.getValueParakhBot = []
                            // this.returnMatchedParentValue(field);
                            this.getMeriUpasthithi()
                            setTimeout(() => {
                                this.problemReportedValue = parsedData.value.fld_fieldtext8


                            }, 1000);
                        } else if (parsedData.value.fld_fieldtext7 === 'Meri Upashthiti') {
                            this.getParakBot()
                            setTimeout(() => {
                                this.problemReportedValue = parsedData.value.fld_fieldtext8

                            }, 1000);
                        }
                    }



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
                        await this.getTicketInformation(ticketData);
                        if (this.sourceName == 'Twitter') {
                            this.liveDM = true;
                        }
                        else {
                            this.liveDM = false;
                        }

                        const parsedValue = parsedData.value;

                        const formGroupControls = {};
                        for (const field of this.formFields) {

                            if (parsedValue.hasOwnProperty(field.fld_FieldName)) {
                                let value = parsedValue[field.fld_FieldName];

                                if (value === 'true') {
                                    value = true;
                                }
                                this.myValueLatest = this.customForm.value
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
    isEmailField(fieldName: any): any {
        const emailVariations = ['email', 'email address', 'email id', 'emailId', 'Email ID', 'Email ID'];
        // return emailVariations.includes(fieldName.toLowerCase().replace(/\s+/g, ''));
        return emailVariations.includes(fieldName);
    }

    newTicket() {
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


    async getTicketInformation(ticketData) {


        const res = await this.dynamicFormService.getTicketInfo(JSON.stringify(ticketData)).toPromise();
        if (res.status == "Success") {
            this.showTicketCard = true;
            this.showSaveButton = false;
            this.showUpdateButton = true;
            this.disabledTicketFields = true;
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
        this.customService.getTicketType(this.campid).subscribe((res: any) => {
            this.ticketTypeDropdownData[0] = res;
            this.ref.detectChanges();
        })
    }

    getTicketStatus() {
        let data = {};
        this.customService.getTicketStatus(data).subscribe((res: any) => {
            this.ticketStatusDropdownData = res;
            this.ref.detectChanges();
        })
    }


    updateTiecket() {
        let formatedDate = new Date();
        this.ticketStartTimeUpdate = this.datePipe.transform(formatedDate, 'yyyy-MM-dd HH:mm:ss.S');
        this.showSaveButton = true;
        this.showUpdateButton = false;
        this.disabledTicketFields = false;
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
            this.customService.getNextTicketType(campID, ticketTypeID).subscribe((res: any) => {

                this.tree = res.tree;
                if (res.listTicketTypes != 'No Record Found') {
                    this.arrObj.push(res.listTicketTypes[0]);
                    this.ticketTypeDropdownData[i + 1] = res.listTicketTypes;
                    this.updatedticketTypeDropdownData = res.listTicketTypes; // added this to get updated dropdown for dispid
                }
                this.customService.getDynaTicket(JSON.stringify(DynaTicketData = { campid: campID, ticketTypeID: ticketTypeID })).subscribe((res: any) => {
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


    ticketTypeIDdd: any;
    saveTicketData() {
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
            this.ticketRecords.source_Type = 0;
        }

        if (this.updatedTicketType) {
            this.ticketTypeIDdd = this.updatedTicketType;
        } else {
            this.ticketTypeIDdd = this.selectedTicketType[0];
        }
        this.onUpdateForm((result) => {
            if (result) {
                let saveData = {
                    phoneID: this.phoneid != '0' ? this.phoneid : result.phoneid,
                    ticketStartTime: this.ticketStartTimeUpdate,
                    source_Type: this.ticketRecords.source_Type,
                    source_ID: this.callID,
                    fld_Source_Value: this.ticketRecords.fld_Source_Value,
                    call_Time: this.ticketRecords.call_Time,
                    ticket_closureID: this.ticketRecords.ticket_closureID,
                    loginUserID: this.agentid,
                    userType: 3,
                    campID: this.campid,
                    ticketID: this.ticketNo,
                    sourceName: this.sourceName,
                    campName: this.ticketCampaignName,
                    action_No: this.actionNo,
                    ticket_Time: this.ticketTime,
                    ticketTime: this.ticketDuration,
                    assignedByID: this.selectedAssignedBy,
                    ticket_statusID: this.selectedticketStatus,
                    remarks: this.agentRemarks,
                    ticket_TypeID: this.newVariableFalseTrueCheck ? this.ticketTypeIDdd : this.dispoitionIdUsed,
                    dynaticketfieldsValues: dynaticketfieldsValues,
                    callInvokeID: this.callinvid,
                    csvoicefile: callRecording
                }

                this.customService.saveTicketData(JSON.stringify(saveData)).subscribe((res: any) => {
                    this.ticketSaved = true;
                    if (res.status == 'Success') {
                        this.messageService.add({ summary: 'info', severity: 'info', detail: 'Your Tickets information saved successfully' });
                        this.ticketNo = res.ticketID;

                        // enabling disable button
                        this.disposeCall = false;

                        let ticketData = {
                            ticketid: this.ticketNo,
                            campid: this.campid,
                            custid: this.phoneid
                        }

                        this.getTicketInformation(ticketData);
                        this.customService.getTicketHistoryData(this.campid, this.ticketNo).subscribe((res: any) => {
                            this.ticketTypeHistory = res.value;
                        })
                    }
                    else {
                        this.messageService.add({ summary: 'info', severity: 'info', detail: res.value })
                    }
                })
            }
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

            // if (!this.newVariableFalseTrueCheck) {

            //     this.dispositionID = this.dispoitionIdUsed;
            // } else {
            this.dispositionID = selectedTicketType.description;
            // }


        }
    }

    // modified fn
    onUpdateForm(callback) {
        let cb;
        let newObj;
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
        // this.getDispositionId();

        if (this.phoneData && this.phoneData.fld_phoneno) {
            fld_phoneno = this.phoneData.fld_phoneno
        }
        else {
            fld_phoneno = sessionStorage.getItem('phnno')
        }
        let payLoad = {
            "campid": this.campid,
            "mode": 2,
            "phoneid": this.phoneid,
            "agentid": this.agentid,
            "fld_phoneno": sessionStorage.getItem('phnno'),
            "dispid": this.dispositionID ? this.dispositionID : this.dispoitionIdUsed,
            "cb": this.selectedCallBack,
            "cbtime": formattedDate,
            "cbassignedto": this.selectedAssignedTo,
            "ticketTypeId": this.selectedTicketType[0],
            // "ticketID": ticketID
        }

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
        this.dynamicFormService.getLeadCustField(newObj).subscribe(
            (data: any) => {
                this.phoneData = data;

                let parsedData = JSON.parse(data.value);

                if (parsedData.status == 'success') {
                    this.newPhoneIdSet = parsedData.phoneid
                    callback(parsedData);
                }

            }, (err: any) => {

            });
    }


    saveDispositionForm() {
        sessionStorage.removeItem('myNewArrayValueSession')
        // alert(4)
        if (this.ticketSaved == true) {
            let cb;
            let formattedDate: String;
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

            if (this.updatedTicketType) {
                this.ticketTypeIDdd = this.updatedTicketType;
            } else {
                this.ticketTypeIDdd = this.selectedTicketType[0];
            }

            let mode = sessionStorage.getItem('latestDialMode');
            if (this.selectedDisposeCall == 2) {
                sessionStorage.setItem('redialFunctionality', 'true');
            }
            else {
                sessionStorage.setItem('redialFunctionality', 'false');
            }
            let dispidData = this.dispositionID ? this.dispositionID : this.dispoitionIdUsed
            let payLoad = {
                "campid": this.campid,
                "mode": mode,
                "phoneid": this.phoneid != '0' ? this.phoneid : this.newPhoneIdSet,
                "agentid": this.agentid,
                "fld_phoneno": sessionStorage.getItem('phnno'),
                // "fld_phoneno": this.phoneData.fld_phoneno  ? this.phoneData.fld_phoneno : sessionStorage.getItem('phnno'),
                "dispid": dispidData,
                // "dispid": this.dispositionID,
                "cb": this.selectedCallBack,
                "cbtime": formattedDate,
                "cbassignedto": this.selectedAssignedTo,
                // "ticketTypeId": this.selectedTicketType[0]
                // "ticketTypeId": this.updatedTicketType
                "ticketTypeId": this.ticketTypeIDdd
            }
            // let phonedata = JSON.parse(this.phoneData)

            // if (phonedata && phonedata.status == 'success') {

            if (this.phoneDataa) {
                sessionStorage.setItem('callID', '0');
                sessionStorage.setItem('redialPayload', JSON.stringify(payLoad))
                this.customService.disposeCallApi(this.selectedAssignedTo, this.selectedCallBack, payLoad);
                this.ticketSaved = false;
            }
            else {
                // uncomment this above to avoid stuck in call dispose
                this.messageService.add({ severity: 'info', summary: 'Warning', detail: 'call not disposed' })
            }
        }

        else {
            this.messageService.add({ severity: 'info', summary: 'Warning', detail: 'Firstly Save or Update your Ticket' })
        }
    }


    callHistory() {
        this.historyDialogBox = true;
        this.customService.getTicketHistoryData(this.campid, this.ticketNo).subscribe((res: any) => {
            this.ticketTypeHistory = Object.values(res.value);
        });
    }

    Conference() {
        this.submitted = true;
    }

    transferCall() {
        this.submitted = true;
    }

    dmChat() {
        let data = {
            campID: this.campid,
            userType: this.userType,
            loginUserID: this.agentid,
            ticketID: this.ticketID.toString()
        }


        this.twitterService.openDMchat(data).subscribe((res: any) => {

            this.chatMessages = res.value[0].alChatMessages


            // if (this.liveChatDialog) {
            this.chatUser = res.value[0].remoteUser;
            this.accountid = res.value[0].accountid;
            this.remoteUserid = res.value[0].remoteUserid;
            this.liveChat = true;
            //     this.liveChatDialog = false;
            // }
        }, err => {

        })
    }

    openWhatsapp(number) {
        sessionStorage.setItem('openWhatsapp', 'true')
        sessionStorage.setItem('setWhatsappNumber', number)

    }
    dealWithFiles(event: any) {

        this.selectedAttachment = null;
        if (event) {
            this.selectedAttachment = event.currentFiles[0];
            this.messageService.add({ severity: 'info', summary: event.currentFiles[0].name + ' selected', detail: '' });
        }
    }

    sendMessage() {
        let data = {
            campID: this.agentid,
            userType: this.userType,
            loginUserID: this.userType,
            text: this.textContent ? this.textContent : "",
            chatMaster: {
                remoteUser: this.chatUser,
                accountid: this.accountid,
                remoteUserid: this.remoteUserid
            }
        }


        if (this.selectedAttachment) {
            this.twitterService.sendDMmessages(data, this.selectedAttachment).subscribe((res) => {

                this.dmChat();
                this.textContent = ''
                this.selectedAttachment = '';
                setTimeout(() => {
                    this.dmChat();
                }, 1500)
            })
        } else {
            this.twitterService.sendDMmessages(data, '').subscribe((res) => {



                this.dmChat();
                this.textContent = ''
                setTimeout(() => {
                    this.dmChat();
                }, 1500)
            })
        }
    }



    // disposition without ticketing dashboard start
    showCustFieldRemarks: boolean = false;
    showOtherRemark: boolean = false;
    minDate: any;
    status: any;

    disposition() {
        this.submitted = true;
        if (JSON.parse(sessionStorage.getItem('contactstate')) == 0) {

            let data = {
                "campid": this.campid
            }
            this.customService.getDispostionDropdown(data).subscribe((res: any) => {
                this.resLabelData = res.value[0];
            })
            // this.resLabelData = JSON.parse(sessionStorage.getItem('notContactedRootDispositions'))
        }
        else if (JSON.parse(sessionStorage.getItem('contactstate')) == 1) {
            let data = {
                "campid": this.campid
            }
            this.customService.getDispostionDropdown(data).subscribe((res: any) => {
                this.resLabelData = res.value[1];
            })
            // this.resLabelData = JSON.parse(sessionStorage.getItem('ContactedRootDispositions'))
        }
        else {
            this.resLabelData = [];
        }
    }

    showSubdisposition1: boolean = false;
    showSubdisposition2: boolean = false;
    showSubdisposition3: boolean = false;
    showSubdisposition4: boolean = false;
    cacheSubDispositions: any = [];
    onSelectedDisposition(event) {
        this.subDispositionData = [];
        this.selectedType1 = "";
        this.dispositionID = null;
        this.disposeCall = false;
        if (this.selectedType) {
            if (sessionStorage.getItem('cacheSubDispositions')) {
                let subDispositions = JSON.parse(sessionStorage.getItem('cacheSubDispositions'))
                let sub = subDispositions.find((res: any) => res.campid == this.campid && res.rootDisposition == this.selectedType)
                if (sub) {
                    this.subDispositionData = sub.value;
                    this.disableSubDisposition = false;
                    this.showSubdisposition1 = true;
                }
                else {
                    this.getSubdispositionByAPI();
                }
            }
            else {
                this.getSubdispositionByAPI();
            }
        }
        else {
            this.disableSubDisposition = true;
            this.showSubdisposition1 = false;
            this.showSubdisposition2 = false;
            this.disableSubDisposition1 = true;
            this.disableSubDisposition2 = true;
            this.showSubdisposition3 = false;
            this.showSubdisposition4 = false;
            this.disableSubDisposition3 = true;
        }
    }


    getSubdispositionByAPI() {
        let payLoad = {
            "campid": this.campid,
            "callstatus": sessionStorage.getItem('contactstate'),
            "parentlistdisposeid": this.selectedType,
        }
        this.customService.disp = this.selectedType;
        this.customService.getdisplevels(payLoad).subscribe(
            (data) => {
                if (data.length != 0 && data.status != 'failure') {
                    this.subDispositionData = data['value'];
                    this.disableSubDisposition = false;
                    this.showSubdisposition1 = true;
                    this.cacheSubDispositions.push(
                        { campid: this.campid, rootDisposition: this.selectedType, value: this.subDispositionData })
                    sessionStorage.setItem('cacheSubDispositions', JSON.stringify(this.cacheSubDispositions))

                }
                else {
                    this.subDispositionData = [];

                    this.disableSubDisposition = true;
                    this.showSubdisposition1 = false;
                }
            });
    }


    cacheSubDispositions1: any = [];
    onSelctedSubDisposition1(event) {
        this.dispositionID = null;
        this.subDisposition1Data = [];
        this.selectedType2 = "";
        if (this.selectedType1) {
            if (sessionStorage.getItem('cacheSubDispositions1')) {
                let subDisposition1 = JSON.parse(sessionStorage.getItem('cacheSubDispositions1'))
                let sub = subDisposition1.find((res: any) => res.campid == this.campid && res.subdisposition == this.selectedType1)
                if (sub) {
                    this.subDisposition1Data = sub.value;
                    this.showSubdisposition2 = true;
                    this.disableSubDisposition1 = false;
                }
                else {
                    this.getSubSubDispositionByAPI();
                }
            }
            else {
                this.getSubSubDispositionByAPI();

            }
        }
        else {
            this.subDisposition1Data = [];
            this.showSubdisposition2 = false;
            this.disableSubDisposition1 = true;
        }
    }


    getSubSubDispositionByAPI() {
        let payLoad = {
            "campid": this.campid,
            "callstatus": sessionStorage.getItem('contactstate'),
            "parentlistdisposeid": this.selectedType1,
        }
        this.customService.disp = this.selectedType1;
        this.customService.getdisplevels(payLoad).subscribe(
            (data) => {
                if (data.length != 0 && data.status != 'failure') {
                    this.subDisposition1Data = data['value'];
                    this.showSubdisposition2 = true;
                    this.disableSubDisposition1 = false;
                    this.cacheSubDispositions1.push(
                        { campid: this.campid, subdisposition: this.selectedType1, value: this.subDisposition1Data })
                    sessionStorage.setItem('cacheSubDispositions1', JSON.stringify(this.cacheSubDispositions1))
                }
                else {
                    this.subDisposition1Data = [];

                    this.showSubdisposition2 = false;
                    this.disableSubDisposition1 = true;
                }
            });
    }

    cacheSubDispositions2: any = [];
    onSelctedSubDisposition2(event) {
        this.subDisposition2Data = [];
        this.dispositionID = null;
        this.selectedType3 = "";
        if (this.selectedType2) {
            if (sessionStorage.getItem('cacheSubDispositions2')) {
                let subDisposition1 = JSON.parse(sessionStorage.getItem('cacheSubDispositions2'))
                let sub = subDisposition1.find((res: any) => res.campid == this.campid && res.subsubdisposition == this.selectedType3)
                if (sub) {
                    this.subDisposition2Data = sub.value;
                    this.disableSubDisposition2 = false;
                    this.showSubdisposition3 = true;
                }
                else {
                    this.getSubSubSubDispositionByAPI();
                }
            }
            else {
                this.getSubSubSubDispositionByAPI();

            }
        }
        else {
            this.disableSubDisposition2 = true;
            this.showSubdisposition3 = false;
        }
    }


    getSubSubSubDispositionByAPI() {
        let payLoad = {
            "campid": this.campid,
            "callstatus": sessionStorage.getItem('contactstate'),
            "parentlistdisposeid": this.selectedType2,
        }
        this.customService.disp = this.selectedType3;
        this.customService.getdisplevels(payLoad).subscribe(
            (data) => {
                let res: any = data;
                if (data.length != 0 && data.status != 'failure') {
                    this.disableSubDisposition2 = false;
                    this.showSubdisposition3 = true;
                    this.subDisposition2Data = data['value'];
                    this.cacheSubDispositions2.push(
                        { campid: this.campid, subsubdisposition: this.selectedType3, value: this.subDisposition2Data })
                    sessionStorage.setItem('cacheSubDispositions2', JSON.stringify(this.cacheSubDispositions2))

                }
                else {
                    this.subDisposition2Data = [];
                    this.disableSubDisposition2 = true;
                    this.showSubdisposition3 = false;

                }

            });
    }

    onSelctedSubDisposition3(event) {
        this.subDisposition3Data = [];
        this.dispositionID = null;
        this.selectedType4 = "";
        if (this.selectedType3) {
            let payLoad = {
                "campid": this.campid,
                "callstatus": this.contactstate,
                "parentlistdisposeid": this.selectedType3,
            }
            this.customService.disp = this.selectedType4;
            this.customService.getdisplevels(payLoad).subscribe(
                (data) => {
                    let res: any = data;

                    if (data.length != 0 && data.status != 'failure') {
                        this.disableSubDisposition3 = false;
                        this.showSubdisposition4 = true;
                        this.subDisposition3Data = data['value'];
                        // for (let i = 0; i < res['value'].length; i++) {
                        //     this.subDisposition3Data.push(res['value'][i]);
                        // }
                    }
                    else if (res['value'].includes("No Record found")) {
                        this.disableSubDisposition3 = true;
                        this.showSubdisposition4 = false;
                    }

                });
        }
    }

    onSelctedSubDisposition4(event) {
        this.subDisposition4Data = [];
        this.dispositionID = null;
    }

    saveDispositionFormWithoutTicketing() {
        sessionStorage.removeItem('myNewArrayValueSession')
        if (this.selectedType) {
            this.dispositionID = null;
            this.dispositionID = this.selectedType;
            if (this.subDispositionData.length != 0) {
                if (this.selectedType1) {
                    this.dispositionID = this.selectedType1;
                    if (this.subDisposition1Data.length != 0) {
                        if (this.selectedType2) {
                            this.dispositionID = this.selectedType2;
                            if (this.subDisposition2Data.length != 0) {
                                if (this.selectedType3) {
                                    this.dispositionID = this.selectedType3;
                                    if (this.subDisposition3Data.length != 0) {
                                        if (this.selectedType4) {
                                            this.dispositionID = this.selectedType4;
                                            this.saveDynamicLeadCustField();
                                        }
                                    }
                                    else {
                                        this.saveDynamicLeadCustField();
                                    }
                                }
                                else {
                                    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please choose sub disposition 2 reason first' })
                                }
                            }
                            else {
                                this.saveDynamicLeadCustField();
                            }
                        }
                        else {
                            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please choose  sub disposition 1 reason first' })
                        }
                    }
                    else {
                        this.saveDynamicLeadCustField();
                    }
                }
                else {
                    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please choose Sub disposition  reason first' })
                }
            }
            else {
                this.saveDynamicLeadCustField();
            }
        }
        else {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please choose disposition reason first' })
        }
    }

    historyDialogBoxFormWithoutTicketing: boolean = false;
    callHistoryFormWithoutTicketing() {
        this.submitted = true;
        this.historyDialogBoxFormWithoutTicketing = true;
        let data = {
            "campID": this.campid,
            "callPhoneNo": this.phoneData['fld_phoneno']
        }
        this.customService.getCallHistoryData(JSON.stringify(data)).subscribe((res: any) => {
            this.callHistoryTableData = res;
        })
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
            "phoneid": this.phoneid,
            "mode": mode,
            "agentid": this.agentid,
            "fld_phoneno": sessionStorage.getItem('phnno'),
            "dispid": this.dispositionID ? this.dispositionID : this.dispoitionIdUsed,
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
            newObj.fld_fieldtext3 = this.schoolCodeValue
            newObj.fld_fieldtext4 = this.schoolNameValue
            newObj.fld_fieldtext5 = this.districtValue
            newObj.fld_fieldtext6 = this.blockNameValue
            newObj.fld_fieldtext8 = this.problemReportedValue
        } else {
            newObj = { ...payLoad, ...this.customForm.value };

        }
        this.dynamicFormService.getLeadCustField(newObj).subscribe(
            (data) => {
                this.phoneData = data;
                let phonedata = JSON.parse(this.phoneData.value)
                if (phonedata && phonedata.status == 'success') {
                    sessionStorage.setItem('redialPayload', JSON.stringify(payLoad))
                    this.customService.disposeCallApiwithoutTicket(payLoad);

                }
                else {
                    this.disposeCall = false;
                    this.messageService.add({ severity: 'info', summary: 'Warning', detail: 'call not disposed' })
                }
            }, (err: any) => {

            });
        // }
    }

    // disposition without ticketing dashboard end
    backToBlankPage() {
        this._route.navigateByUrl('iCallMate-cCP/blank2')
        //   this._route.navigate(['/iCallMate-cCP'])
        // document.getElementById("iFrame1").src = "#" + '/iCallMate-cCP' + '/blank';
        // document.getElementById
    }
    filteredCityOptions: any[] = [];
    ProblemCategoryArr: any[] = [];
    dependentVariavbles: any[] = [];
    filterBlockCodeArr: any[] = [];
    mainBlockNameArray: any[] = [];
    mainValueBotArray: any[] = [];
    mainV: any
    problemDropV: any
    dependetCheck: any
    schoolNameV: any
    districtName: any
    botNameV: any
    mainVariableValue: boolean = false
    mainProblemDropDownValue: boolean = false
    mainNewVariableCheckDepenedent: boolean = false
    mainSubParentValue: boolean = false
    mainBlockValue: boolean = false
    mainBotValueBoolean: boolean = false
    hidePropertyValueEnable: boolean = false
    firstParentValue(event, filedValue) {

        if (event.value == 'Other' || event.value == 'other' || event.value == 'OTHER') {
            this.hideDropDownEnableDIsable = true
            this.clearDependentDropdowns()
        } else {
            this.hideDropDownEnableDIsable = false
            this.mainVariableValue = true
            this.filterBlockCodeArr = [];
            this.filteredCityOptions = [];
            this.selectedSchoolCode = event.value;
            for (let item of this.formFields) {
                if (item.displayInClient == true && item.isUsed == true && item.name === 'School Name') {
                    this.mainV = item
                }
            }
            if (this.selectedSchoolCode && this.mainV) {
                this.filterSchooldName();
                if (this.filteredCityOptions.length > 0) {
                    const firstOption = this.filteredCityOptions[0];
                    this.customForm.get(this.mainV.fld_FieldName).setValue(firstOption.value);
                    this.subParentValue({ value: firstOption.value }, this.mainV);
                }
            }
        }

    }
    clearDependentDropdowns() {
        const fieldsToClear = ['School Code', 'School Name', 'District', 'Block Name'];
        fieldsToClear.forEach(field => {
            this.customForm.get(field)?.setValue('');
        });
        for (let item of this.formFields) {
            if (item.name === 'School Code') {
                let val = item
                this.customForm.get(val.fld_FieldName).setValue('');
            }
            if (item.name === 'District') {
                let val = item
                this.customForm.get(val.fld_FieldName).setValue('');
            }
            if (item.name == 'School Name') {
                let val1 = item
                this.customForm.get(val1.fld_FieldName).setValue('');
            }
            if (item.name == 'Block Name') {
                let val2 = item
                this.customForm.get(val2.fld_FieldName).setValue('');

            }
            // if(item.name == 'Bot Name'){
            //     let val3  = item
            //     this.customForm.get(val3.fld_FieldName).setValue('');
            // }
        }
    }
    filterSchooldName() {
        if (this.mainV) {
            this.filteredCityOptions = this.mainV.selectItems.filter(city => city.parentValue === this.selectedSchoolCode);
        }
        else {
            // If no state is selected, show all city options
            this.filteredCityOptions = [];
        }
    }
    subParentValue(event, dropDown) {
        this.mainSubParentValue = true
        this.filterBlockCodeArr = [];
        this.selectedSchoolName = event.value;
        for (let item of this.formFields) {
            if (item.displayInClient == true && item.isUsed == true && item.name === 'District') {
                this.schoolNameV = item
            }
        }
        if (this.selectedSchoolName && this.schoolNameV) {
            this.filterBlockCode();
            if (this.filterBlockCodeArr.length > 0) {
                const firstOption = this.filterBlockCodeArr[0];
                this.customForm.get(this.schoolNameV.fld_FieldName).setValue(firstOption.value);
                this.subDistrictDropValue({ value: firstOption.value }, this.schoolNameV);
            }
        }
    }

    filterBlockCode() {
        if (this.schoolNameV) {
            if (this.filterBlockCodeArr.length > 0) {

                this.customForm.get(this.schoolNameV.fld_FieldName).patchValue(this.filterBlockCodeArr[0].value);
            }
            else {
                this.filterBlockCodeArr = this.schoolNameV.selectItems.filter(city => city.parentValue === this.selectedSchoolName);
            }
        }
        else {
            this.filterBlockCodeArr = [];
        }
    }
    subDistrictDropValue(event, dropDown) {
        this.mainBlockValue = true
        this.mainBlockNameArray = [];
        this.subDistrictV = event.value;
        for (let item of this.formFields) {
            if (item.displayInClient == true && item.isUsed == true && item.name === 'Block Name') {
                this.districtName = item
            }
        }
        if (this.subDistrictV && this.districtName) {
            this.blockCodeUponDistrict();
            if (this.mainBlockNameArray.length > 0) {
                const firstOption = this.mainBlockNameArray[0];
                this.customForm.get(this.districtName.fld_FieldName).setValue(firstOption.value);
                this.subChildValue({ value: firstOption.value }, this.districtName);
            }
        }
    }

    blockCodeUponDistrict() {
        if (this.districtName) {
            if (this.mainBlockNameArray.length > 0) {

                this.customForm.get(this.districtName.fld_FieldName).patchValue(this.mainBlockNameArray[0].value);
            }
            else {
                this.mainBlockNameArray = this.districtName.selectItems.filter(city => city.parentValue === this.subDistrictV);
            }
        }
        else {
            this.mainBlockNameArray = [];
        }
    }
    subChildValue(event, dropDown) {
        this.mainBotValueBoolean = true
        this.mainValueBotArray = [];
        this.subBotValue = event.value;
        for (let item of this.formFields) {
            if (item.displayInClient == true && item.isUsed == true && item.name === 'Bot Name') {
                this.botNameV = item
            }
        }
        // if(this.subBotValue && this.botNameV){
        //     this.blockCodeUponbot();
        //     if (this.mainValueBotArray.length > 0) {
        //         const firstOption = this.mainValueBotArray[0];
        //         this.customForm.get(this.botNameV.fld_FieldName).setValue(firstOption.value);
        //         this.subChildValueBot({ value: firstOption.value }, this.botNameV);
        //     }
        // }

    }
    blockCodeUponbot() {
        if (this.botNameV) {
            if (this.mainValueBotArray.length > 0) {

                this.customForm.get(this.botNameV.fld_FieldName).patchValue(this.mainValueBotArray[0].value);
            }
            else {
                this.mainValueBotArray = this.botNameV.selectItems.filter(city => city.parentValue === this.subBotValue);
            }
        }
        else {
            this.mainValueBotArray = [];
        }
    }
    subChildValueBot(event, dropDown) {

    }

    returnDropDownFirst() {
        this.hideDropDownEnableDIsable = false
    }
    returnDropDownSecond() {
        this.hidePropertyValueEnable = false

    }
    problemReportedValue: any
    gettingValueNew: any
    getingBotNameValue(event, filedName) {

        if (filedName.fld_FieldName == 'fld_fieldtext7' && filedName.name == 'Bot Name') {
            this.myStudentFiledTrueFalse = false
            this.teacherFiledTrueFalse = false
            this.gettingValueNew = event.value
            if (this.gettingValueNew === 'Meri Upashthiti') {
                // this.getValueParakhBot = []
                // this.returnMatchedParentValue(field);
                this.getMeriUpasthithi()
            } else {
                this.getParakBot()
            }
        }
    }

    getParakBot() {
        this.getValueParakhBot = [
            { value: "Asking to send bot link" },
            { value: "How to Add new Student" },
            { value: "A message appear \"Message not sent Tap to try again\"" },
            { value: "Change medium of instruction" },
            { value: "Change class individual (Incorrect Class entered)" },
            { value: "Change class after academic year change" },
            { value: "Invalid UDISE Code" },
            { value: "How to Remove Student" },
            { value: "Not able to operate or how to start Quiz" },
            { value: "How to use QR CODE SCANNER in the chat Section" },
            { value: "Incomplete details or call disconnected after pickup" },
            { value: "Not Receiving OTP" },
            { value: "User Asking for UDISE code" },
            { value: "Platform says \"No connection\"" },
            { value: "A message appear Some error occurred pls try again later" },
            { value: "Wrong answer is marked correct how to correct it" },
            { value: "Student are not getting promoting to higher class" }
        ];

    }
    getMeriUpasthithi() {
        this.getValueParakhBot = [
            { value: "Invalid UDISE Code" },
            { value: "Invalid Teacher Code" },
            { value: "Asking to send bot link" },
            { value: "Not able to operate or how to start" },
            { value: "Change Designation" },
            { value: "School has been changed how to Register in new School" },
            { value: "How to change the class selection in same school" },
            { value: "Mid Day Meal option is not available" },
            { value: "User Asking for UDISE/Teacher Code" },
            { value: "Screen Blank" },
            { value: "Platform Says \"No Connection\"" },
            { value: "A message appear some error occurred pls try again later" },
            { value: "School name is showing Wrong" },
            { value: "Student name is missing" },
            { value: "Student class not updated after academic year change" },
            { value: "Student showing in Wrong Section" },
            { value: "Teacher want to Change attendance after submission" },
            { value: "Teacher want to Change Status of Mid Day Meal" },
            { value: "Teacher want to mark previous days attendance" },
            { value: "How to Download Attendance Report" },
            { value: "Teacher want to mark attendance after working hour" },
            { value: "Incomplete details or call disconnected after pickup" },
            { value: "How to use QR CODE SCANNER in the chat section" }
        ];

    }

    myStudentFiledTrueFalse: boolean = false
    teacherFiledTrueFalse: boolean = false
    //   problem reported value 
    firstProblemDropDownValue(event, dropDown) {

        if (event.value == 'Change class after academic year change' || event.value == 'Student are not getting promoting to higher class' || event.value == 'Student name is missing' || event.value == 'Student class not updated after acedamic year change' || event.value == 'Student showing in Wrong Section') {
            this.myStudentFiledTrueFalse = true
            this.teacherFiledTrueFalse = false
        } else if (event.value == 'Invalid Teacher Code' || event.value == 'Change Designation') {
            this.myStudentFiledTrueFalse = false
            this.teacherFiledTrueFalse = true
        } else {
            this.myStudentFiledTrueFalse = false
            this.teacherFiledTrueFalse = false
        }
        // this.getAcademicValue 
        if (event.value == 'Other' || event.value == 'other' || event.value == 'OTHER') {
            this.hidePropertyValueEnable = true
            this.clearPropertyDropDown()
        } else {
            this.hidePropertyValueEnable = false
            this.mainProblemDropDownValue = true
            this.dependentVariavbles = [];
            this.ProblemCategoryArr = [];
            this.slectedProblemV = event.value;
            for (let item of this.formFields) {
                if (item.displayInClient == true && item.isUsed == true && item.name === 'Problem Category') {
                    this.problemDropV = item
                }
            }
            if (this.slectedProblemV && this.problemDropV) {
                this.firstProblemReported();
                if (this.ProblemCategoryArr.length > 0) {
                    const firstOption = this.ProblemCategoryArr[0];
                    this.customForm.get(this.problemDropV.fld_FieldName).setValue(firstOption.value);
                    this.ProblemCategoryVFun({ value: firstOption.value }, this.problemDropV);
                }
            }
        }
    }
    firstProblemReported() {
        if (this.problemDropV) {
            this.ProblemCategoryArr = this.problemDropV.selectItems.filter(city => city.parentValue === this.slectedProblemV);
        }
        else {
            // If no state is selected, show all city options
            this.ProblemCategoryArr = [];
        }
    }

    ProblemCategoryVFun(event, dropDown) {

        if (event.value == 'Other' || event.value == 'other' || event.value == 'OTHER') {
            // this.hideDropDownEnableDIsable = true
            // this.clearDependentDropdowns()
        } else {
            // this.hideDropDownEnableDIsable = false
            this.mainNewVariableCheckDepenedent = true
            this.dependentVariavbles = [];
            this.checkDependentV = event.value;
            for (let item of this.formFields) {
                if (item.displayInClient == true && item.isUsed == true && item.name === 'Dependent upon (State/CG)') {
                    this.dependetCheck = item
                }
            }
            if (this.checkDependentV && this.dependetCheck) {
                this.firstProblemDependentOn();
                if (this.dependentVariavbles.length > 0) {
                    const firstOption = this.dependentVariavbles[0];
                    this.customForm.get(this.dependetCheck.fld_FieldName).setValue(firstOption.value);
                    this.DependentuponFunc({ value: firstOption.value }, this.dependetCheck);
                }
            }
        }
    }
    firstProblemDependentOn() {
        if (this.dependetCheck) {
            this.dependentVariavbles = this.dependetCheck.selectItems.filter(city => city.parentValue === this.checkDependentV);
        }
        else {
            // If no state is selected, show all city options
            this.dependentVariavbles = [];
        }
    }

    DependentuponFunc(event, dropDown) {

    }

    clearPropertyDropDown() {
        const fieldsToClear = ['Problem Reported', 'Problem Category', 'Dependent upon (State/CG)'];
        fieldsToClear.forEach(field => {
            this.customForm.get(field)?.setValue('');
        });
        for (let item of this.formFields) {
            if (item.name === 'Problem Reported') {
                let val = item
                this.customForm.get(val.fld_FieldName).setValue('');
            }
            if (item.name == 'Problem Category') {
                let val1 = item
                this.customForm.get(val1.fld_FieldName).setValue('');
            }
            if (item.name == 'Dependent upon (State/CG)') {
                let val2 = item
                this.customForm.get(val2.fld_FieldName).setValue('');

            }
            // if(item.name == 'Bot Name'){
            //     let val3  = item
            //     this.customForm.get(val3.fld_FieldName).setValue('');
            // }
        }
    }

    /**
     * @email connection
     */
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

            this.dynamicFormService.getSignature(JSON.stringify(data)).subscribe((res: any) => {
                this.signature_smtpData = res.value;

                let signature = JSON.parse(this.signature_smtpData)


                this.accountDropdown = signature;
                this.newMail.from = this.accountDropdown[0].value;
                this.ref.detectChanges();

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

        this.dynamicFormService.getTemplateData(JSON.stringify(data)).subscribe((res: any) => {
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
        this.dynamicFormService.onFileUpload(file.files, campid).subscribe((res: any) => {
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
        this.dynamicFormService.getsmtpId(this.campid).subscribe(details => {
            this.dynamicFormService.getemailList(this.campid, details.fld_SMTP_ID).subscribe((res: any) => {
                let selectedMailsTo = this.extractEmails(res.data);
                this.selectedMailsTo = selectedMailsTo.map(email => {
                    return { 'name': email };
                });
            })
        })

    }
    isauto: boolean = true;
    sendMail() {
        this.dynamicFormService.getsmtpId(this.campid).subscribe(details => {
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


                this.dynamicFormService.saveComposeEmail(JSON.stringify(composeData)).subscribe((res: any) => {

                    this.messageService.add({ severity: 'info', summary: res.status, detail: res.value });
                    // this.router.navigate(['/iCallMate-cCP/email/inbox'])
                    this.dynamicFormService.emailUpdateSend();
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
    getMessageDetailsNew(getValue) {
        this.selectedItems = []
        setTimeout(() => {
            if (this.emailPopUpTrueFalse) {
                let oneValue = getValue
                if (oneValue.includes('.com') || oneValue.includes('.net') || oneValue.includes('.in') || oneValue.includes('.org') || oneValue.includes('.co.uk') || oneValue.includes('.hotmail') || oneValue.includes('.co.jp')) {
                    const newValuseSEnd = oneValue.toLowerCase()
                    this.addText(newValuseSEnd)
                }
            }
        }, 1000);
    }

    formatPhoneNumber(phoneNumber: any): any {
        const visibleDigits = 7;  // Number of visible digits at the start
        const visiblePart = phoneNumber.substring(0, visibleDigits);
        const hiddenPart = '*'.repeat(phoneNumber.length - visibleDigits);
        return visiblePart + hiddenPart;
    }
    emaildialogTrue() {
        // sessionStorage.setItem('openN','open')
        // this.sharedService.socialMediaDetected('email');
        this.emailPopUpTrueFalse = true
        let oneValue = 'somya.tyagi@novusconnect.in'
        if (oneValue.includes('.com') || oneValue.includes('.net') || oneValue.includes('.in') || oneValue.includes('.org') || oneValue.includes('.co.uk') || oneValue.includes('.hotmail') || oneValue.includes('.co.jp')) {
            const newValuseSEnd = oneValue.toLowerCase()
            this.addText(newValuseSEnd)
        }
    }
    // hello:any
    hello1: number = 100
    gettingValue: any
    getItemDetails() {
        // let data = {
        //     campId : this.campid,
        //     sclCode: 5130,
        let searchvalue = this.gettingValue ? 50 : this.hello1
        // loadCustField?campId=24&sclCode=12&sclName=1&districtName=1&blockName=1&count=5'

        // }
        let schlCode = this.gettingValue ? this.gettingValue : ''
        this.dynamicFormService.getCustomFieldDetails(this.campid, schlCode, searchvalue).subscribe((res) => {
            this.selctedSchoolCode = res.data
        })
    }
    checkValueAfterClick(value) {
        const originalEvent = value.originalEvent;

        // Checking if the event type is 'click'
        this.mainValueGet = value.value
        if (originalEvent && originalEvent.type === 'click') {
            this.schoolCodeValue = this.mainValueGet.sclCode
            this.schoolNameValue = this.mainValueGet.sclName
            this.districtValue = this.mainValueGet.districtName
            this.blockNameValue = this.mainValueGet.blockName
        } else {
            this.schoolCodeValue = this.mainValueGet
            this.schoolNameValue = ''
            this.districtValue = ''
            this.blockNameValue = ''

        }


    }
    resetFunction() {
        // options.reset();
        this.filterValue = '';
    }

    customFilterFunction(event: any) {
        this.gettingValue = event.filter
        if (this.gettingValue) {
            this.getItemDetails()
        } else {
            this.getItemDetails()
        }
    }
    ocClearData(event) {

        // this.getItemDetails()

    }
    newFunctionCh(val) {
        let myValData = val
        let newData = this.myValueLatest
        const matchedValue = this.getMatchedValue(myValData, newData);
        if (matchedValue) {
            this.emailPopUpTrueFalse = true
            let oneValue = matchedValue
            if (oneValue.includes('.com') || oneValue.includes('.net') || oneValue.includes('.in') || oneValue.includes('.org') || oneValue.includes('.co.uk') || oneValue.includes('.hotmail') || oneValue.includes('.co.jp')) {
                const newValuseSEnd = oneValue.toLowerCase()
                this.addText(newValuseSEnd)
            }
        }
        this.getSignature();
        this.listOfTo();
    }
    getMatchedValue(val: any, newData: any): any {
        // Extract fld_FieldName from val
        const fieldName = val.fld_FieldName;

        // Check if the field name exists in newData
        if (newData.hasOwnProperty(fieldName)) {
            return newData[fieldName];
        } else {
            return null; // Return null or any default value if not found
        }
    }

    myNewArray: any[] = []; // Ensure this is also initialized correctly
    // myNewArrayValue1:any=[]
    getDataNewOnew() {
        this.myNewArray = [this.myNewArrayValue]
        // Ensure that myNewArrayValue is an array before assigning
        if (Array.isArray(this.myNewArray)) {
            this.myNewArrayValue1 = [...this.myNewArray];
        } else {
            return;
        }

        const documentStyle = getComputedStyle(document.documentElement);

        this.dataN = {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [
                {
                    label: 'Voice Recognition',
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--pink-500'),
                    data: this.myNewArrayValue1,
                    barThickness: 7,
                    tension: 0.4
                }
            ]
        };

        this.intializedFun();
    }

    intializedFun() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-primary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 1.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 20,
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        // this.options = {
        //     indexAxis: 'y',
        //     maintainAspectRatio: false,
        //     aspectRatio: 1.4,
        //     plugins: {
        //         legend: {
        //             labels: {
        //                 color: textColor
        //             }
        //         }
        //     },
        //     scales: {
        //         x: {
        //             ticks: {
        //                 color: textColorSecondary,
        //                 font: {
        //                     weight: 500
        //                 }
        //             },
        //             grid: {
        //                 color: surfaceBorder,
        //                 drawBorder: false
        //             }
        //         },
        //         y: {
        //             ticks: {
        //                 color: textColorSecondary
        //             },
        //             grid: {
        //                 color: surfaceBorder,
        //                 drawBorder: false
        //             }
        //         }
        //     }
        // };
        if (sessionStorage.getItem('myNewArrayValueSession') && sessionStorage.getItem('extn_set') != 'ACW') {
            //   this.oneFunctioNRepeat();
            this.returnFunction()
        }
    }

    truncateToDecimalPlaces(value: number, decimalPlaces: number): number {
        const factor = Math.pow(10, decimalPlaces);
        return Math.floor(value * factor) / factor;
    }


    // oneFunctioNRepeat() {
    //     setInterval(() => {
    //         // Check if sessionStorage item 'extn_set' is 'ACW'
    //         if (sessionStorage.getItem('extn_set') == 'ACW') {
    //             return;
    //         }

    //         // Ensure myNewArrayValue1 is an array
    //         if (!Array.isArray(this.myNewArrayValue1)) {
    //             this.myNewArrayValue1 = [];
    //         }

    //         let dataSession = sessionStorage.getItem('myNewArrayValueSession');
    //         if (dataSession) {
    //             // Parse the session data as a number
    //             let dataSessionNumber = Number(dataSession);
    //             if (isNaN(dataSessionNumber)) {
    //                 return;
    //             } else {
    //                 // Remove all values after the decimal
    //                 let roundedValue = Math.trunc(dataSessionNumber);

    //                 if (this.myNewArrayValue1.length < 5) {
    //                     // If there are fewer than 5 values, just push the new value
    //                     this.myNewArrayValue1.push(roundedValue);
    //                 } else {
    //                     if (roundedValue === 0) {
    //                         // Replace the oldest value with 0 if the new value is 0
    //                         this.myNewArrayValue1.shift(); // Remove the oldest value
    //                         this.myNewArrayValue1.push(0); // Add 0
    //                     } else {
    //                         // Replace the oldest value with the new value
    //                         this.myNewArrayValue1.shift(); // Remove the oldest value
    //                         this.myNewArrayValue1.push(roundedValue); // Add the new value
    //                     }
    //                 }

    //                 // Copy the values into dataNE2
    //                 let dataNE2 = [...this.myNewArrayValue1];

    //                 const documentStyle = getComputedStyle(document.documentElement);
    //                 this.dataN = {
    //                     labels: ['1', '2', '3', '4', '5'],
    //                     datasets: [
    //                         {
    //                             label: 'Voice Recognition',
    //                             backgroundColor: [
    //                                 documentStyle.getPropertyValue('--blue-500'),
    //                                 documentStyle.getPropertyValue('--yellow-500'),
    //                                 documentStyle.getPropertyValue('--green-500')
    //                             ],
    //                             borderColor: documentStyle.getPropertyValue('--pink-500'),
    //                             data: dataNE2,
    //                             barThickness: 7,
    //                             tension: 0.4
    //                         }
    //                     ]
    //                 };
    //             }
    //         }
    //     }, 500);
    // }
    returnFunction() {
        setInterval(() => {
            let newdata = sessionStorage.getItem('myNewArrayValueSession')
            this.customService.updateData(newdata)

        }, 4000);
    }

    oneFunctioNRepeat(updatedData) {
        // setInterval(() => {
        // Check if sessionStorage item 'extn_set' is 'ACW'
        if (sessionStorage.getItem('extn_set') == 'ACW') {
            return;
        }

        // Ensure myNewArrayValue1 is an array
        if (!Array.isArray(this.myNewArrayValue1)) {
            this.myNewArrayValue1 = [];
        }

        let dataSession = updatedData;
        if (dataSession) {
            if (dataSession == '0.0' || dataSession == 0.0) {
                return
            } else {
                // Parse the session data as a number
                let dataSessionNumber = Number(dataSession);
                if (isNaN(dataSessionNumber)) {
                    return;
                } else {
                    // Remove all values after the decimal
                    let roundedValue = Math.trunc(dataSessionNumber);

                    if (this.myNewArrayValue1.length < 5) {
                        // If the array has fewer than 5 values, just push the new value
                        this.myNewArrayValue1.push(roundedValue);
                    } else {
                        // Only replace the oldest value with 0 if the new value is 0
                        if (roundedValue === 0) {
                            // Replace the oldest value with 0 if it's the latest value
                            this.myNewArrayValue1.shift(); // Remove the oldest value
                            this.myNewArrayValue1.push(0); // Add 0
                        } else {
                            // Replace the oldest value with the new value
                            this.myNewArrayValue1.shift(); // Remove the oldest value
                            this.myNewArrayValue1.push(roundedValue); // Add the new value
                        }
                    }

                    // Copy the values into dataNE2
                    let dataNE2 = [...this.myNewArrayValue1];

                    const documentStyle = getComputedStyle(document.documentElement);
                    this.dataN = {
                        labels: ['1', '2', '3', '4', '5'],
                        datasets: [
                            {
                                label: 'Voice Recognition',
                                backgroundColor: [
                                    documentStyle.getPropertyValue('--blue-500'),
                                    documentStyle.getPropertyValue('--yellow-500'),
                                    documentStyle.getPropertyValue('--green-500')
                                ],
                                borderColor: documentStyle.getPropertyValue('--pink-500'),
                                data: dataNE2,
                                barThickness: 7,
                                tension: 0.4
                            }
                        ]
                    };
                }
            }
        }
        // }, 500);
    }
    ngOnDestroy() {
        // Clean up subscription to avoid memory leaks
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    smsNumber:any
    sendInviteApi(event: Event) {
        this.smsNumber =sessionStorage.getItem('phnno')
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
        this.dynamicFormService.sendSMSAPI(body).subscribe((res: any) => {
          if (res.status == "failure") {
            this.messageService.add({ severity: 'warn', summary: res.status, detail: res.value });
          } else {
            this.messageService.add({ severity: 'success', summary: res.status, detail: res.value });
          }
        })
      }
      sendWebChatInvite(){
        let number =sessionStorage.getItem('phnno')
        let sendData = String(number)
        this.dynamicFormService.sendWebChatInvite(sendData).subscribe((res)=>{
            console.log(res);
            
        })
      }
}