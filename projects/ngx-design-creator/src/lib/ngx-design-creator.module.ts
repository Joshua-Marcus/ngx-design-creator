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
import { MatReduceFormsUsing3rdPartyModule } from "./controls/form-control.module";
import { FormsModule } from "@angular/forms";

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
    FormsModule,
    MatReduceFormsUsing3rdPartyModule,
    RouterModule
  ]
})
export class DesignCreatorModule {}
