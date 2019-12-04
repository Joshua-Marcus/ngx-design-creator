import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBase } from './form-base';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-color',
  template: `
    <mat-form-field [appearance]="appearance" class="full-width m-top">
      <span [class.txt-grey]="disabled">
        {{ placeholder }}
      </span>
      <input
        matInput
        [hidden]="true"
        [formControl]="internalControl"
        [name]="autoCompleteObscureName"
        autocomplete="dontcompleteme"
      />
      <mat-card
        *ngIf="!disabled"
        [cpOutputFormat]="'hex'"
        class="box has-pointer"
        [style.background]="value"
        [(colorPicker)]="value"
        [cpPosition]="'top'"
      >
        <div class="flex-space-between">
          <span>
            {{ value ? value : 'click to pick color' }}
          </span>
          <button
            mat-mini-fab
            (click)="onClickClear($event)"
            [disabled]="disabled"
            matTooltip="Clear current color"
            class="bg-white close-btn"
          >
            <mat-icon class="txt-black">
              clear
            </mat-icon>
          </button>
        </div>
      </mat-card>
      <mat-card
        *ngIf="disabled"
        class="box"
        [style.background]="value"
      >
        <div class="flex-space-between">
          <span>
            {{ value ? value : 'click to pick color' }}
          </span>
          <span>
          </span>
        </div>
      </mat-card>
    </mat-form-field>
  `,
  styles: [
    `
      .close-btn {
        position: absolute;
        right: -4px;
        top: -4px;
        transform: scale(0.6);
      }
      .m-top {
        margin-top: -20px;
      }
      .bg-white {
        background-color: white !important;
      }
      .txt-black {
        color: black;
      }
      .txt-grey {
        color: grey;
      }
      .full-width {
        width: 100%;
      }
      .box {
        max-width: 200px;
      }
      .has-pointer {
        cursor: pointer;
      }
      .flex-space-between {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LibFormColorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LibFormColorComponent),
      multi: true
    }
  ]
})
export class LibFormColorComponent extends FormBase<string> implements OnInit {
  @Input()
  defaultColor = '#42d742';

  ngOnInit() {
    if (!this.value) {
      setTimeout(() => {
        this.value = this.defaultColor;
      });
    }
  }

  onClickClear(e: Event) {
    e.stopPropagation();
    this.value = '';
  }
}