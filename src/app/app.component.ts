import { Component, ChangeDetectorRef } from '@angular/core';
//@ts-ignore
import Quagga from 'quagga';


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

  prepareQuagga() {
    const quaggaConfig = {
      inputStream: {
        name: 'Live',
        target: '#quagga-area',
        constraints: {
          width: 200,
          height: 250,
          facingMode: 'environment'
        }
      },
      decoder: {
        readers: ['ean_reader']
      },
      locate: true,
      locator: { patchSize: 'large', halfSample: true },
      debug: false
    };

    Quagga.init(quaggaConfig, (err: any) => {
      if (err) {
        return console.log(err);
      }
      Quagga.start();
    });

    Quagga.onProcessed(() => {
      const drawingCanvas = Quagga.canvas.dom.overlay;
      drawingCanvas.style.display = 'none';
    });

    Quagga.onDetected((result: any) => {
      this.code = result.codeResult.code;
    });
  }

  ngOnDestroy(): void {
    Quagga.offProcessed();
    Quagga.offDetected();
    Quagga.stop();
  }
}
