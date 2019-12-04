// Angular

import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
} from "@angular/material";


import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DesignCreatorComponent } from "./ngx-design-creator.component";

import { AppLoaderComponent } from './loaders/loader.component';
import { MatReduceModule } from 'mat-reduce';

const sharedComponents = [DesignCreatorComponent];

@NgModule({
  declarations: [
    AppLoaderComponent,
    ...sharedComponents,
  ],
  exports: sharedComponents,
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    CommonModule,
    MatReduceModule,
    RouterModule
  ]
})
export class DesignCreatorModule {}
