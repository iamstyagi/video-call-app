import { Component, OnInit } from '@angular/core';
import { WebChatService } from '../web-chat-service/web-chat.service';

@Component({
  selector: 'app-web-chat-sidebar',
  templateUrl: './web-chat-sidebar.component.html',
  styleUrls: ['./web-chat-sidebar.component.scss']
})
export class WebChatSidebarComponent implements OnInit {
  nofificationDetailsArray:any[] = []
  constructor(private service: WebChatService) { }
  searchValue:any
  nofitifcationData:any
  ngOnInit(): void {
  }

}
