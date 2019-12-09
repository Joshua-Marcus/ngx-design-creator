import { Component, OnInit } from "@angular/core";
import { DesignCreatorConfig } from "projects/ngx-design-creator/src/public_api";




@Component({
  selector: "app-root",
  template: `
    <div style="text-align:center">
     ngx-design-creator testing.
    </div>
    <ngx-design-creator (saveImage)="displayImage($event)">
    </ngx-design-creator>

    <div class="image-container" *ngIf="outputtedImage">
    <h3>Outputted Image</h3>
    <img [src]="outputtedImage" width="960px" height="540px"> 
    </div>
  `,
  styles: [`
  .image {
    border: 2px solid black;
  }
  
  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  `]
})
export class AppComponent implements OnInit {
  config: DesignCreatorConfig<any>;
  outputtedImage: string;


  constructor() {
  }

  async fakeDelay(ms: number) {
    console.log('fake delay: begin for: ' + ms + 'ms')
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('fake delay: end...')
        resolve();
      }, ms);
    })
  }

  displayImage($event) {
    this.outputtedImage = $event;
  }

  async ngOnInit() {
    await this.fakeDelay(1000);
    // await this.fakeDelay(400000);
    this.config = {
     active: true
    };
  }


}
