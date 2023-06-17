import { Component, ChangeDetectorRef } from '@angular/core';
import Quagga from '@ericblade/quagga2';


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
    // this.prepareQuagga();
  }

  async prepareQuagga(evt) {
    const base64 = await this.getBase64(evt);
// console.log(base64);

    Quagga.decodeSingle({
      decoder: {
          readers: ['code_128_reader'], // List of active readers,
      },
      locate: true, // try to locate the barcode in the image
      src: base64 as string // or 'data:image/jpg;base64,' + data
  }, (result) => {
    console.log(result);
    
      if(result.codeResult) {
          console.log("result", result.codeResult.code);
          this.code = result.codeResult.code as string;
      } else {
        this.code = 'no detected'
          console.log("not detected");
      }
  });
  }

  getBase64(event) {
    return new Promise((resolve) => {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        //me.modelvalue = reader.result;
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    })
    
 }
}


