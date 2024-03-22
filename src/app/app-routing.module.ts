import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MasterComponent } from './master/master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransformersComponent } from './transformers/transformers.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SubmittedListComponent } from './transformers/submitted-list/submitted-list.component';
import { LoginNewComponent } from './login-new/login-new.component';
import { WebGatewayComponent } from './web-gateway/web-gateway.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AuthguardGuard } from './authguard.guard';
import { Authguard2Guard } from './authguard2.guard';

import { CommonviewlistComponent } from './commonviewlist/commonviewlist.component';
import { CommonviewdetailsComponent } from './commonviewdetails/commonviewdetails.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { OfficedetailsComponent } from './officedetails/officedetails.component';
import { CommonviewtableComponent } from './commonviewtable/commonviewtable.component';
import { PermissionComponent } from './permission/permission.component';
const routes: Routes = [
  {
    path: '',
    component: WebGatewayComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'forgot',
    component: ForgotpasswordComponent,
  },

  {
    path: 'master',
    component: MasterComponent,
    canActivate: [Authguard2Guard],
    children: [

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
      },
     
      {
        path: 'aboutus',
        component: AboutUsComponent,
      },
      {
        path: 'commonviewlisttwo/:viewDetails',
        component: CommonviewtableComponent,
      },
      // {
      //   path: 'transformer/:viewDetails',
      //   component: TransformersComponent,
      // },
      {
        path: 'submitted-list',
        component: SubmittedListComponent
      },
      {
        path: 'permission/:viewDetails',
        component: PermissionComponent,
      },
      {
        path: 'commonviewlist/:viewDetails',
        component: CommonviewlistComponent
      },
      {
        path: 'Commonviewdetails/:create',
        component: CommonviewdetailsComponent
      },
      {
        path:'userdetails/:create',
        component:UserdetailsComponent
      },
      {
        path:'officedetails/:create',
        component:OfficedetailsComponent
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
