import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DesignCreatorConfig } from '../public_api';

function blankConfig<T>(): DesignCreatorConfig<T> {
  return {
    active: true
  };
}


@Component({
  selector: 'ngx-design-creator',
  templateUrl: './ngx-design-creator.component.html',
  styleUrls: ['./ngx-design-creator.component.scss']
})
export class DesignCreatorComponent<T> implements OnInit, OnDestroy {
  private _blankConfig: DesignCreatorConfig<T> = blankConfig<T>();
  private _config: DesignCreatorConfig<T>;
  @Input()
  set config(newConfig) {
    this._config = newConfig;
    setTimeout(() => {
      this.ngOnInit();
    });
  }
  get config() {
    return this._config || this._blankConfig;
  }

  $onDestroyed = new Subject();

  reInitializeVariables() {

  }

  ngOnInit() {
    this.$onDestroyed.next();
    if (!this.config) {
      return;
    }
    this.reInitializeVariables();

  }

  ngOnDestroy() {
    this.$onDestroyed.next();
  }



}
