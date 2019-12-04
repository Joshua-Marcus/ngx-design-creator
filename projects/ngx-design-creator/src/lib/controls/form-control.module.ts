import { NgModule } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { LibFormColorComponent } from './form-color.component';
import { CommonModule } from '@angular/common';


const exportedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
];

const exported = [
  LibFormColorComponent,
];

@NgModule({
  imports: [
    ...exportedModules,
    CommonModule,
    ColorPickerModule,
  ],
  exports: [...exported, ...exportedModules],
  declarations: [...exported],
  providers: []
})
export class MatReduceFormsUsing3rdPartyModule {}
