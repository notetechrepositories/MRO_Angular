import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  user: any = {};
  userData: any = {};
  constructor(private http: HttpClient) { }
  ngOnInit(){
    
  }
  webConfiguration(t14_web_app_id: string, t14_web_app_name: string, t14_os_type: string, t13_os_version: string,
    t14_web_app_type: string, t14_web_app_version: string) {
    const dataurl = `${environment.baseApiUrl}common/get`;
    const webConfig = {
      data: {
        t14_web_app_id: t14_web_app_id,
        t14_web_app_name: t14_web_app_name,
        t14_os_type: t14_os_type,
        t14_os_version: t13_os_version,
        t14_web_app_type: t14_web_app_type,
        t14_web_app_version: t14_web_app_version
      },
      action: "add",
      fakeName: "device",
      programId: "0"
    }
    return this.http.post<any>(dataurl, webConfig);
  }

  postUser(mobileNumber: string, pin: string, webOrApp: string, deviceId: string) {
    const dataurl = `${environment.baseApiUrl}Mro/login`;
    const loginRequest = {
      mobileNumber: mobileNumber,
      webOrApp: webOrApp,
      pin: pin,
      deviceId: deviceId,
      otpVarification: "VBPvNcURiK16xnV8ZKuz8g=="

    };
    return this.http.post<any>(dataurl, loginRequest, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')!
      }
    });
  }

  //return this.http.post<any>(dataurl, loginRequest,{headers:{authentication:localStorage.getItem("token")!}});
  getUserDetails(id_t5_m_users: string, action: string, fakeName: string, programId: string) {
    const dataurl = `${environment.baseApiUrl}common/get`;
    const userRequest = {
      data: {
        id_t5_m_users: id_t5_m_users,
      },
      action: action,
      fakeName: 'profile',
      programId: programId
    }
    return this.http.post<any>(dataurl, userRequest);
  }
  updateUserProfileDetails(userDetails: any, action: string, fakeName: string, programId: string,) {
    const dataurl = `${environment.baseApiUrl}common/get`;
    const requestBody = {
      data: userDetails,
      action: "edit",
      fakeName: "profile",
      programId: 0
    }
    return this.http.post<any>(dataurl, requestBody);
  }


  getMenu(userId: string, webOrApp: string, action: string, fakeName: string, programId: string): Observable<any> {
    const dataurl = `${environment.baseApiUrl}common/get`;
    const requestBody = {
      data: {
        userId: userId,
        webOrApp: webOrApp
      },
      action: action,
      fakeName: fakeName,
      programId: programId
    };

    return this.http.post<any>(dataurl, requestBody);
  }
  getOtp(mobilenumber: string) {
    const dataurl = `${environment.baseApiUrl}common/email`;
    const requestBody =
    {
      data: {
        mobileNumber: mobilenumber,
        "webOrApp": "jxIMqe416ulhwa2yrfMg7g=="
      },
      action: "view",
      fakeName: "pinChange",
      programId: "0"
    }
    return this.http.post<any>(dataurl, requestBody).pipe(
      tap((response) => {
        if (response.status == 200) {
          const { encryptedData, time, email } = response.data;

          var data = localStorage.setItem('encryptedData', encryptedData);


          localStorage.setItem('time', time)
          localStorage.setItem('email', email)



          setTimeout(() => {
            localStorage.removeItem('encryptedData')
            localStorage.removeItem('time')
            localStorage.removeItem('email')
          }, 60000);



        }
        else {

        }
      })
    );

  }

  getOtpVerification(encryptedData: string, otp: string) {
    const dataurl = `${environment.baseApiUrl}common/otpVerification`;
    const requestBody =
    {
      encryptedData: encryptedData,
      otp: otp
    }
    return this.http.post(dataurl, requestBody, { responseType: 'text' });
  }
  userPinUpdate(mobileNumber: string, pin: string) {
    const dataurl = `${environment.baseApiUrl}common/get`;
    const requestBody = {

      data: {
        mobileNumber: mobileNumber,
        webOrApp: "jxIMqe416ulhwa2yrfMg7g==",
        pin: pin
      },
      action: "edit",
      fakeName: "pinChange",
      programId: "0"

    }
    return this.http.post<any>(dataurl, requestBody);
  }
  getAllOffice(userId: string,programId:string): Observable<any> {
    const dataurl = `${environment.baseApiUrl}common/get`;
    const requestBody = {
      data: {
        userId: userId,
        webOrApp:  "jxIMqe416ulhwa2yrfMg7g=="
      },
      action: "view",
      fakeName:  "",
      programId: programId
    };
console.log(requestBody);

    return this.http.post<any>(dataurl, requestBody );
  }
  getOfficeUser(id_t6_2_m_office: string, action: string, fakeName: string, programId: string) {
    const dataurl = `${environment.baseApiUrl}common/get`;
    const requestBody = {
      data: {
        id_t6_2_m_office: id_t6_2_m_office
      },
      action: action,
      fakeName: fakeName,
      programId: programId
    }
    return this.http.post<any>(dataurl, requestBody);
  }
  getAboutUs(action: string, fakeName: string, programId: string) {
    const dataurl = `${environment.baseApiUrl}common/get`;
    const requestBody = {
      data: {
      },
      action: action,
      fakeName: fakeName,
      programId: programId
    }
    return this.http.post<any>(dataurl, requestBody);

  }

  updateUserDetails(userId: string, userDetails: any) {
    const requestBody = {
      data: {
        userId: userId,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        designationId: userDetails.designationId,
        officeId: userDetails.officeId,
        webOrApp: userDetails.webOrApp,
        address1: userDetails.address1,
        address_2: userDetails.address2,
        cityid: userDetails.cityId,
        usersReportFolder: userDetails.usersReportFolder,
        zipCode: userDetails.zipCode,
        mobileNumber: userDetails.mobileNumber,
        email: userDetails.email,
        updated_by: userDetails.updatedBy,
        profileImagePath: userDetails.profileImagePath
      },
      action: 'edit',
      fake_name: 'user',
      pgm_id: '0'
    };

    const updateUrl = `${environment.baseApiUrl}common/get`;
    return this.http.post<any>(updateUrl, requestBody);
  }

  postLogOut(userId: string, deviceId: string) {
    const dataurl = `${environment.baseApiUrl}common/delete`;
    const requestData = {
      data: {
        condition: {
          id_t5_m_users: userId,
          id_t14_web_app_configuration: deviceId,
          t18_web_app_type: "web"
        },
        updateAction: 0,
        updateActionValue: "n"
      },
      action: "delete",
      fakeName: "loginCheck",
      programId: "0"
    };

    return this.http.delete<any>(dataurl, { body: requestData });
  }
  generateQrCode(webOrApp: string) {
    const dataUrl = `${environment.baseApiUrl}common/get`;
    const requestData = {
      data: {
        webOrApp: webOrApp
      },
      action: "add",
      fakeName: "qr",
      programId: "0"
    }
    return this.http.post(dataUrl, requestData, { responseType: 'text' });
  }

}


