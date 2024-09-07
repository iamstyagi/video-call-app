import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FBserviceService } from 'src/app/facebook/services/f-bservice.service';
import { FormField } from 'src/app/form-field';
import { environment } from 'src/environments/environment';



interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
interface assigendItem {
  name: string,
}

interface markItem {
  name: string,
}
@Component({
  selector: 'app-new-post-insta',
  templateUrl: './new-post-insta.component.html',
  styleUrls: ['./new-post-insta.component.scss']
})
export class NewPostInstaComponent implements OnInit {
  fromArr: any[] = [];
  text: any;
  fbPostTextArea: any;
  from: any;
  to: any;
  uploadedFiles: any[] = [];
  loginData: any;
  campid: any;
  userType: any;
  agentid: any;
  mediaUrlData: any

  // ticket variables declare
  ticketForm: FormGroup;
  subDistrictV: any;
  subBotValue: any;
  callID: any;
  date: Date = new Date();
  dispositionID;
  getDynamicFormFieldsCache: any;
  newVariableFalseTrueCheck: boolean = environment.newVariableFalseTrueCheck
  ticketNo: any; sourceName: any; ticketCampaignName: any; actionNo: any; ticketTime: any; ticketDuration: any;

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
  showDisposeButton: boolean;
  arrObj: number[] = new Array(1);
  historyDialogBox: boolean;
  ticketTypeHistory: any = [];
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
  // schl code values
  solutionValue;
feedbackValue;
remarksValue;
  schoolCodeValue:any
  schoolNameValue:any
  districtValue:any
  blockNameValue:any
  selctedSchoolCode:any[] = []
  mainValueGet:any
  filterValue:any
  getValueParakhBot:any[] = []
  disposeCall: boolean = true;
  selectedDisposeCall: any;
  problemReportedValue:any
  constructor(private messageService: MessageService, private fbService: FBserviceService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,

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
  }

  ngOnInit(): void {
    this.loginResData();
  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));


    this.campid = this.loginData.value[0].campid;
    this.userType = this.loginData.value[0].userType;
    this.agentid = sessionStorage.getItem('agentid');
    this.ticketEnable = this.loginData['value'][0]['ticketEnable'] != null ? this.loginData['value'][0]['ticketEnable'] : true;
    this.getUsername();
  }


  onUpload(event: any) {

    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  uploadHandler(file: any) {
    this.mediaUrlData = '';
    // this.fileName = file.files[0].name;
    this.fbService.uploadFile(file.files, this.campid).subscribe((res: any) => {
      this.mediaUrlData = res.MediaLink;
      if (res) {
        this.messageService.add({ severity: 'info', summary: res.status, detail: 'File Uploaded Successfully' });
        this.uploadedFiles = [];
        this.onUpload(file);
        // this.showRemove = false;
      }
      else {
        this.messageService.add({ severity: 'info', summary: res.status, detail: res.status });
      }

    })
  }


  trigger() {
    let element = document.getElementById('upload_file') as HTMLInputElement;
    element.click();
  }

  post() {
    let campId = {
      campID: this.campid
    }
    this.fbService.getFBDetails(campId).subscribe((res: any) => {

      let data = {
        "loginUserID": this.agentid,
        // "loginUserID": "1006",
        "userType": this.userType,
        "campID": this.campid,
        "objClsIGProperties": {
          "text": this.fbPostTextArea,
          "media_type": "5",
          "media_url": this.mediaUrlData,
          "username": this.acName,
          "fld_ticketid": 0
        }
      }
      this.fbService.saveInstaData(data).subscribe((res: any) => {
        if (res.status == 'success') {
          this.fbPostTextArea = '';
          this.mediaUrlData = '';
          this.uploadedFiles = [];
          // this.fileName = 'Choose';
          // this.showRemove = true;
          let xyz = document.getElementsByClassName("p-fileupload-row") as HTMLCollectionOf<HTMLElement> | null;
          for (let i = 0; i < xyz.length; i++) {
            xyz[i].style.display = 'none';
          }
          this.messageService.add({ severity: 'info', summary: res.Message, detail: res.Message });
    this.newTicketFlag = false;
        }
      }, err => {

      })


    }, err => {

    })

  }

  acName: any;
  getUsername() {
    this.fbService.getUsername(this.campid).subscribe((res: any) => {
      this.acName = res.data[0];
    })
  }

  newTicket() {
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


  async getTicketInformation(ticketData) {


    const res = await this.fbService.getTicketInfo(JSON.stringify(ticketData)).toPromise();
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
    this.fbService.getTicketType(this.campid).subscribe((res: any) => {
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
    const campID = this.campid;
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
    this.fbService.getTicketHistoryData(this.campid, this.ticketNo).subscribe((res: any) => {
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
      this.ticketRecords.source_Type = 9;
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
      source_ID: this.acName,
      // source_ID: this.accountDropdown[0].label,
      fld_Source_Value: this.ticketRecords.fld_Source_Value,
      // call_Time: this.ticketRecords.call_Time,
      ticket_closureID: this.ticketRecords.ticket_closureID,
      loginUserID: this.agentid,
      userType: 3,
      campID: this.campid,
      ticketID: this.ticketNo,
      sourceName: "Instagram",
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
    this.fbService.saveTicketData(JSON.stringify(saveData)).subscribe((res: any) => {
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
        this.fbService.getTicketHistoryData(this.campid, this.ticketNo).subscribe((res: any) => {
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
    this.fbService.getFormFields(payLoad).subscribe(
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
      this.fbService.getLeadCustField(payLoad).subscribe(
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
    this.fbService.getLeadCustField(newObj).subscribe(
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
}