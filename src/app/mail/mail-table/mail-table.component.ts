import { Component, OnInit, Input, SecurityContext, NgModule } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Mail } from 'src/app/model/mail';
import { MailService } from '../service/mail.service';
import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';

import * as FileSaver from 'file-saver';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormField } from 'src/app/form-field';

@Component({
    selector: 'app-mail-table',
    templateUrl: './mail-table.component.html',
    styleUrls: ['./mail-table.component.scss'],
})
export class MailTableComponent implements OnInit {
    fld_To: any;
    getDynamicFormFieldsCache: any;

    customForm: FormGroup;
    successfulFileUploadResponse: any = [];
    demo: File[];
    baseUrl = environment.apiUrl;
    url: any;
    attachmentList: any;
    @Input() mails!: Mail[];
    menuItems: MenuItem[] = [];
    selectedMails: Mail[] = [];
    mail: Mail = {};
    formFields: any[];
    newVariableFalseTrueCheck:boolean = environment.newVariableFalseTrueCheck
    phoneData: any;

    dialogVisible: boolean = false;
    selectedRow: any;
    agentid: any;
    campid: any;
    userType: any;
    loginData: any;
    userDetails: any;
    rowDetails: any;
    showFileUpload: boolean = false;
    phoneDataa: any;
    phoneid:any
    // for commond dialog
    emailDialog: boolean = false;
    account: any[] = [];
    selectedAccount: any;
    template: any = [];
    selectedTemplate: any;
    from: any;
    subject: any;
    uploadedFiles: any[] = [];
    textEditor: any;
    ticketType: any;
    status: any;
    assignedBy: any;
    updatedBy: any;
    agentRemarks: any;
    ticket: any[] = [];
    ticketTypeArr: any[] = [];
    statusArr: any[] = [];
    assignedArr: any[] = [];
    updatedByArr: any[] = [];
    files: any[] = [
        {
            label: 'Attachments(0)',
            data: {},
            children: []
        }
    ];
    updatedValue: any = "Update";
    updatedValue1: any = "Update";
    updatedValue2: any = "Update";
    ticketID: any;
    phoneID: any;
    sourceName: any;
    campName: any;
    action_No: any;
    ticketTime: any;
    ticket_Time: any;
    ticket_statusID: any;
    remarks: any;
    ticket_TypeID: any;
    start_Time: any;
    source_ID: any;

    // for reply dialog
    replyDialog: boolean = false;
    account1: any[] = [];
    selectedAccount1: any;
    template1: any[] = [];
    selectedTemplate1: any;
    from1: any;
    subject1: any;
    uploadedFiles1: any[] = [];
    textEditor1: any;
    textEditor13: any;
    ticketType1: any;
    status1: any;
    assignedBy1: any;
    updatedBy1: any;
    agentRemarks1: any;
    ticket1: any[] = [];
    ticketTypeArr1: any[] = [];
    statusArr1: any[] = [];
    assignedArr1: any[] = [];
    updatedByArr1: any[] = [];
    files1: any[] = [
        {
            label: 'Attachments(0)',
            data: {},
            children: []
        }
    ];
    myvalueSEt:any = 10
    mySerachApi:boolean=true;

    // for forward dialog
    forwardDialog: boolean = false;
    account2: any[] = [];
    selectedAccount2: any;
    template2: any[] = [];
    selectedTemplate2: any;
    from2: any;
    to2: any;
    subject2: any;
    uploadedFiles2: any[] = [];
    textEditor2: any;
    textEditor23: any;
    ticketType2: any;
    status2: any;
    assignedBy2: any;
    updatedBy2: any;
    agentRemarks2: any;
    ticket2: any[] = [];
    ticketTypeArr2: any[] = [];
    statusArr2: any[] = [];
    assignedArr2: any[] = [];
    updatedByArr2: any[] = [];
    ticketEnable: boolean;
    files2: any[] = [
        {
            label: 'Attachments(0)',
            data: {},
            children: []
        }
    ];
    hideOutbox:boolean = false;

    // for ticket
ticketValue:any
getUdatedDialogData:boolean = false
ticketTypeHistory: any = [];
showDynaTicketCard: boolean = false;
showUpdateButton: boolean = false;
showSaveButton: boolean = false;
showTicketCard: boolean = false;
selectedAssignedBy: any;
disabledTicketFields: boolean = true;
ticketRecords: any = [];
voicefile: any;
ticketNo: any;  ticketCampaignName: any; actionNo: any;  ticketDuration: any;
selectedticketStatus: any;
ticketTypeDropdownData: any[] = [];
selectedTicketType: any[] = [];
newTicketFlag: boolean = false;
ticketStatusDropdownData: any = [];
ticketFields: any = [];
ticketStartTimeUpdate: any;
tree: any;
disposeCall: boolean = true;
selectedDisposeCall: any;
ticketForm: FormGroup;
ticketRecordsValueComman: any = [];
selectedCallBack: boolean;
date: Date = new Date();
dispositionID;
solutionValue;
feedbackValue;
remarksValue;
schoolCodeValue:any
schoolNameValue:any
districtValue:any
blockNameValue:any
problemReportedValue:any
selectedAssignedTo: any;
valueSaveTrue:boolean =false;
callID: any;
ticketSaved: boolean = false;
abc: any = [];
arrObj: number[] = new Array(1);

    constructor(private router: Router,
        private mailService: MailService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
        private datePipe: DatePipe,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.loginResData();
        this.showFileUpload = false;
        this.url = this.baseUrl + '/emailAttachment'
        if (this.ticketEnable == false) {
            this.updatedSend1 = false;
            this.updatedDraft1 = false;
            this.updateSend2 = false;
            this.updatedDraft1 = false;
        }

        this.mailService.showOutbox().subscribe((res:any)=>{
            if(res == 3 || res == '3' || res == 4 || res == '4'){
                this.hideOutbox = true;
            }else{
                this.hideOutbox = false;
            }
        })


    }


    toggleOptions(event: Event, opt: HTMLElement, date: HTMLElement) {
        if (event.type === 'mouseenter') {
            opt.style.display = 'flex';
            date.style.display = 'none';
        } else {
            opt.style.display = 'none';
            date.style.display = 'flex';
        }
    }


    loginResData() {
        if (localStorage.getItem("loginData")) {
            this.loginData = JSON.parse(localStorage.getItem("loginData"));
            for (let i = 0; i < this.loginData['value'].length; i++) {
                this.campid = this.loginData['value'][i]['campid'];
                this.userType = this.loginData['value'][i]['userType'];
                this.ticketEnable = this.loginData['value'][i]['ticketEnable'] != null ? this.loginData['value'][i]['ticketEnable'] : true;

            }

            this.agentid = sessionStorage.getItem('agentid');
            // this.getUserDetails();
        }
    }

    getUserDetails() {
        this.agentid = sessionStorage.getItem('agentid');

    }



    onRowSelect(id: number) {

        // this.router.navigate(['iCallMate-cCP/email/detail/', id]);
    }


    fld_Inbox_RowID: any;
    fld_ReplyText: any;
    fld_SMTP_ID: any;
    source_Type: any;
    fld_CC: any;
    fld_BCC: any;
    fld_CC_1: any;
    fld_BCC_1: any;
    fld_CC_2: any;
    fld_BCC_2: any;

    selectRow(data: any) {
        let dataGet =  sessionStorage.getItem('selectedFolderValue')
        this.emailDialog = true;
        this.selectedRow = ''

        this.selectedRow = {
            loginUserID: this.agentid,
            campID: this.campid,
            userType: this.userType,
            selectedEmailInboxRecord: data,
            selectedFolder : dataGet
        }


        this.mailService.getRowData(this.selectedRow).subscribe((res: any) => {

            this.mailService.emailUpdateSend();
            this.rowDetails = '';
            this.updatedValue = "Update";
            this.updateDisable = true;



            this.rowDetails = res;
            this.attachmentList = this.rowDetails.attachments;

            const dialogData = JSON.parse(res.value);
            const ticketData = JSON.parse(res.ticketvalue);
            // empty
            this.account = [];
            this.selectedAccount = '';
            this.from = '';
            this.subject = '';
            this.textEditor = '';
            this.ticket = [];
            this.ticketTypeArr = [];
            this.ticketType = '';
            this.statusArr = [];
            this.status = '';
            this.assignedArr = [];
            this.assignedBy = '';
            this.updatedByArr = [];
            this.updatedBy = '';
            this.agentRemarks = '';
            this.ticketID = '';
            this.phoneID = '';
            this.sourceName = '';
            this.campName = '';
            this.action_No = '';
            this.ticketTime = '';
            this.ticket_Time = '';
            this.ticket_statusID = '';
            this.remarks = '';
            this.ticket_TypeID = '';
            this.start_Time = '';
            this.source_ID = ''
            this.fld_Inbox_RowID = '';
            this.fld_ReplyText = '';
            this.fld_SMTP_ID = '';
            this.source_Type = ''


            // assigning
            this.account.push(
                { account: dialogData.fld_UserEmailID }
            )
            this.selectedAccount = dialogData.fld_UserEmailID;
            this.cdr.detectChanges();
            this.from = dialogData.fld_From;
            this.subject = dialogData.fld_RepForwSubject;

            // let sanitizedHtmlBody = this.sanitizer.bypassSecurityTrustHtml(dialogData.fld_ReplyText);
            // this.textEditor = sanitizedHtmlBody;
            this.textEditor = dialogData.fld_ReplyText;

            this.fld_Inbox_RowID = dialogData.fld_Inbox_RowID
            this.fld_ReplyText = dialogData.fld_ReplyText
            this.fld_SMTP_ID = dialogData.fld_SMTP_ID
            this.fld_To = dialogData.fld_To;
            this.fld_CC = dialogData.fld_CC
            this.fld_BCC = dialogData.fld_BCC
            this.from = dialogData.fld_To

            // ticket start
            if (ticketData) {

                this.ticket = ticketData;
                this.ticketTypeArr.push(
                    { TicketType: ticketData[0].ticket_type_name }
                )
                this.ticketType = ticketData[0].ticket_type_name;
                this.cdr.detectChanges();
                this.statusArr.push(
                    { label: ticketData[0].ticket_StatusName }
                )
                this.status = ticketData[0].ticket_StatusName;
                this.cdr.detectChanges();
                this.assignedArr.push(
                    { AssignedBy: ticketData[0].assignedByID }
                )
                this.assignedBy = ticketData[0].assignedByID;
                this.cdr.detectChanges();
                this.updatedByArr.push(
                    { updated: ticketData[0].updatedByID }
                )
                this.updatedBy = ticketData[0].updatedByID;
                this.cdr.detectChanges();
                this.agentRemarks = ticketData[0].remarks;

                // some others
                this.ticketID = ticketData[0].ticketID;
                this.phoneid = ticketData[0].phoneID;
                this.sourceName = ticketData[0].sourceName;
                this.campName = ticketData[0].campName;
                this.action_No = ticketData[0].action_No;
                this.ticketTime = ticketData[0].ticketTime;
                this.ticket_Time = ticketData[0].ticket_Time;
                this.ticket_statusID = ticketData[0].ticket_statusID;
                this.remarks = ticketData[0].remarks;
                this.ticket_TypeID = ticketData[0].ticket_TypeID;
                this.start_Time = ticketData[0].start_Time;
                this.source_ID = ticketData[0].source_ID;
                this.source_Type = ticketData[0].source_Type;

            }
            sessionStorage.setItem('fld_SMTP_ID', this.fld_SMTP_ID)

        }, err => {

        })

        if (sessionStorage.getItem('fld_SMTP_ID') && sessionStorage.getItem('fld_SMTP_ID') == this.signature_smtpData.value) {
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
                this.signature = signature[0].signature;

            })
        }

    }
    signature: any = "";
    signature_smtpData: any = [];
    reply() {
        this.replyDialog = true;

        const dialogData = JSON.parse(this.rowDetails.value);
        const ticketData = JSON.parse(this.rowDetails.ticketvalue);
        this.account1 = [];
        this.selectedAccount1 = '';
        this.from1 = '';
        this.subject1 = '';
        this.textEditor1 = '';
        this.ticket1 = [];
        this.ticketTypeArr1 = [];
        this.ticketType1 = '';
        this.statusArr1 = [];
        this.status1 = '';
        this.assignedArr1 = [];
        this.assignedBy1 = '';
        this.updatedByArr1 = [];
        this.updatedBy1 = '';
        this.agentRemarks1 = '';
        this.textEditor13 = '';
        this.showFileUpload = true;

        this.account1.push(
            { account: dialogData.fld_UserEmailID }
        )
        this.selectedAccount1 = dialogData.fld_UserEmailID;
        this.cdr.detectChanges();
        this.from1 = dialogData.fld_From;
        this.subject1 = 'RE:' + dialogData.fld_RepForwSubject;

        this.textEditor1 = `
                        Subject: RE:${dialogData.fld_RepForwSubject}<br>
                        Date: ${this.datePipe.transform(dialogData.fld_InsertDateTime, 'MMM d, yyyy HH:mm:ss')}<br>
                        From: ${dialogData.fld_From}<br>
                        To: ${dialogData.fld_UserEmailID}<br>`
            +
            dialogData.fld_ReplyText

        // ticket start
        if (ticketData) {

            this.ticket1 = ticketData;
            this.ticketTypeArr1.push(
                { TicketType: ticketData[0].ticket_type_name }
            )
            this.ticketType1 = ticketData[0].ticket_type_name;
            this.cdr.detectChanges();
            this.statusArr1.push(
                { label: ticketData[0].ticket_StatusName }
            )
            this.status1 = ticketData[0].ticket_StatusName;
            this.cdr.detectChanges();
            this.assignedArr1.push(
                { AssignedBy: ticketData[0].assignedByID }
            )
            this.assignedBy1 = ticketData[0].assignedByID;
            this.cdr.detectChanges();
            this.updatedByArr1.push(
                { updated: ticketData[0].updatedByID }
            )
            this.updatedBy1 = ticketData[0].updatedByID;
            this.cdr.detectChanges();
            this.agentRemarks1 = ticketData[0].remarks;
        }
    }

    forward() {
        this.forwardDialog = true;

        this.showFileUpload = true;
        const dialogData = JSON.parse(this.rowDetails.value);
        const ticketData = JSON.parse(this.rowDetails.ticketvalue);
        this.account2 = [];
        this.selectedAccount2 = '';
        this.from2 = '';
        this.to2 = ''
        this.subject2 = '';
        this.textEditor2 = '';
        this.ticket2 = [];
        this.ticketTypeArr2 = [];
        this.ticketType2 = '';
        this.statusArr2 = [];
        this.status2 = '';
        this.assignedArr2 = [];
        this.assignedBy2 = '';
        this.updatedByArr2 = [];
        this.updatedBy2 = '';
        this.agentRemarks2 = '';
        this.textEditor23 = '';

        // assigning
        this.account2.push(
            { account: dialogData.fld_UserEmailID }
        )
        this.selectedAccount2 = dialogData.fld_UserEmailID;
        this.cdr.detectChanges();
        this.from2 = dialogData.fld_UserEmailID;
        // to2 is empty will asign by the user
        this.subject2 = 'FW:' + dialogData.fld_RepForwSubject;
        this.textEditor2 = `
                        Subject: FW:${dialogData.fld_RepForwSubject}<br>
                        Date: ${this.datePipe.transform(dialogData.fld_InsertDateTime, 'MMM d, yyyy HH:mm:ss')}<br>
                        From: ${dialogData.fld_From}<br>
                        To: ${dialogData.fld_UserEmailID}<br>`
            +
            dialogData.fld_ReplyText;

        // ticket start
        if (ticketData) {

            this.ticket2 = ticketData;
            this.ticketTypeArr2.push(
                { TicketType: ticketData[0].ticket_type_name }
            )
            this.ticketType2 = ticketData[0].ticket_type_name;
            this.cdr.detectChanges();
            this.statusArr2.push(
                { label: ticketData[0].ticket_StatusName }
            )
            this.status2 = ticketData[0].ticket_StatusName;
            this.cdr.detectChanges();
            this.assignedArr2.push(
                { AssignedBy: ticketData[0].assignedByID }
            )
            this.assignedBy2 = ticketData[0].assignedByID;
            this.cdr.detectChanges();
            this.updatedByArr2.push(
                { updated: ticketData[0].updatedByID }
            )
            this.updatedBy2 = ticketData[0].updatedByID;
            this.cdr.detectChanges();
            this.agentRemarks2 = ticketData[0].remarks;

        }
    }


    onUpload(event: any) {
        this.uploadedFiles = [];
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }
    listAttachFiles: any = [];
    uploadHandler(file: any) {
        this.listAttachFiles = [];
        let campid = this.campid
        this.mailService.onFileUpload(file.files,campid).subscribe((res: any) => {
            this.successfulFileUploadResponse = res;
            if (res.status == 'success') {
                this.listAttachFiles = res.listAttachFiles;
                this.messageService.add({ severity: 'info', summary: res.status, detail: 'File Uploaded Successfully' });
                this.uploadedFiles = [];
                this.onUpload(file);
                let xyz = document.getElementsByClassName("p-fileupload-row") as HTMLCollectionOf<HTMLElement> | null;
                for (let i = 0; i < xyz.length; i++) {
                    xyz[i].style.display = 'none';
                }
            }
            else {
                this.messageService.add({ severity: 'info', summary: res.status, detail: res.status });
            }

        })
    }

    onUpload1(event: any) {
        this.uploadedFiles = [];
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }
    successfulFileUploadForwardResponse: any = [];
    uploadHandlerForward(file: any) {
        this.listAttachFiles = [];
        let campid = this.campid
        this.mailService.onFileUpload(file.files,campid).subscribe((res: any) => {
            this.successfulFileUploadForwardResponse = res;
            if (res.status == 'success') {
                this.listAttachFiles = res.listAttachFiles;
                this.messageService.add({ severity: 'info', summary: res.status, detail: 'File Uploaded Successfully' });
                this.uploadedFiles = [];
                this.onUpload1(file);
                let xyz = document.getElementsByClassName("p-fileupload-row") as HTMLCollectionOf<HTMLElement> | null;
                for (let i = 0; i < xyz.length; i++) {
                    xyz[i].style.display = 'none';
                }
            }
            else {
                this.messageService.add({ severity: 'info', summary: res.status, detail: res.status });
            }

        })
    }

    updateDisable: boolean = true;
    saveTicketUpdates: boolean = false;
    update() {
        if (this.saveTicketUpdates) {
            let data = {
                loginUserID: this.agentid,
                userType: this.userType,
                campID: this.campid,
                ticketID: this.ticketID,
                phoneID: this.phoneid,
                // sourceName: this.sourceName,
                sourceName: 'Email',
                campName: this.campName,
                action_No: this.action_No,
                // ticket_Time: formattedDate1,
                ticket_Time: this.ticket_Time ? this.datePipe.transform(new Date(this.ticket_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
                ticketTime: this.ticketTime,
                assignedByID: this.assignedBy.AssignedBy,
                ticket_TypeID: this.ticketType,
                ticket_statusID: this.status,
                remarks: this.agentRemarks,
                // ticketStartTime: formattedDate2,
                ticketStartTime: this.start_Time ? this.datePipe.transform(new Date(this.start_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
                source_ID: this.source_ID,
                // source_Type: this.source_Type
                source_Type: "1"
            }


            this.mailService.saveTickets(data).subscribe((res: any) => {

                this.messageService.add({ severity: 'info', summary: res.value, detail: '' });
            }, err => {

            })
            // this.saveTicketUpdates = false;
        }


        if (this.updateDisable) {
            this.updatedValue = "Save";
            this.ticketTypeArr = [
                { TicketType: 'Select', itemValue: '0' },
                { TicketType: 'AutoGeneratedTicketFromEmail', itemValue: '-1' },
                { TicketType: 'Sent to Exception', itemValue: '-3' },
                { TicketType: 'Sent to Technical  Team', itemValue: '-4' },
                { TicketType: 'Spam Mail', itemValue: '-5' },
                { TicketType: 'Success_IB', itemValue: '-6' },
                { TicketType: 'Successfully Replied/Closed', itemValue: '-7' },
                { TicketType: 'Abusive Customer_IB', itemValue: '-8' },
            ]
            this.mailService.statusOptions().subscribe((res: any) => {

                this.statusArr = res;
            }, err => {

            })
            this.updateDisable = false;
            this.messageService.add({ severity: 'info', summary: 'Ticket Changed to update mode', detail: '' });
            this.saveTicketUpdates = true;
        }

    }


    updateDisable1: boolean = true;
    updatedSend1: boolean = true;
    updatedDraft1: boolean = true;
    saveTicketUpdates1: boolean = false;
    update1() {
        if (this.saveTicketUpdates1) {
            const textWithoutTags = this.textEditor13;

            let data = {
                loginUserID: this.agentid,
                userType: this.userType,
                campID: this.campid,
                ticketID: this.ticketID,
                phoneID: this.phoneid,
                // sourceName: this.sourceName,
                sourceName: 'Email',
                campName: this.campName,
                action_No: this.action_No,
                // ticket_Time: formattedDate1,
                ticket_Time: this.ticket_Time ? this.datePipe.transform(new Date(this.ticket_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
                ticketTime: this.ticketTime,
                assignedByID: this.assignedBy.AssignedBy,
                ticket_TypeID: this.ticketType1,
                ticket_statusID: this.status1,
                remarks: this.agentRemarks1,
                // ticketStartTime: formattedDate2,
                ticketStartTime: this.start_Time ? this.datePipe.transform(new Date(this.start_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
                source_ID: this.source_ID,
                source_Type: "1",
                fld_Inbox_RowID: this.fld_Inbox_RowID,
                fld_ReplyText: this.fld_ReplyText,
                fld_Text: textWithoutTags
            }


            this.mailService.saveTickets(data).subscribe((res: any) => {

                this.messageService.add({ severity: 'info', summary: res.value, detail: res.ticketID });
            }, err => {

            })
            // this.saveTicketUpdates1 = false;
        }


        if (this.updateDisable1) {
            this.updatedValue1 = "Save";

            const textWithoutTags = this.textEditor13; // Remove HTML tags


            this.ticketTypeArr1 = [
                { TicketType: 'Select', itemValue: '0' },
                { TicketType: 'AutoGeneratedTicketFromEmail', itemValue: '-1' },
                { TicketType: 'Sent to Exception', itemValue: '-3' },
                { TicketType: 'Sent to Technical  Team', itemValue: '-4' },
                { TicketType: 'Spam Mail', itemValue: '-5' },
                { TicketType: 'Success_IB', itemValue: '-6' },
                { TicketType: 'Successfully Replied/Closed', itemValue: '-7' },
                { TicketType: 'Abusive Customer_IB', itemValue: '-8' },
            ]
            this.mailService.statusOptions().subscribe((res: any) => {

                this.statusArr1 = res;
            }, err => {

            })
            this.updateDisable1 = false;
            this.messageService.add({ severity: 'info', summary: 'Ticket Changed to update mode', detail: '' });
            this.saveTicketUpdates1 = true;
            this.updatedSend1 = false;
            this.updatedDraft1 = false;
        }
    }

    send1(boolValue) {

        // if (this.updatedSend1) {

        //     this.messageService.add({ severity: 'error', summary: 'Ticket Not Updated', detail: 'Please Update Ticket First' });
        // } else {
            const textWithoutTags = this.textEditor13;

            let data = {
                fld_SMTP_ID: this.fld_SMTP_ID,
                loginUserID: this.agentid,
                fld_From: this.fld_To,
                userType: this.userType,
                campID: this.campid,
                fld_RepForwSubject: this.subject1,
                fld_TicketID: this.ticketID ? this.ticketID : '0',
                phoneID: this.phoneid,
                sourceName: 'Email',
                campName: this.campName,
                fld_To: this.from,
                action_No: this.action_No,
                // ticket_Time: formattedDate1 ? formattedDate1 : '',
                ticket_Time: this.ticket_Time ? this.datePipe.transform(new Date(this.ticket_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
                ticketTime: this.ticketTime,
                assignedByID: this.assignedBy.AssignedBy,
                ticket_TypeID: this.ticketType1,
                ticket_statusID: this.status1,
                remarks: this.agentRemarks1,
                // ticketStartTime: formattedDate2 ? formattedDate2 : '',
                ticketStartTime: this.start_Time ? this.datePipe.transform(new Date(this.start_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
                source_ID: this.source_ID,
                source_Type: "1",
                fld_Inbox_RowID: this.fld_Inbox_RowID,
                fld_ReplyText: this.textEditor1 + this.textEditor13,
                fld_Text: textWithoutTags,
                listAttachFilesPath: this.successfulFileUploadResponse.listAttachFilesPath,
                listAttachFiles: this.successfulFileUploadResponse.listAttachFiles,
                isdraft: boolValue,
                fld_BCC: this.fld_BCC_1,
                fld_CC: this.fld_CC_1
            }


            this.mailService.saveComposeEmail(data).subscribe((res: any) => {

                this.mailService.emailUpdateSend();
                this.emailDialog = false;
                this.successfulFileUploadResponse = [];
                this.showFileUpload = false;
                this.replyDialog = false;
                this.forwardDialog = false;
                this.messageService.add({ severity: 'info', summary: res.value, detail: res.ticketID });
            }, err => {

            })
        // }
    }


    // draft1() {

    //     if (this.updatedDraft1) {

    //         this.messageService.add({ severity: 'error', summary: 'Ticket Not Updated', detail: 'Please Update Ticket First' });

    //     } else {

    //         const textWithoutTags = this.textEditor13;

    //         let data = {
    //             loginUserID: this.agentid,
    //             userType: this.userType,
    //             campID: this.campid,
    //             ticketID: this.ticketID,
    //             phoneID: this.phoneID,
    //             // sourceName: this.sourceName,
    //             sourceName: 'Email',
    //             campName: this.campName,
    //             action_No: this.action_No,
    //             // ticket_Time: formattedDate1,
    //             ticket_Time: this.ticket_Time ? this.datePipe.transform(new Date(this.ticket_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
    //             ticketTime: this.ticketTime,
    //             assignedByID: this.assignedBy.AssignedBy,
    //             ticket_TypeID: this.ticketType1,
    //             ticket_statusID: this.status1,
    //             remarks: this.agentRemarks1,
    //             // ticketStartTime: formattedDate2,
    //             ticketStartTime: this.start_Time ? this.datePipe.transform(new Date(this.start_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
    //             source_ID: this.source_ID,
    //             source_Type: "1",
    //             fld_Inbox_RowID: this.fld_Inbox_RowID,
    //             fld_ReplyText: this.fld_ReplyText,
    //             fld_Text: textWithoutTags,
    //             isdraft: true
    //         }


    //         this.mailService.saveTickets(data).subscribe((res: any) => {

    //             this.mailService.emailUpdateSend();
    //             this.emailDialog = false;
    //             this.replyDialog = false;
    //             this.forwardDialog = false;
    //             this.messageService.add({ severity: 'info', summary: res.value, detail: res.ticketID });
    //         }, err => {

    //         })
    //     }

    // }



    updateDisable2: boolean = true;
    saveTicketUpdates2: boolean = false;
    updateSend2: boolean = true;
    update2() {
        if (this.saveTicketUpdates2) {


            // const ticket_Time = this.ticket_Time;
            // const parsedDate1 = new Date(ticket_Time);
            // const formattedDate1 = this.datePipe.transform(parsedDate1, 'yyyy-MM-dd HH:mm:ss.S');



            // const startTime = this.start_Time;
            // const parsedDate2 = new Date(startTime);
            // const formattedDate2 = this.datePipe.transform(parsedDate2, 'yyyy-MM-dd HH:mm:ss.S');


            const textWithoutTags = this.textEditor23;

            let data = {
                loginUserID: this.agentid,
                userType: this.userType,
                campID: this.campid,
                ticketID: this.ticketID,
                phoneID: this.phoneid,
                // sourceName: this.sourceName,
                sourceName: 'Email',
                campName: this.campName,
                action_No: this.action_No,
                // ticket_Time: formattedDate1,
                ticket_Time: this.ticket_Time ? this.datePipe.transform(new Date(this.ticket_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
                ticketTime: this.ticketTime,
                assignedByID: this.assignedBy.AssignedBy,
                ticket_TypeID: this.ticketType2,
                ticket_statusID: this.status2,
                remarks: this.agentRemarks2,
                // ticketStartTime: formattedDate2,
                ticketStartTime: this.start_Time ? this.datePipe.transform(new Date(this.start_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
                source_ID: this.source_ID,
                source_Type: "1",
                fld_Inbox_RowID: this.fld_Inbox_RowID,
                fld_ReplyText: this.fld_ReplyText,
                fld_Text: textWithoutTags
            }


            this.mailService.saveTickets(data).subscribe((res: any) => {

                // this.messageService.add({ severity: 'success', summary: `${res.ticketID} Saved successfully`, detail: '' });
                this.messageService.add({ severity: 'info', summary: res.value, detail: res.ticketID });
            }, err => {

            })
            // this.saveTicketUpdates2 = false;
        }


        if (this.updateDisable2) {
            this.updatedValue2 = "Save";
            this.ticketTypeArr2 = [
                { TicketType: 'Select', itemValue: '0' },
                { TicketType: 'AutoGeneratedTicketFromEmail', itemValue: '-1' },
                { TicketType: 'Sent to Exception', itemValue: '-3' },
                { TicketType: 'Sent to Technical  Team', itemValue: '-4' },
                { TicketType: 'Spam Mail', itemValue: '-5' },
                { TicketType: 'Success_IB', itemValue: '-6' },
                { TicketType: 'Successfully Replied/Closed', itemValue: '-7' },
                { TicketType: 'Abusive Customer_IB', itemValue: '-8' },
            ]
            this.mailService.statusOptions().subscribe((res: any) => {

                this.statusArr2 = res;
            }, err => {

            })
            this.updateDisable2 = false;
            this.messageService.add({ severity: 'info', summary: 'Ticket Changed to update mode', detail: '' });
            this.saveTicketUpdates2 = true;
            this.updateSend2 = false;
        }
    }


    send2(boolValue) {

        // if (this.updateSend2) {

        //     this.messageService.add({ severity: 'error', summary: 'Ticket Not Updated', detail: 'Please Update Ticket First' });
        // } else {

            // const textWithoutTags = this.textEditor23;

            // let data = {
            //     loginUserID: this.agentid,
            //     userType: this.userType,
            //     campID: this.campid,
            //     ticketID: this.ticketID,
            //     phoneID: this.phoneID,
            //     // sourceName: this.sourceName,
            //     sourceName: 'Email',
            //     campName: this.campName,
            //     action_No: this.action_No,
            //     // ticket_Time: formattedDate1,
            //     ticket_Time: this.ticket_Time ? this.datePipe.transform(new Date(this.ticket_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
            //     ticketTime: this.ticketTime,
            //     assignedByID: this.assignedBy.AssignedBy,
            //     ticket_TypeID: this.ticketType2,
            //     ticket_statusID: this.status2,
            //     remarks: this.agentRemarks2,
            //     // ticketStartTime: formattedDate2,
            //     ticketStartTime: this.start_Time ? this.datePipe.transform(new Date(this.start_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
            //     source_ID: this.source_ID,
            //     source_Type: "1",
            //     fld_Inbox_RowID: this.fld_Inbox_RowID,
            //     fld_ReplyText: this.fld_ReplyText,
            //     fld_Text: textWithoutTags,
            //     listAttachFilesPath: this.successfulFileUploadForwardResponse.listAttachFilesPath,
            //     listAttachFiles: this.successfulFileUploadForwardResponse.listAttachFiles
            // }


            const textWithoutTags = this.textEditor13;

            let data = {
                fld_SMTP_ID: this.fld_SMTP_ID,
                loginUserID: this.agentid,
                fld_From: this.from2,
                userType: this.userType,
                campID: this.campid,
                fld_RepForwSubject: this.subject2,
                fld_TicketID: this.ticketID ? this.ticketID : '0',
                phoneID: this.phoneid,
                sourceName: 'Email',
                campName: this.campName,
                fld_To: this.to2,
                action_No: this.action_No,
                // ticket_Time: formattedDate1 ? formattedDate1 : '',
                ticket_Time: this.ticket_Time ? this.datePipe.transform(new Date(this.ticket_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
                ticketTime: this.ticketTime,
                assignedByID: this.assignedBy.AssignedBy,
                ticket_TypeID: this.ticketType2,
                ticket_statusID: this.status2,
                remarks: this.agentRemarks2,
                // ticketStartTime: formattedDate2 ? formattedDate2 : '',
                ticketStartTime: this.start_Time ? this.datePipe.transform(new Date(this.start_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
                source_ID: this.source_ID,
                source_Type: "1",
                fld_Inbox_RowID: this.fld_Inbox_RowID,
                fld_ReplyText: this.textEditor2 + this.textEditor23,
                fld_Text: textWithoutTags,
                listAttachFilesPath: this.successfulFileUploadForwardResponse.listAttachFilesPath,
                listAttachFiles: this.successfulFileUploadForwardResponse.listAttachFiles,
                isdraft: boolValue,
                fld_BCC: this.fld_BCC_2,
                fld_CC: this.fld_CC_2
            }



            this.mailService.saveComposeEmail(data).subscribe((res: any) => {

                this.mailService.emailUpdateSend();
                this.emailDialog = false;
                this.replyDialog = false;
                this.forwardDialog = false;
                // this.messageService.add({ severity: 'success', summary: `${res.ticketID} Saved successfully`, detail: '' });
                this.messageService.add({ severity: 'info', summary: res.value, detail: res.ticketID });
            }, err => {

            })
        // }
    }


    // draft2() {

    //     if (this.updatedDraft1) {

    //         this.messageService.add({ severity: 'error', summary: 'Ticket Not Updated', detail: 'Please Update Ticket First' });

    //     }
    //     else {


    //         // const ticket_Time = this.ticket_Time;
    //         // const parsedDate1 = new Date(ticket_Time);
    //         // const formattedDate1 = this.datePipe.transform(parsedDate1, 'yyyy-MM-dd HH:mm:ss.S');

    //         // const startTime = this.start_Time;
    //         // const parsedDate2 = new Date(startTime);
    //         // const formattedDate2 = this.datePipe.transform(parsedDate2, 'yyyy-MM-dd HH:mm:ss.S');


    //         const textWithoutTags = this.textEditor13;

    //         let data = {
    //             loginUserID: this.agentid,
    //             userType: this.userType,
    //             campID: this.campid,
    //             ticketID: this.ticketID,
    //             phoneID: this.phoneID,
    //             // sourceName: this.sourceName,
    //             sourceName: 'Email',
    //             campName: this.campName,
    //             action_No: this.action_No,
    //             // ticket_Time: formattedDate1,
    //             ticket_Time: this.ticket_Time ? this.datePipe.transform(new Date(this.ticket_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
    //             ticketTime: this.ticketTime,
    //             assignedByID: this.assignedBy.AssignedBy,
    //             ticket_TypeID: this.ticketType1,
    //             ticket_statusID: this.status1,
    //             remarks: this.agentRemarks1,
    //             // ticketStartTime: formattedDate2,
    //             ticketStartTime: this.start_Time ? this.datePipe.transform(new Date(this.start_Time), 'yyyy-MM-dd HH:mm:ss.S') : '',
    //             source_ID: this.source_ID,
    //             source_Type: "1",
    //             fld_Inbox_RowID: this.fld_Inbox_RowID,
    //             fld_ReplyText: this.fld_ReplyText,
    //             fld_Text: textWithoutTags,
    //             isdraft: true
    //         }


    //         this.mailService.saveTickets(data).subscribe((res: any) => {

    //             this.mailService.emailUpdateSend();
    //             this.emailDialog = false;
    //             this.replyDialog = false;
    //             this.forwardDialog = false;
    //             this.messageService.add({ severity: 'info', summary: res.value, detail: res.ticketID });
    //         }, err => {

    //         })
    //     }

    // }



    ticketHistoryDialog: boolean = false;
    noOfTables: any[] = [];

    ticketHistory(data1) {
        this.noOfTables = [];

        let data = {
            campID: this.campid,
            ticketID: data1.ticketid ? data1.ticketid : data1.ticketID
        }


        this.mailService.getTicketHistory(data).subscribe((res: any) => {

            this.noOfTables = res.value;


        }, err => {

        })
        this.ticketHistoryDialog = true;
        this.getDynamicFormFields()
    }
    ticketHistory1(data1) {
        this.noOfTables = [];

        let data = {
            campID: this.campid,
            ticketID: data1
        }


        this.mailService.getTicketHistory(data).subscribe((res: any) => {

            this.noOfTables = res.value;


        }, err => {

        })
        this.ticketHistoryDialog = true;
        this.getDynamicFormFields()
    }


    readMails() {
        this.mailService.emailUpdateSend();
    }


    spam() {
        let data = {
            stmpid: this.fld_SMTP_ID,
            rowid: this.fld_Inbox_RowID
        }

        this.mailService.sendSpam(data).subscribe((res: any) => {

            this.mailService.emailUpdateSend();
            this.messageService.add({ severity: 'info', summary: res.value, detail: '' });
            this.emailDialog = false;
            this.replyDialog = false;
            this.forwardDialog = false;
        }, err => {

        })

    }












    onStar(event: Event, id: number) {
        event.stopPropagation();
        this.mailService.onStar(id);
    }

    onArchive(event: Event, id: number) {
        event.stopPropagation();
        this.mailService.onArchive(id);
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Mail archived', life: 3000 });
    }

    onBookmark(event: Event, id: number) {
        event.stopPropagation();
        this.mailService.onBookmark(id);
    }

    onDelete(id: number) {
        this.mailService.onDelete(id);
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Mail deleted', life: 3000 });
    }

    onDeleteMultiple() {
        if (this.selectedMails && this.selectedMails.length > 0) {
            this.mailService.onDeleteMultiple(this.selectedMails);
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Mails deleted', life: 3000 });
        }
    }

    onSpamMultiple() {
        if (this.selectedMails && this.selectedMails.length > 0) {
            this.mailService.onSpamMultiple(this.selectedMails);
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Moved to spam', life: 3000 });
        }
    }

    onArchiveMultiple() {
        if (this.selectedMails && this.selectedMails.length > 0) {
            this.mailService.onArchiveMultiple(this.selectedMails);
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Moved to archive', life: 3000 });
        }
    }

    onTrash(event: Event, mail: Mail) {
        event.stopPropagation();
        if (mail.trash) {
            this.onDelete(mail.id)
        }
        this.mailService.onTrash(mail.id);
    }

    onReply(event: Event, mail: Mail) {
        event.stopPropagation();
        this.mail = mail;
        this.dialogVisible = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onImageLink(item: any) {

        this.mailService.getDownloadLinkOfImage(item).subscribe((res: any) => {
            this.messageService.add({ severity: 'info', summary: res.status, detail: res.value });
            if (res.status == 'success') {
                const file = this.base64toFile(res.file, item.fileName);
                saveAs(file, item.fileName);
            }
        })
    }


    base64toFile(base64: string, filename: string): File {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new File([byteArray], filename);
    }




    searchValue: any;
    returnenterKeyPressed(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            let dataaaa = {
                loginUserID: this.agentid,
                campID: this.campid,
                userType: this.userType,
                selectedFolder: sessionStorage.getItem('getSideBar'),
                searchRecord: this.searchValue
            }
            this.mailService.getSearchData(JSON.stringify(dataaaa)).subscribe((res: any) => {
                this.mails = res.listEmailInboxRecords;
            });
        }

    }


    getTemplate() {
        let data = {
            campID: this.campid,
            sourcetype: "1"
        }

        this.mailService.getTemplateData(JSON.stringify(data)).subscribe((res: any) => {
            this.template = res.listTemplates;
        })
    }


    getTemplate1() {
        let data = {
            campID: this.campid,
            sourcetype: "1"
        }

        this.mailService.getTemplateData(JSON.stringify(data)).subscribe((res: any) => {
            this.template1 = res.listTemplates;
        })
    }

    selectedReplyTemplate(event: any) {
        if (event.value != null) {
            this.textEditor13 = event.value;
        }
        else {
            this.textEditor13 = "";
        }
    }

    getTemplate2() {
        let data = {
            campID: this.campid,
            sourcetype: "1"
        }

        this.mailService.getTemplateData(JSON.stringify(data)).subscribe((res: any) => {
            this.template2 = res.listTemplates;
        })
    }


    selectedforwardTemplate(event: any) {
        if (event.value != null) {
            this.textEditor23 = event.value;
        }
        else {
            this.textEditor23 = "";
        }
    }

    minusValue(){
        // if(this.myvalueSEt){

        // }
        this.myvalueSEt = this.myvalueSEt - this.myvalueSEt
        // this.pageChangeEvent(this.myvalueSEt)
        if( this.myvalueSEt && this.mySerachApi){
        this.onMore1()
        }else if( this.myvalueSEt && !this.mySerachApi){
            this.onMore2() 
        }
    }
    plusValue(){
        this.myvalueSEt = this.myvalueSEt + this.myvalueSEt
        if( this.myvalueSEt && this.mySerachApi){
            this.onMore1()
            }else if( this.myvalueSEt && !this.mySerachApi){
                this.onMore2() 
            }
    }
    pageChangeEvent(value){
        this.myvalueSEt = value.rows
// console.log(value,'myvalue11');
       if(value.first === 0 &&  this.mySerachApi){
        this.onMore1()
       } else if(!this.mySerachApi){
        this.onMore2()
       }
    }
    onMore() {
        let emaillastRowId: any = this.mails[this.mails.length - 1];
        let data = {
            "loginUserID": this.agentid,
            "campID": this.campid,
            "userType": this.userType,
            "selectedFolder": sessionStorage.getItem('getSideBar'),
            "lastrowid": emaillastRowId.fld_RowID,
            'isfolderClick' : true,
            count: this.myvalueSEt,
        }

        this.mailService.getEmailData(JSON.stringify(data)).subscribe((res: any) => {
            if (sessionStorage.getItem('getSideBar') == 'email-inbox') {
                this.mails = res.listEmailInboxRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-draft') {
                this.mails = res.listemaildraftRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-outbox') {
                this.mails = res.listemailOutboxRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-replied') {
                this.mails = res.listReplyInboxRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-sent') {
                this.mails = res.listemailSentRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-spam') {
                this.mails = res.listEmailSpamRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-deleted') {
                this.mails = res.listemailDeletedRecords;
            }

        })
    }
    onMore1() {
        let emaillastRowId: any = this.mails[this.mails.length - 1];
        let data = {
            "loginUserID": this.agentid,
            "campID": this.campid,
            "userType": this.userType,
            "selectedFolder": sessionStorage.getItem('getSideBar'),
            // "lastrowid": emaillastRowId.fld_RowID,
            'isfolderClick' : true,
            count: this.myvalueSEt,
        }

        this.mailService.getEmailData(JSON.stringify(data)).subscribe((res: any) => {
            if (sessionStorage.getItem('getSideBar') == 'email-inbox') {
                this.mails = res.listEmailInboxRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-draft') {
                this.mails = res.listemaildraftRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-outbox') {
                this.mails = res.listemailOutboxRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-replied') {
                this.mails = res.listReplyInboxRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-sent') {
                this.mails = res.listemailSentRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-spam') {
                this.mails = res.listEmailSpamRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-deleted') {
                this.mails = res.listemailDeletedRecords;
            }

        })
    }
    onMore2() {
        this.mySerachApi = false
        let emaillastRowId: any = this.mails[this.mails.length - 1];
        let data = {
            "loginUserID": this.agentid,
            "campID": this.campid,
            "userType": this.userType,
            "selectedFolder": sessionStorage.getItem('getSideBar'),
            // "lastrowid": emaillastRowId.fld_RowID,
            'isfolderClick' : true,
            count: this.myvalueSEt,
        }

        this.mailService.getEmailData(JSON.stringify(data)).subscribe((res: any) => {
            if (sessionStorage.getItem('getSideBar') == 'email-inbox') {
                this.mails = res.listEmailInboxRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-draft') {
                this.mails = res.listemaildraftRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-outbox') {
                this.mails = res.listemailOutboxRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-replied') {
                this.mails = res.listReplyInboxRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-sent') {
                this.mails = res.listemailSentRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-spam') {
                this.mails = res.listEmailSpamRecords;
            }
            else if (sessionStorage.getItem('getSideBar') == 'email-deleted') {
                this.mails = res.listemailDeletedRecords;
            }

        })
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
                    const formGroupControls = {};
                    this.getDynamicLeadCustField();
                    for (const field of this.formFields) {
                        formGroupControls[field.fld_FieldName] = [field.value || ''];
                    }
                    this.customForm = this.fb.group(formGroupControls);
                });
        }


    }
    // getData
    async getDynamicLeadCustField() {
        try {
            let payLoad = {
                "campid": this.campid,
                "phoneid": this.phoneid,
                "mode": "1",
                // "fld_phoneno": sessionStorage.getItem('phnno'),
                // "sourceType": "3" 
            }
            this.mailService.getLeadCustField(payLoad).subscribe(
                async (data) => {
                    const parsedData = JSON.parse(data['value']);
                    this.phoneDataa = parsedData
    
                    if (parsedData.status == 'success') {
                        this.phoneid = '';
                        this.phoneid = parsedData.phoneid; // added for incoming.
                        let ticketId;
                        let ticketData = {
                            campid: this.campid,
                            ticketid: ticketId,
                            custid: this.phoneid
                        }
                        // await this.getTicketInformation(ticketData);
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
        formatPhoneNumber(phoneNumber: any): any {
            const visibleDigits = 3;
            const visiblePart = phoneNumber.substring(phoneNumber.length - visibleDigits);
            const hiddenPart = '*'.repeat(phoneNumber.length - visibleDigits);
            return hiddenPart + visiblePart;
          }
          ticketOpen(value){
            this.getDynamicFormFields();
            this.ticketValue = value
            if(this.ticketValue.ticketid !=0){
              this.getUdatedDialogData =true
              // this.newTicketValueOPenT = true
              // let ticketData = {
              //   ticketid: this.ticketValue.ticketid,
              //   campid: this.campid,
              //   // custid: this.phoneid
              // }
              let ticketd = this.ticketValue.ticketid ? this.ticketValue.tickeid : this.ticketValue.ticketID
              // // this.getTicketInformation(ticketData);
              
            //   let ticketData = {
            //     ticketid: ticketd,
            //     campid: this.campid,
            //     // custid: this.phoneid
            // }

            // this.getTicketInformation(ticketData);
                this.mailService.getTicketHistoryData(this.campid, ticketd).subscribe((res: any) => {
                    this.ticketTypeHistory = res.value;
                this.showTicketCard = true;
                this.showSaveButton = false;
                this.showUpdateButton = true;
                this.disabledTicketFields = true;
                this.getTicketStatus();
                this.getTicketTypeData();
                if(this.ticketTypeHistory){
                  this.ticketRecords = res.value[0];
                  // voice file

                  this.phoneid = (this.ticketRecords && this.ticketRecords.phoneID) ? this.ticketRecords.phoneID :  this.ticketValue.phoneID
                  this.ticketNo = this.ticketValue.ticketid ? this.ticketValue.ticketid : this.ticketValue.ticketID;
                  this.sourceName = (this.ticketRecords && this.ticketRecords.sourceName) ? this.ticketRecords.sourceName : this.ticketValue.sourceName,
                //   this.source_Type =  this.ticketRecords.source_Type,
                  this.ticketCampaignName = (this.ticketRecords && this.ticketRecords.campName) ? this.ticketRecords.campName : this.ticketValue.campName;
                  this.actionNo = this.ticketRecords.action_No ? this.ticketRecords.action_No : this.ticketValue.action_No;
                  this.ticketTime = this.ticketRecords.ticket_Time ? this.ticketRecords.ticket_Time : this.ticketValue.ticket_Time;
                  this.ticketDuration = this.ticketRecords.ticketTime ? this.ticketRecords.ticketTime : this.ticketValue.ticketTime;
                  this.selectedAssignedBy = this.ticketRecords.assignedByID ? this.ticketRecords.assignedByID : this.ticketValue.assignedByID;
                  this.selectedticketStatus = this.ticketRecords.ticket_statusID ? this.ticketRecords.ticket_statusID : this.ticketValue.ticket_statusID;
                 
                  this.agentRemarks = this.ticketRecords.remarks ? this.ticketRecords.remarks :this.ticketValue.remarks;
                  this.ticketTypeDropdownData[0] = this.ticketRecords.listTicketTypes ?  this.ticketRecords.listTicketTypes : this.ticketValue.listTicketTypes; // for multi level dropdown
                  // 
                  this.selectedTicketType[0] = this.ticketRecords.ticket_TypeID ? this.ticketRecords.ticket_TypeID : this.ticketValue.ticket_TypeID; // for multi level dropdown
                  
                  this.ticketID = this.ticketValue.ticketid ? this.ticketValue.ticketid : this.ticketValue.ticketID; // by rajat
                  if(this.phoneid){
                  this.getDynamicLeadCustField();
                  }
                  this.voicefile = (res.value[0] && res.value[0].voicefile) ? res.value[0].voicefile :this.ticketValue.voicefile;
                }
                });
                
              }else{
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
                    if (phonedata && phonedata.status == 'success') {
          
                        sessionStorage.setItem('redialPayload',JSON.stringify(payLoad))
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
          ticketTypeIDdd: any;
saveTicketData(phoneid) {
    let callRecording = sessionStorage.getItem('callRecording')
    this.callID = sessionStorage.getItem('callID')
    let dynaticketfieldsValues: any;
    // if (this.ticketForm.value.hasOwnProperty('undefined')) {
    //     dynaticketfieldsValues = {};
    // }
    // else {
    //     dynaticketfieldsValues = this.ticketForm.value;
    // }
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
        source_ID: this.ticketValue.rowid,
        // source_ID: this.accountDropdown[0].label,
        fld_Source_Value: this.ticketRecords.fld_Source_Value,
        // call_Time: this.ticketRecords.call_Time,
        ticket_closureID: this.ticketRecords.ticket_closureID,
        loginUserID: this.agentid,
        userType: 3,
        campID: this.campid,
        ticketID: this.ticketNo,
        sourceName: "Email",
        campName: this.campName,
        action_No: this.actionNo,
        ticket_Time: this.ticketTime,
        ticketTime: this.ticketDuration,
        assignedByID: this.selectedAssignedBy,
        ticket_statusID: this.selectedticketStatus,
        remarks: this.agentRemarks,
        ticket_TypeID: this.ticketTypeIDdd,
        refvalue:this.selectedAccount.account
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
closeDetailsTicket(){
    this.newTicketFlag = false
  } 
}

