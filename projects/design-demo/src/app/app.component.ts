import { Component, OnInit } from "@angular/core";
import { DesignCreatorConfig } from "projects/ngx-design-creator/src/public_api";




@Component({
  selector: "app-root",
  template: `
    <div style="text-align:center">
     ngx-design-creator testing.
    </div>
    <ngx-design-creator>
    </ngx-design-creator>
  `
})
export class AppComponent implements OnInit {
  config: DesignCreatorConfig<any>;


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

  async ngOnInit() {
    await this.fakeDelay(1000);
    // await this.fakeDelay(400000);
    this.config = {
     active: true
    };
  }


}
