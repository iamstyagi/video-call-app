import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Mail } from 'src/app/model/mail';
import { MailService } from '../service/mail.service';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormField } from 'src/app/form-field';
import { environment } from 'src/environments/environment';
interface assigendItem {
    name: string,
}

interface markItem {
    name: string,
}

@Component({
    templateUrl: './mail-compose.component.html',
    styleUrls: ['./mail-compose.component.scss']
})
export class MailComposeComponent implements OnInit {
    customForm: FormGroup;
    phoneDataa: any;
    liveDM: boolean = false;
    newPhoneIdSet: any
    selectedSchoolCode: any;
    slectedProblemV: any;
    checkDependentV: any;
    selectedSchoolName: any;
    emailStringData: any
    arrObj: number[] = new Array(1);
    historyDialogBox: boolean;
    ticketTypeHistory: any = [];
    selectedAssignedTo: any;
    ticketSaved: boolean = false;
    disposeCall: boolean = true;
    phoneid = sessionStorage.getItem("phoneID");
    AssignedBy: assigendItem[];
    showDisposeButton: boolean;
    valueSaveTrue: boolean = false
    formFields: any[];
    selectedDisposeCall: any;
    selectedType;
    selectedType1;
    selectedType2;
    selectedType3;
    selectedType4;
    solutionValue;
    feedbackValue;
    remarksValue;
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
    phoneData: any;
    minDate: any;

    ticketForm: FormGroup;
    subDistrictV: any;
    subBotValue: any;
    callID: any;
    date: Date = new Date();
    dispositionID;
    getDynamicFormFieldsCache: any;
    newVariableFalseTrueCheck: boolean = environment.newVariableFalseTrueCheck

    ticketID: any;
    selectedAssignedBy: any;
    agentRemarks: any;
    disabledTicketFields: boolean = true;
    ticketNo: any; sourceName: any; ticketCampaignName: any; actionNo: any; ticketTime: any; ticketDuration: any;
    ticketFields: any = [];
    showDynaTicketCard: boolean = false;
    showUpdateButton: boolean = false;
    showSaveButton: boolean = false;
    ticketEnable: boolean = false;
    showTicketCard: boolean = false;
    newTicketFlag: boolean = false;
    inputCheck: boolean = false;
    emailStringDataCC: any;
    emailStringDataBCC: any;
    loginData: any;
    agentid: any;
    userDetails: any;
    campid: any;
    FromID: any;
    smtpid: any;
    userType: any;
    selectedCallBack: boolean;
    MarkAs: markItem[];
    selectedMarkAs: markItem;
    templateArr: any = []
    selectTemp: any;
    fld_BCC: any;
    fld_CC: any;
    selectedMailsTo: any;
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
    // schoolname
    schoolCodeValue: any
    schoolNameValue: any
    districtValue: any
    blockNameValue: any
    selctedSchoolCode: any[] = []
    mainValueGet: any
    filterValue: any
    getValueParakhBot: any[] = []

    @ViewChild('chips') chips: ElementRef;
    constructor(private messageService: MessageService,
        private location: Location,
        private router: Router,
        private mailService: MailService,
        private datePipe: DatePipe,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef) {
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
    }


    async ngOnInit() {
        await this.loginResData();
        this.getSignature();
        this.getDynamicFormFields();

        this.cols = [
            { field: 'code', header: 'Channel No' },
            { field: 'name', header: 'Phone No' },
            { field: 'category', header: 'State' },
            { field: 'quantity', header: 'Hold' },
            { field: 'quantity', header: 'HangUp' }
        ];
        if (!this.newVariableFalseTrueCheck) {
            this.getItemDetails()
        }

    }

    async loginResData() {
        if (localStorage.getItem("loginData")) {
            this.loginData = JSON.parse(localStorage.getItem("loginData"));
            for (let i = 0; i < this.loginData['value'].length; i++) {
                this.campid = this.loginData['value'][i]['campid'];
                this.userType = this.loginData['value'][i]['userType'];
                this.ticketEnable = this.loginData['value'][i]['ticketEnable'] != null ? this.loginData['value'][i]['ticketEnable'] : true;


            }

            this.agentid = sessionStorage.getItem('agentid');
            // this.getUserDetails();
            this.listOfTo();
        }
    }

    signature_smtpData: any = [];
    signature: any;
    accountDropdown: any[] = [];
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
                // setTimeout(() => {
                //     this.selectVal = null; // Reset the value after a delay
                // }, 100);
                this.signature = signature[0].signature;
            })
        }
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

                if (!this.emailStringData || this.emailStringData == '') {
                    return this.messageService.add({ severity: 'info', summary: 'info', detail: 'We need to know who to send this to. Make sure you enter at least one email' });
                } if (!this.newMail.title || this.newMail.title == '') {
                    if (confirm("Do you want to send this email without a subject?") == true) {

                    }
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

                    this.getDynamicFormFields();
                }, err => {

                })
                this.newTicketFlag = false
            }
            else {
                this.messageService.add({ severity: 'info', summary: details.status, detail: details.message });
            }
        });
    }


    draftMail() {
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
                    // fld_To: this.newMail.to,
                    userType: this.userType,
                    listAttachFilesPath: this.successfulFileUploadResponse.listAttachFilesPath !== undefined ? this.successfulFileUploadResponse.listAttachFilesPath : '',
                    listAttachFiles: this.successfulFileUploadResponse.listAttachFiles !== undefined ? this.successfulFileUploadResponse.listAttachFiles : '',
                    fld_CC: this.emailStringDataCC,
                    // fld_CC: this.fld_CC,
                    fld_BCC: this.emailStringDataBCC,
                    // fld_BCC: this.fld_BCC,
                    isdraft: true
                }


                this.mailService.saveComposeEmail(JSON.stringify(composeData)).subscribe((res: any) => {

                    this.messageService.add({ severity: 'info', summary: res.status, detail: res.value });
                    // this.router.navigate(['/iCallMate-cCP/email/inbox'])
                    this.mailService.emailUpdateSend();
                    this.newMail.title = '';
                    this.newMail.message = '';
                    this.emailStringData = '';
                    // this.newMail.to = '';
                    this.uploadedFiles = [];
                    this.signature = '';
                    this.emailStringDataBCC = '';
                    // this.fld_BCC = '';
                    this.emailStringDataCC = '';
                    // this.fld_CC = '';
                }, err => {

                })
            }
            else {
                this.messageService.add({ severity: 'info', summary: details.status, detail: details.message });
            }
        });
    }

    goBack() {
        this.location.back();
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
    onTextChange(val) {
        let data = val.textValue
        if (data == '' && this.selectTemp) {
                this.selectTemp = null
                this.selectTemp = ''
        }
    }

    chanegAc(value) {


        this.getSignature();
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

    // extractEmails(data: any[]): string[] {
    //     return data.map(item => {
    //         let email = item.EMAILNAME;
    //         const match = email.match(/<([^>]+)>/);
    //         if (match) {
    //             return match[1]; // Return the email inside the <>
    //         } else {
    //             return email; // Return the email as it is
    //         }
    //     });
    // }

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
    resultArray: string[] = [];
    addText(emailV) {
        // if (this.newMail.to.trim()) {
        //   this.selectedItems.push(this.newMail.to);
        //   this.generateResult()
        //   this.newMail.to = '';
        // }
        const email = emailV.trim();
        if (email) {
            if (email.includes('@')) {
                this.selectedItems.push(email);
                this.generateResult();
                this.newMail.to = '';
                this.filteredMails = [];
            } else {
                // Handle the case where there is no '@' in the email
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

    newTicket() {
        this.newTicketFlag = true;
        this.showDisposeButton = true;
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


        const res = await this.mailService.getTicketInfo(JSON.stringify(ticketData)).toPromise();
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
    callHistory() {
        this.historyDialogBox = true;
        this.mailService.getTicketHistoryData(this.campid, this.ticketNo).subscribe((res: any) => {
            this.ticketTypeHistory = Object.values(res.value);
        });
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
            this.ticketRecords.source_Type = 1;
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
            source_ID: this.emailStringData,
            // source_ID: this.accountDropdown[0].label,
            fld_Source_Value: this.ticketRecords.fld_Source_Value,
            // call_Time: this.ticketRecords.call_Time,
            ticket_closureID: this.ticketRecords.ticket_closureID,
            loginUserID: this.agentid,
            userType: 3,
            campID: this.campid,
            ticketID: this.ticketNo,
            sourceName: "Email",
            campName: this.ticketCampaignName,
            action_No: this.actionNo,
            ticket_Time: this.ticketTime,
            ticketTime: this.ticketDuration,
            assignedByID: this.selectedAssignedBy,
            ticket_statusID: this.selectedticketStatus,
            remarks: this.agentRemarks,
            ticket_TypeID: this.ticketTypeIDdd,
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
        //   newObj.fld_fieldtext3 = this.schoolCodeValue
        //   newObj.fld_fieldtext4 = this.schoolNameValue
        //   newObj.fld_fieldtext5 = this.districtValue
        //   newObj.fld_fieldtext6 = this.blockNameValue
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
    onShowDispositionButton() {
        if (sessionStorage.getItem('extn_set') == 'Idle') {
            this.showDisposeButton = false;
        }
        else {
            this.showDisposeButton = true;
        }
    }
    getDynamicFormFields() {
        // if (sessionStorage.getItem("getDynamicFormFieldsCache") && JSON.parse(sessionStorage.getItem("getDynamicFormFieldsCache")).campid == this.campid) {
        //     this.formFields = JSON.parse(sessionStorage.getItem("getDynamicFormFieldsCache")).data;
        //     
        //     const formGroupControls = {};
        //     this.getDynamicLeadCustField();
        //     for (const field of this.formFields) {
        //         formGroupControls[field.fld_FieldName] = [field.value || ''];
        //     }
        //     this.customForm = this.fb.group(formGroupControls);

        // } else {
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
                // this.getDynamicLeadCustField();
                for (const field of this.formFields) {
                    formGroupControls[field.fld_FieldName] = [field.value || ''];

                    // value = this.formatPhoneNumber(value);

                }
                this.customForm = this.fb.group(formGroupControls);
            });
        // }


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
        }
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
    hideDropDownEnableDIsable: boolean = false

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
    formatPhoneNumber(phoneNumber: any): any {
        const visibleDigits = 3;
        const visiblePart = phoneNumber.substring(phoneNumber.length - visibleDigits);
        const hiddenPart = '*'.repeat(phoneNumber.length - visibleDigits);
        return hiddenPart + visiblePart;
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
    saveDispositionForm() {
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

            let payLoad = {
                "campid": this.campid,
                "mode": mode,
                "phoneid": this.phoneid != '0' ? this.phoneid : this.newPhoneIdSet,
                "agentid": this.agentid,
                "fld_phoneno": this.phoneData.fld_phoneno ? this.phoneData.fld_phoneno : sessionStorage.getItem('phnno'),
                "dispid": '4181',
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
                // this.customService.disposeCallApi(this.selectedAssignedTo, this.selectedCallBack, payLoad);




                // let dispose = sessionStorage.getItem('dispose');
                // if(dispose == 'yes'){
                // blank();

                //     sessionStorage.removeItem('dispose')
                // }

                // blank();
                // .subscribe(
                //     (data) => {
                //         if (data.status === "success") {
                //             this.messageService.add({ severity: 'success', summary: 'success', detail: 'Call dispose successfully' });
                //             // commented by rajat
                //             // this._route.navigateByUrl('/iCallMate-cCP');
                this.ticketSaved = false;
                //         }
                //         else if (data.status == "failure") {
                //             this.messageService.add({ severity: 'info', summary: 'Warning', detail: 'status failure' })
                //         }
                //     },
                //     (error) => {

                //     });
            }
            else {
                // uncomment this below to avoid stuck in call dispose
                // let payLoad = {
                //     "campid": this.campid,
                //     "mode": 2,
                //     "phoneid": this.phoneid,
                //     "agentid": this.agentid,
                //     "fld_phoneno": sessionStorage.getItem('phnno'),
                //     "dispid": this.dispositionID,
                //     "cb": this.selectedCallBack,
                //     "cbtime": formattedDate,
                //     "cbassignedto": this.selectedAssignedTo,
                //     "ticketTypeId": this.selectedTicketType
                // }
                // let phonedata = JSON.parse(this.phoneData.value)

                // sessionStorage.setItem('callID', '0');
                // this.customService.disposeCallApi(this.selectedAssignedTo, this.selectedCallBack, payLoad).subscribe(
                //     (data) => {
                //         if (data.status === "success") {
                //             this.messageService.add({ severity: 'success', summary: 'success', detail: 'Call dispose successfully' });
                //             this.ticketSaved = false;
                //         }
                //         else if (data.status == "failure") {
                //             this.messageService.add({ severity: 'info', summary: 'Warning', detail: 'status failure' })
                //         }
                //     },
                //     (error) => {
                //     });

                // uncomment this above to avoid stuck in call dispose
                this.messageService.add({ severity: 'info', summary: 'Warning', detail: 'call not disposed' })
            }
        }

        else {
            this.messageService.add({ severity: 'info', summary: 'Warning', detail: 'Firstly Save or Update your Ticket' })
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
        // const newObj = { ...payLoad, ...this.customForm.value };
        // newObj.fld_fieldtext3 = this.schoolCodeValue
        // newObj.fld_fieldtext4 = this.schoolNameValue
        // newObj.fld_fieldtext5 = this.districtValue
        // newObj.fld_fieldtext6 = this.blockNameValue
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
                    // else{
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
    gettingValue: any
    hello1: number = 100

    getItemDetails() {
        // let data = {
        //     campId : this.campid,
        //     sclCode: 5130,
        let searchvalue = this.gettingValue ? 50 : this.hello1

        // loadCustField?campId=24&sclCode=12&sclName=1&districtName=1&blockName=1&count=5'

        // }
        let schlCode = this.gettingValue ? this.gettingValue : ''
        this.mailService.getCustomFieldDetails(this.campid, schlCode, searchvalue).subscribe((res) => {
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
}
