import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { QrCodeService } from '../qr-code.service';
import { SessionIdService } from '../session-id.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-web-gateway',
  templateUrl: './web-gateway.component.html',
  styleUrls: ['./web-gateway.component.css']
})
export class WebGatewayComponent implements OnInit {
  webOrApp: string = 'jxIMqe416ulhwa2yrfMg7g==';
  qrCodeValue: string = 'User Specific Value';
  qrDataUrl: string;
  showQRCode: boolean = false;
  isLoading = true;

  //webconfig
  t14_web_app_id: string;
  t14_web_app_name: string = "WebBrowser";
  t14_os_version: string;
  t14_os_type: string;
  t14_web_app_type: string;
  t14_web_app_version: string = '1.0.0';
  userAgent: string = '';
  osType: string = '';
  osVersion: string = '';
  browserName: string;
  browserVersion: string;
  nameApplication: any;
  deviceId: string;
  browser: string;
  displayErrorMessage: boolean = true;
  userAgentInfo: { osType: string, osVersion: string };
  chromeVersion: { browserName: string, browserVersion: string };
  BrowserName: string;

  constructor(private ds: DataService, private qrcode: QrCodeService, private sessionId: SessionIdService, private deviceService: DeviceDetectorService) {
    this.browserName = this.deviceService.browser;
    this.browserVersion = this.deviceService.browserVersion;
    this.userAgentInfo = this.parseUserAgent(navigator.userAgent);
    this.t14_os_type = this.userAgentInfo.osVersion;
    this.t14_os_version = this.userAgentInfo.osType;
    this.chromeVersion = this.getBrowserInfo(navigator.userAgent);
    this.t14_web_app_type = this.browserName;
    // this.t14_web_app_version = this.browserVersion;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
    this.ds.generateQrCode(this.webOrApp).subscribe({
      next: (response) => {
        this.qrCodeValue = JSON.parse(response).data[0].qr_token;
        const TimeExpire = JSON.parse(response).data[1].tokenTime;
        console.log(TimeExpire);
        console.log(this.qrCodeValue);
        this.qrcode.generateQr(this.qrCodeValue).then((dataUrl) => {
          this.qrDataUrl = (dataUrl);
        });
      }
    })

    this.t14_web_app_id = this.sessionId.getUniqueId();
    this.parseUserAgent(this.userAgent);
    this.userAgent = window.navigator.userAgent
    if (this.userAgent.indexOf('win') !== -1) {
      this.osType = 'windows';
    } else if (this.userAgent.indexOf('mac') !== -1) {
      this.osType = 'Macintosh'
    } else if (this.userAgent.indexOf('Linux') !== -1) {
      this.osType = 'Linux'
    } else {
      this.osType = 'Unknown';
    }
    console.log(this.userAgent)
    this.webConfigurationDetails();
  }

  webConfigurationDetails() {
    const sessionId = new Date().getTime().toString();
    if (!sessionStorage.getItem('sessionId')) {
      this.ds.webConfiguration(this.t14_web_app_id, this.t14_web_app_name, this.t14_os_version, this.t14_os_type, this.t14_web_app_type, this.t14_web_app_version).subscribe({
        next: (response) => {
          this.deviceId = response.data[0].idEncy;
          localStorage.setItem('deviceId', this.deviceId)
        }
      })
      sessionStorage.setItem('sessionId', sessionId);
    }
  }

  parseUserAgent(userAgent: string): { osType: string, osVersion: string } {
    let osType = 'UnknownType';
    let osVersion = 'UnknownVersion';
    const osPartMatch = userAgent.match(/\(([^)]+)\)/);
    let osPart;

    if (osPartMatch) {
      osPart = osPartMatch[1];
    }
    if (osPart && osPart.includes('Windows')) {
      osType = 'Windows';
      const versionMatch = osPart.match(/Windows NT (\d+\.\d+)/);
      if (versionMatch) {
        osVersion = versionMatch[1];
      }
    }
    return { osType, osVersion };
  }

  getBrowserInfo(userAgent): { browserName: string, browserVersion: string } {
    const chromeRegex = /Chrome\/([\d.]+)/;
    let browserName = 'UnknownName';
    let browserVersion = 'UnknownVersion'
    const chromeMatch = userAgent.match(chromeRegex);
    if (chromeMatch) {
      browserName = 'Chrome';
      browserVersion = chromeMatch[1];
    }
    return { browserName, browserVersion }
  }

}


