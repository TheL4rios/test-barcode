import { Component, ChangeDetectorRef } from '@angular/core';
import Quagga from '@ericblade/quagga2';
import { Html5QrcodeScanner } from 'html5-qrcode';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  code = '';

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.prepareQuagga();
  }

  async prepareQuagga() {
    const html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 }, undefined);
    html5QrcodeScanner.render(this.onScanSuccess, () => console.log('error'));
  }

  onScanSuccess(decodedText, decodedResult) {
    this.code = decodedText;
    console.log(`Code scanned = ${decodedText}`, decodedResult);
  }
}


