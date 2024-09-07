import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { BrToNewlinePipe } from '../br-to-newline.pipe';
import { RadioButtonModule } from 'primeng/radiobutton';
import { EditorModule } from 'primeng/editor';
import { WhatsappRoutingModule } from './whatsapp-routing.module';
import { WhatsappComponent } from './whatsapp.component';
import { WhatsappServiceService } from './service/whatsapp-service.service';
import { SharedService } from '../demo/service/shared.service';
import { LinkifyPipe } from './linkify.pipe';
import { ConfirmationService } from 'primeng/api';

import { CalendarModule } from 'primeng/calendar';
import { SpeedDialModule } from 'primeng/speeddial';
import {ChipModule} from 'primeng/chip';
import {ChipsModule} from 'primeng/chips';
import { ListboxModule } from 'primeng/listbox';
import { AudioRecordingService } from './service/audio-recording.service';
import { MailNewService } from './service/mail-new.service';
import { HtmlconverterPipe } from './htmlconverter.pipe';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { CheckboxModule } from 'primeng/checkbox';
import { SearchvaluePipe } from './searchvalue.pipe';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
@NgModule({
  declarations: [
    WhatsappComponent,
    LinkifyPipe,
    HtmlconverterPipe,
    SearchvaluePipe
  ],
  imports: [
    CommonModule,
    WhatsappRoutingModule,
    FormsModule,
    AvatarModule,
    InputTextModule,
    TableModule,
    TreeTableModule,
    ButtonModule,
    BadgeModule,
    OverlayPanelModule,
    RippleModule,
    FileUploadModule,
    ImageModule,
    DialogModule,
    DropdownModule,
    ToastModule,
    TooltipModule,
    RadioButtonModule,
    OverlayPanelModule,
    CalendarModule,
    ListboxModule,
    SpeedDialModule,
    EditorModule,
    ChipModule,
    ChipsModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputNumberModule,
    ConfirmPopupModule
  ],
  providers: [
    WhatsappServiceService,
    BrToNewlinePipe,
    SharedService,
    AudioRecordingService,
    MailNewService,
    ConfirmationService
  ]
})
export class WhatsappModule { }
