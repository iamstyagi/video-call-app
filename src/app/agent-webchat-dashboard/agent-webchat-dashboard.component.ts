import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../demo/service/dashboard.service';

@Component({
  selector: 'app-agent-webchat-dashboard',
  templateUrl: './agent-webchat-dashboard.component.html',
  styleUrls: ['./agent-webchat-dashboard.component.scss']
})
export class AgentWebchatDashboardComponent implements OnInit {
  agentid = sessionStorage.getItem('agentId');
  dashboard:any
  constructor(private router:Router,private  dashboardService: DashboardService) { }
  
  ngOnInit(): void {
    if(this.agentid){
      this.getAgentDetails()
    }
  }
  // disposition without ticketing dashboard end
  backToBlankPage(){
    this.router.navigateByUrl('iCallMate-cCP/blank2')

  }
  getAgentDetails(){
    let data = {
      agentRowId : this.agentid
    }
    this.dashboardService.getWebCatDetailsAgentWise(data).subscribe((res)=>{
      if(res.data){
        this.dashboard = res.data[0]
      }
    })
  }

//   {
//     "userRowId": 0,
//     "campaignId": null,
//     "agentRowId": 0,
//     "totalSendMessages": 16,
//     "totalReceiveMessage": 10,
//     "totalDataInQueue": 3,
//     "totalNotSeenMessage": 0,
//     "totalSeenMessage": 3,
//     "totalFeedback": 0
// }
}
