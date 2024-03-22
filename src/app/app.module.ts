import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MasterComponent } from './master/master.component';
import { TransformersComponent } from './transformers/transformers.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuModule } from 'primeng/menu';
import { TimelineModule } from 'primeng/timeline';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TabMenuModule } from 'primeng/tabmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TreeSelectModule } from 'primeng/treeselect';
import { TableModule } from 'primeng/table';
import { SubmittedListComponent } from './transformers/submitted-list/submitted-list.component';
import { LoginNewComponent } from './login-new/login-new.component';
import { WebGatewayComponent } from './web-gateway/web-gateway.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonviewlistComponent } from './commonviewlist/commonviewlist.component';
import { CommonviewdetailsComponent } from './commonviewdetails/commonviewdetails.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { OfficedetailsComponent } from './officedetails/officedetails.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { AnimateModule } from 'primeng/animate';
import { MessagesModule } from 'primeng/messages';
import { CommonviewtableComponent } from './commonviewtable/commonviewtable.component';
import { PermissionComponent } from './permission/permission.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavBarComponent,
    UserProfileComponent,
    MasterComponent,
    TransformersComponent,
    AboutUsComponent,
    SubmittedListComponent,
    LoginNewComponent,
    WebGatewayComponent,
    ForgotpasswordComponent,
    CommonviewlistComponent,
    CommonviewdetailsComponent,
    UserdetailsComponent,
    OfficedetailsComponent,
    CommonviewtableComponent,
    PermissionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    MenuModule,
    TimelineModule,
    ToolbarModule,
    ButtonModule,
    ChartModule,
    TabViewModule,
    ToastModule,
    DropdownModule,
    TabMenuModule,
    BreadcrumbModule,
    CardModule,
    KeyFilterModule,
    DialogModule,
    ReactiveFormsModule,
    ConfirmPopupModule,
    TreeSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    RadioButtonModule,
    DeviceDetectorModule.forRoot(),
    ConfirmDialogModule,
    MessageModule,
    AnimateModule,
    MessagesModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
