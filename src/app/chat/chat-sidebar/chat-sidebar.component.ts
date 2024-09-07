import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/demo/service/user';
import { ChatService } from '../service/chat.service';
import { DataSharingService } from '../service/shared/data-sharing.service';
import { MessageService } from 'primeng/api';
// import { Subscription } from 'rxjs';

@Component({
    selector: 'app-chat-sidebar',
    templateUrl: './chat-sidebar.component.html',
    styleUrls: ['./chat-sidebar.component.scss'],
    providers: [MessageService]
})
export class ChatSidebarComponent implements OnInit {

    searchValue: string = '91';
    users: User[] = [];
    filteredUsers: any[] = [];
    loginData: any;
    campid: any;
    userType: any;
    userDetails: any;
    agentid: any;
    newMobileNo: any;
    showSearch: boolean = false;
    showMobile: boolean = true;
    newNumberDialog: boolean = false;
    newNo: any = 91;
    selectTemplates: any[] = [];
    selectedTemplateValue: any;
    number: any;
    sendMessageWhatsapp: boolean = false;
    // chatcount:any = 10;

    constructor(
        private chatService: ChatService,
        private dataSharingService: DataSharingService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.loginResData();

        this.dataSharingService.receiveMobileNumber().subscribe((res: any) => {
            this.number = res;
            this.cdr.detectChanges();
        })

        this.dataSharingService.getChats().subscribe((res: any) => {
            this.sendMobile(this.number, '2');
        });

        let data = {
            LoginUserID: this.agentid,
            userType: this.userType,
            campID: this.campid,
            // campID: '96',
        }

        this.chatService.getChatData(data).then(data => {
            this.filteredUsers = data;
        });

        setInterval(() => {

            this.chatService.getChatData(data).then(data => {

                this.filteredUsers = data;
                this.filteredUsers.find((data: any) => {
                    if (this.number == data.phoneNumber) {
                        this.sendSession(data.inchat);
                    }
                })

            });
        }, 7000)
        this.dataSharingService.getOldChats().subscribe((res: any) => {
            this.sendMobile(this.number, res);
        })


        this.dataSharingService.getCloseChat().subscribe((res: any) => {
            if (res == 'close') {

                this.number = '';
                this.cdr.detectChanges();
            }
        })
    }

    filter() {
        const searchTerm = this.searchValue.toLowerCase().trim();
        let data = {
            LoginUserID: this.agentid,
            userType: this.userType,
            campID: this.campid,
            // campID: '96',
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

    loginResData() {
        this.loginData = JSON.parse((localStorage.getItem("loginData")));

        for (let i = 0; i < this.loginData['value'].length; i++) {
            this.campid = this.loginData['value'][i]['campid'];
            this.userType = this.loginData['value'][i]['userType'];
            this.agentid = sessionStorage.getItem('agentid');
        }
    }

    receiveMobileNo() {
        this.dataSharingService.receiveMobileNumber().subscribe((res: any) => {


            this.number = res;
            this.cdr.detectChanges();
        })
    }

    searchFromDB() {
        let data = {
            "phoneno": this.searchValue
        }

        this.chatService.searchFromDB(data).subscribe((res: any) => {
            if (res.status == 'Success') {
                this.sendMobile(res.value, '1');
            } else {
                this.dataSharingService.sendMobileNumber('');
                this.dataSharingService.sendEmptyChats();
                this.messageService.add({ severity: 'info', summary: "Phone Number not found", detail: '' });
            }
        }, err => {
        })
    }


    listChats: any[];
    lastRowid: any = '0';
    sendMobile(number, type) {
        if (type == '3') {
            this.lastRowid = this.listChats[0].rowid
        } else { }

        let data = {
            LoginUserID: this.agentid,
            userType: this.userType,
            campID: this.campid,
            // campID: '96',
            phoneno: number,
            chatcount: "10",
            loadtype: type,
            lastRowid: this.lastRowid,
            agentId: this.agentid
            // chatcount: this.chatcount
        }
        this.number = number;

        if (this.number) {
            this.chatService.getChatMessages(data).subscribe((res: any) => {


                if (res && res.data) {

                    if (this.number == '') {

                    } else {
                        if (type == "3") {
                            // to scroll up

                            if (res.data.length != 0) {
                                this.listChats.unshift(...res.data);
                            }
                            setTimeout(() => {
                                this.dataSharingService.sendMessage(this.listChats);
                            }, 1200)
                        }

                        if (type == '1') {
                            this.listChats = [];
                            this.listChats = res.data
                            setTimeout(() => {
                                this.dataSharingService.sendMessage(this.listChats);
                            }, 1200)
                        }

                        if (type == '2') {
                            if (res.data.length != 0) {
                                this.listChats.push(...res.data);
                            } else {
                            }

                            if (res.data1 && res.data1.length !== 0) {
                                let updatedChats = res.data1;
                                this.listChats.forEach((element: any, index: number) => {
                                    const updatedChatIndex = updatedChats.findIndex((item) => item.rowid === element.rowid);

                                    if (updatedChatIndex !== -1) {
                                        this.listChats[index] = updatedChats[updatedChatIndex];
                                    }
                                });
                            }

                            setTimeout(() => {
                                this.dataSharingService.sendMessage(this.listChats);
                            }, 1200)
                        }
                    }
                }
            });
        }

        this.dataSharingService.sendMobileNumber(number);

    }


    templatelang:any;
    newNumber() {
        let data = {
            "LoginUserID": this.agentid,
            "userType": this.userType,
            // "campID": "96"
            "campID": this.campid
        }
        this.chatService.loadWATemplate(data).subscribe((res: any) => {
            this.selectTemplates = res.data;
            if (this.selectTemplates.length == 1) {
                this.selectedTemplateValue = this.selectTemplates[0].tempName;
                this.templatelang = this.selectTemplates[0].languageCode;
            }
        })
        this.newNumberDialog = true;
    }

    sendNewMsg() {
        if (this.selectedTemplateValue) {
            this.selectTemplates.forEach((element: any) => {
                // 
                if (element.tempName == this.selectedTemplateValue) {
                    // 

                    let data: any = {
                        "LoginUserID": this.agentid,
                        "userType": this.userType,
                        "campID": this.campid,
                        "phoneno": this.newNo,
                        "sourcetype": "13",
                        "templatename": this.selectedTemplateValue,
                        // "templatelang": element.languageCode,
                        "isnewContact": "true",
                        "templatelang": this.templatelang
                    }


                    this.chatService.sendWhatsAppTemplate(data).subscribe((res: any) => {
                        if (res.status == 'Success') {
                            this.newNumberDialog = false;
                            this.newNo = '';
                            this.selectedTemplateValue = '';
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


    sendSession(session: any) {
        this.dataSharingService.sendSession(session);
    }

}
