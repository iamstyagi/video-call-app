import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FBserviceService } from '../services/f-bservice.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FormField } from 'src/app/form-field';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() fbPosts: any[] = [];
  selectedPosts: any;
  deletedPost: any;
  inboxPost: any;
  queuePost: any;
  sentPost: any;
  outboxPost: any;
  startdate: any;
  enddate: any;
  loginData: any;
  campid: any;
  userType: any;
  agentid: any;
  replyAccountDialog: boolean = false;
  fromAccount: any[] = [];
  selectedAccount: any;
  toAccount: any[] = [];
  to: any;
  listFacebookThread: any;
  listTicketRecords: any[] = [];
  listSelectedTemp: any;
  tempSection: boolean = false;
  updatedValue: string = 'Update';
  ticketTypeArr: any[] = [];
  assignedArr: any[] = [];
  statusArr: any[] = [];
  updatedByArr: any[] = [];
  ticketType: any;
  status: any;
  assignedBy: any;
  updatedBy: any;
  agentRemarks: any;
  updateDisable: boolean = true;
  replyTemplates: any;
  uploadedFiles: any[] = [];
  ticketHistoryDialog: boolean = false;
  noOfTables: any[] = [];
  selectedRowRes: any;

  // ticket variables use for historu and update
  showDynaTicketCard: boolean = false;
  formFields: any[] = [];
  customForm: FormGroup;
  getDynamicFormFieldsCache: any;
  phoneDataa: any;
  phoneid: any
  newVariableFalseTrueCheck: boolean = environment.newVariableFalseTrueCheck
  phoneData: any;
  // for ticket
  abc: any = [];
  myValueDetails: any
  getUdatedDialogData: boolean = false
  showUpdateButton: boolean = false;
  showSaveButton: boolean = false;
  showTicketCard: boolean = false;
  selectedAssignedBy: any;
  disabledTicketFields: boolean = true;
  ticketRecords: any = [];
  voicefile: any;
  ticketNo: any; ticketCampaignName: any; actionNo: any; ticketDuration: any;
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
  schoolCodeValue: any
  schoolNameValue: any
  districtValue: any
  blockNameValue: any
  problemReportedValue: any
  ticketTypeHistory: any = [];
  historyDialogBox: boolean = false;
  ticketID: any;
  sourceName: any;
  ticketTime: any;
  arrObj: number[] = new Array(1);
  callID: any;
  ticketValue: any
  ticketSaved: boolean = false;
  valueSaveTrue: boolean = false;
  selectedAssignedTo: any;
  ticketEnable: boolean = false;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private fbService: FBserviceService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef, private fb: FormBuilder) {
      this.customForm = this.fb.group({
      
      });
      this.ticketForm = this.fb.group({

      });
    this.activatedRoute.url.subscribe(url => {
      this.deletedPost = url[0]?.path == 'deleted-post';
      this.inboxPost = url[0]?.path == 'inbox-post';
      this.queuePost = url[0]?.path == 'queue-post';
      this.outboxPost = url[0]?.path == 'outbox-post';
      this.sentPost = url[0]?.path == 'sent-post';
    });
  }


  ngOnInit(): void {
    this.loginResData();
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
    }
  }

  selectRow(fbPost) {


    let data = {
      loginUserID: this.agentid,
      campID: this.campid,
      userType: this.userType,
      selectedFacebookInboxRecord: fbPost
    }

    this.fbService.onRowFBSelectInbox(data).subscribe((res: any) => {

      if (res.status == 'success') {
        this.selectedRowRes = res
        this.replyAccountDialog = true;
        this.listFacebookThread = res.selectedFacebookInboxRecord;
        // this.listFacebookThread = JSON.parse(res.listFacebookThread);
        // this.listFacebookThread.forEach((element: any) => {


        //   this.fromAccount.push(
        //     { label: element.loginSocialMediaUser }
        //   )
        //   this.selectedAccount = element.loginSocialMediaUser
        //   this.toAccount.push(
        //     { label: element.socialMediaUserScreenName }
        //   )
        //   this.to = element.socialMediaUserScreenName
        // })

        this.listTicketRecords = res.listTicketRecords;
        this.listTicketRecords.forEach((element: any) => {

          this.statusArr = element.listTicketStatus; // status 

          this.ticketTypeArr = element.listTicketTypes; // ticket type
          this.agentRemarks = element.remarks; // agent remarks

          // const ticketData = JSON.parse(res.selectedFacebookInboxRecord);


          // // assigned by
          // this.assignedArr.push(
          //   { AssignedBy: ticketData.assignToID }
          // )
          // this.assignedBy = ticketData.assignToID;
          this.cdr.detectChanges();
        })
      }
    }, err => {

    })
  }

  selectAssignRow(selected: any) {


    let data = {
      accountID: selected.accountID,
      rowID: selected.inboxRowID,
      loginUserID: this.agentid
    }

    this.fbService.assignFBPost(data).subscribe((res: any) => {

      if (res.status == 'Success') {
        this.messageService.add({ severity: 'info', summary: '', detail: 'Facebook Post Assigned Successfully' });
      }
    }, err => {

    })
  }

  onRowSelect(mail_id) { }

  onReload() { }



  sendReply(json) {
    let data = {
      loginUserID: this.agentid,
      campID: this.campid,
      userType: this.userType,
      comment: true,
      selectedFacebookInboxRecord: {
        ...json,
        text: this.replyTemplates,
        socialMediaMsgID:  this.listFacebookThread.socialMediaMsgID
      }
    }

    this.fbService.saveFBData(data).subscribe((res: any) => {

      if (res.status == "Success") {
        this.replyAccountDialog = false;
        this.tempSection = false;
      }
      this.messageService.add({ severity: 'info', summary: '', detail: res.value });
    }, err => {

    })
  }

  replyField() {
    this.tempSection = this.tempSection ? false : true;
  }

  update() {
    if (this.updateDisable) {
      this.updateDisable = false;
      this.updatedValue = 'Save';
      this.messageService.add({ severity: 'info', summary: '', detail: 'Ticket Changed to update mode' });
    } else {
      let selectedRowRes = JSON.parse(this.selectedRowRes.listTicketRecords)

      // during the save time if the api hits for more that 1 time then remove forEach and use [0].
      selectedRowRes.forEach((element: any) => {
        let ticket_Time = element.ticket_Time;
        let start_Time = element.start_Time;
        let ticketID = element.ticketID;
        let phoneID = element.phoneID;
        let campName = element.campName;
        let action_No = element.action_No;
        let source_ID = element.source_ID
        let ticketTime = element.ticketTime;

        const parsedDate1 = new Date(ticket_Time);
        const formattedDate1 = this.datePipe.transform(parsedDate1, 'yyyy-MM-dd HH:mm:ss.S');


        const parsedDate2 = new Date(start_Time);
        const formattedDate2 = this.datePipe.transform(parsedDate2, 'yyyy-MM-dd HH:mm:ss.S');



        let data = {
          loginUserID: this.agentid,
          userType: this.userType,
          campID: this.campid,
          ticketID: ticketID,
          phoneID: phoneID,
          // sourceName: this.sourceName,
          sourceName: 'Facebook',
          campName: campName,
          action_No: action_No,
          ticket_Time: formattedDate1,
          ticketTime: ticketTime,
          assignedByID: this.assignedBy.AssignedBy,
          ticket_TypeID: this.ticketType,
          ticket_statusID: this.status,
          remarks: this.agentRemarks,
          ticketStartTime: formattedDate2,
          source_ID: source_ID,
          // source_Type: this.source_Type
          source_Type: "4"
        }

        this.fbService.saveTickets(data).subscribe((res: any) => {

          this.messageService.add({ severity: 'info', summary: '', detail: res.value });
        })
      })
    }
  }

  uploadHandler(event: any) { }

  onUpload(event: any) { }

  ticketHistoryAdd(campID, ticketID) {
    this.fbService.loadTicketHistoryRecords(campID, ticketID).subscribe((res: any) => {

      this.noOfTables = res.value;
      this.ticketHistoryDialog = true;
    }, err => {

    })
  }


  // ticket code 

  ticketHistory(data1) {
    this.noOfTables = [];

    let data = {
      campID: this.loginData.value[0].campid,
      ticketID: data1.ticketid ? data1.ticketid : data1.ticketID
    }


    this.fbService.getTicketHistory(data).subscribe((res: any) => {

      this.noOfTables = res.value;


    }, err => {

    })
    this.ticketHistoryDialog = true;
    this.getDynamicFormFields()
  }
  ticketHistory1(data1) {
    this.noOfTables = [];

    let data = {
      campID: this.loginData.value[0].campid,
      ticketID: data1
    }


    this.fbService.getTicketHistory(data).subscribe((res: any) => {

      this.noOfTables = res.value;


    }, err => {

    })
    this.ticketHistoryDialog = true;
    this.getDynamicFormFields()
  }
  getDynamicFormFields() {
    if (sessionStorage.getItem("getDynamicFormFieldsCache") && JSON.parse(sessionStorage.getItem("getDynamicFormFieldsCache")).campid == this.loginData.value[0].campid) {
      this.formFields = JSON.parse(sessionStorage.getItem("getDynamicFormFieldsCache")).data;
      const formGroupControls = {};
      this.getDynamicLeadCustField();
      for (const field of this.formFields) {
        formGroupControls[field.fld_FieldName] = [field.value || ''];
      }
      this.customForm = this.fb.group(formGroupControls);

    } else {
      let payLoad = {
        "campid": this.loginData.value[0].campid,
      }
      this.fbService.getFormFields(payLoad).subscribe(
        (data: FormField) => {

          data = data['value'];
          let formFields = Object.values(data);
          this.formFields = formFields.sort((a, b) => a.reportDisplaySeqNo - b.reportDisplaySeqNo);
          this.getDynamicFormFieldsCache = {
            "campid": this.loginData.value[0].campid,
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
        "campid": this.loginData.value[0].campid,
        "phoneid": this.phoneid,
        "mode": "1",
        // "fld_phoneno": sessionStorage.getItem('phnno'),
        // "sourceType": "3" 
      }
      this.fbService.getLeadCustField(payLoad).subscribe(
        async (data) => {
          const parsedData = JSON.parse(data['value']);
          this.phoneDataa = parsedData

          if (parsedData.status == 'success') {
            this.phoneid = '';
            this.phoneid = parsedData.phoneid; // added for incoming.
            let ticketId;
            let ticketData = {
              campid: this.loginData.value[0].campid,
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

  formatPhoneNumber(phoneNumber: any): any {
    const visibleDigits = 3;
    const visiblePart = phoneNumber.substring(phoneNumber.length - visibleDigits);
    const hiddenPart = '*'.repeat(phoneNumber.length - visibleDigits);
    return hiddenPart + visiblePart;
  }
  // new ticket creation details all
  newTicket(val) {
    this.myValueDetails = val
    this.getDynamicFormFields();
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
  newHistoryVariable: boolean = false
  ticketHistoryNew(value) {
    this.newHistoryVariable = true
    let ticketData = {
      ticketid:value.fld_TicketID ? value.fld_TicketID : value.fld_ticketid ,
      campid: this.loginData.value[0].campid,
      // custid: this.phoneid
    }

    this.getTicketInformation(ticketData);
    this.ticketHistoryDialog = true
    this.getDynamicFormFields();
  }
  async getTicketInformation(ticketData) {
    const res = await this.fbService.getTicketInfo(JSON.stringify(ticketData)).toPromise();
    if (res.status == "Success") {
      this.showTicketCard = true;
      this.showSaveButton = false;
      this.showUpdateButton = true;
      this.disabledTicketFields = true;
      this.ticketRecordsValueComman = res.ticketRecords
      if (this.newHistoryVariable) {
        this.noOfTables = this.ticketRecordsValueComman
      }
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
    this.fbService.getTicketType(this.loginData.value[0].campid).subscribe((res: any) => {
      this.ticketTypeDropdownData[0] = res;
      this.cdr.detectChanges();
    })
  }

  getTicketStatus() {
    let data = {};
    this.fbService.getTicketStatus(data).subscribe((res: any) => {
      this.ticketStatusDropdownData = res;
      this.cdr.detectChanges();
    })
  }
  updatedTicketType: any;
  updatedticketTypeDropdownData: any;
  ticketTypeDropdown(i: number) {
    let DynaTicketData;
    const campID = this.loginData.value[0].campid;
    const ticketTypeID = this.selectedTicketType[i];
    this.updatedTicketType = this.selectedTicketType[i]; // added this to get updated dropdown for dispid


    for (let j = i + 1; j < this.arrObj.length; j++) {
      this.ticketTypeDropdownData[j] = [];
    }
    this.arrObj.splice(i + 1);

    if (ticketTypeID) {
      this.fbService.getNextTicketType(campID, ticketTypeID).subscribe((res: any) => {

        this.tree = res.tree;
        if (res.listTicketTypes != 'No Record Found') {
          this.arrObj.push(res.listTicketTypes[0]);
          this.ticketTypeDropdownData[i + 1] = res.listTicketTypes;
          this.updatedticketTypeDropdownData = res.listTicketTypes; // added this to get updated dropdown for dispid
        }
        this.fbService.getDynaTicket(JSON.stringify(DynaTicketData = { campid: campID, ticketTypeID: ticketTypeID })).subscribe((res: any) => {
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
    this.fbService.getTicketHistoryData(this.loginData.value[0].campid, this.ticketNo).subscribe((res: any) => {
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
      this.ticketRecords.source_Type = 4;
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
      source_ID: (this.myValueDetails && this.myValueDetails.socialMediaMsgID) ? this.myValueDetails.socialMediaMsgID : this.ticketValue.source_ID,
      fld_Source_Value: (this.myValueDetails && this.myValueDetails.socialMediaUserScreenName) ? this.myValueDetails.socialMediaUserScreenName : this.ticketValue.fld_Source_Value,
      // source_ID: this.accountDropdown[0].label,
      // fld_Source_Value: this.ticketRecords.fld_Source_Value,
      // call_Time: this.ticketRecords.call_Time,
      ticket_closureID: this.ticketRecords.ticket_closureID,
      loginUserID: this.agentid,
      userType: 3,
      campID: this.loginData.value[0].campid,
      ticketID: this.ticketNo,
      sourceName: "Facebook",
      campName: this.ticketCampaignName,
      action_No: this.actionNo,
      ticket_Time: this.ticketTime,
      ticketTime: this.ticketDuration,
      assignedByID: this.selectedAssignedBy,
      ticket_statusID: this.selectedticketStatus,
      remarks: this.agentRemarks,
      ticket_TypeID: this.ticketTypeIDdd,
      refvalue: (this.myValueDetails && this.myValueDetails.inboxRowID) ? this.myValueDetails.inboxRowID : this.ticketValue.refvalue
      // dynaticketfieldsValues: dynaticketfieldsValues,
      // callInvokeID: this.callinvid,
      // csvoicefile: callRecording
    }



    // this.onUpdateForm((result) => {
    //     if (result === 'Success') {
    this.fbService.saveTicketData(JSON.stringify(saveData)).subscribe((res: any) => {
      this.ticketSaved = true;
      if (res.status == 'Success') {
        this.messageService.add({ summary: 'info', severity: 'info', detail: 'Your Tickets information saved successfully' });
        this.ticketNo = res.ticketID;

        // enabling disable button
        // this.disposeCall = false;

        let ticketData = {
          ticketid: this.ticketNo,
          campid: this.loginData.value[0].campid,
          // custid: this.phoneid
        }

        this.getTicketInformation(ticketData);
        this.fbService.getTicketHistoryData(this.loginData.value[0].campid, this.ticketNo).subscribe((res: any) => {
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
      "campid": this.loginData.value[0].campid,
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
    this.fbService.getLeadCustField(newObj).subscribe(
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


  closeDetailsTicket() {
    this.newTicketFlag = false
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
      "campid": this.loginData.value[0].campid,
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
    this.fbService.getLeadCustField(newObj).subscribe(
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
  ticketOpen(value) {
    this.getDynamicFormFields();
    this.ticketValue = value
    if (this.ticketValue.ticketID != 0) {
      this.getUdatedDialogData = true
      // this.newTicketValueOPenT = true
      // let ticketData = {
      //   ticketid: this.ticketValue.ticketid,
      //   campid: this.campid,
      //   // custid: this.phoneid
      // }
      let ticketd = this.ticketValue.ticketID ? this.ticketValue.ticketID : this.ticketValue.ticketID
      // // this.getTicketInformation(ticketData);

      //   let ticketData = {
      //     ticketid: ticketd,
      //     campid: this.campid,
      //     // custid: this.phoneid
      // }

      // this.getTicketInformation(ticketData);
      this.fbService.getTicketHistoryData(this.loginData.value[0].campid, ticketd).subscribe((res: any) => {
        this.ticketTypeHistory = res.value;
        this.showTicketCard = true;
        this.showSaveButton = false;
        this.showUpdateButton = true;
        this.disabledTicketFields = true;
        this.getTicketStatus();
        this.getTicketTypeData();
        if (this.ticketTypeHistory) {
          this.ticketRecords = res.value[0];
          // voice file

          this.phoneid = (this.ticketRecords && this.ticketRecords.phoneID) ? this.ticketRecords.phoneID : this.ticketValue.phoneID
          this.ticketNo = this.ticketValue.ticketid ? this.ticketValue.ticketid : this.ticketValue.ticketID;
          this.sourceName = (this.ticketRecords && this.ticketRecords.sourceName) ? this.ticketRecords.sourceName : this.ticketValue.sourceName,
            //   this.source_Type =  this.ticketRecords.source_Type,
            this.ticketCampaignName = (this.ticketRecords && this.ticketRecords.campName) ? this.ticketRecords.campName : this.ticketValue.campName;
          this.actionNo = this.ticketRecords.action_No ? this.ticketRecords.action_No : this.ticketValue.action_No;
          this.ticketTime = this.ticketRecords.ticket_Time ? this.ticketRecords.ticket_Time : this.ticketValue.ticket_Time;
          this.ticketDuration = this.ticketRecords.ticketTime ? this.ticketRecords.ticketTime : this.ticketValue.ticketTime;
          this.selectedAssignedBy = this.ticketRecords.assignedByID ? this.ticketRecords.assignedByID : this.ticketValue.assignedByID;
          this.selectedticketStatus = this.ticketRecords.ticket_statusID ? this.ticketRecords.ticket_statusID : this.ticketValue.ticket_statusID;

          this.agentRemarks = this.ticketRecords.remarks ? this.ticketRecords.remarks : this.ticketValue.remarks;
          this.ticketTypeDropdownData[0] = this.ticketRecords.listTicketTypes ? this.ticketRecords.listTicketTypes : this.ticketValue.listTicketTypes; // for multi level dropdown
          // 
          this.selectedTicketType[0] = this.ticketRecords.ticket_TypeID ? this.ticketRecords.ticket_TypeID : this.ticketValue.ticket_TypeID; // for multi level dropdown

          this.ticketID = this.ticketValue.ticketid ? this.ticketValue.ticketid : this.ticketValue.ticketID; // by rajat
          if (this.phoneid) {
            this.getDynamicLeadCustField();
          }
          this.voicefile = (res.value[0] && res.value[0].voicefile) ? res.value[0].voicefile : this.ticketValue.voicefile;
        }
      });

    } else {
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
}
