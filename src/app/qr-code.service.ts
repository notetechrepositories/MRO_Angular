import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode';
@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
  async generateQr(data: string): Promise<string> {
    try {
      return await QRCode.toDataURL(data);
    } catch (err) {
      console.error('Error generating QR code:', err);
      return '';
    }
  }
}
