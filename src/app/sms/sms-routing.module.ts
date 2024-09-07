import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsComponent } from './sms.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewSmsComponent } from './new-sms/new-sms.component';
import { SmsBoxComponent } from './sms-box/sms-box.component';

const routes: Routes = [{ path: '', component: SmsComponent }];

@NgModule({
  // imports: [RouterModule.forChild(
  //   [
  //     { path: '', component: SmsComponent }
  //   ]
  // )],
  imports: [RouterModule.forChild([
    {
      path: '', component: SmsComponent, children: [
        { path: 'sms-sidebar', component: SidebarComponent },
        { path: 'new-sms', component: NewSmsComponent },
        { path: 'sms-box', component: SmsBoxComponent },

      ]
    }
  ])],
  exports: [RouterModule]
})
export class SmsRoutingModule { }
