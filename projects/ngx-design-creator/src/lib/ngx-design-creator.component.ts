import { Component, OnInit, Input, OnDestroy, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { DesignCreatorConfig } from "../public_api";
import { fabric } from "fabric";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";

export interface Layer {
  object: fabric.Object;
  icon: string;
  name: string;
}

function blankConfig<T>(): DesignCreatorConfig<T> {
  return {
    active: true
  };
}

@Component({
  selector: "ngx-design-creator",
  templateUrl: "./ngx-design-creator.component.html",
  styleUrls: ["./ngx-design-creator.component.scss"]
})
export class DesignCreatorComponent<T> implements OnInit, OnDestroy {
  private _blankConfig: DesignCreatorConfig<T> = blankConfig<T>();
  private _config: DesignCreatorConfig<T>;
  @ViewChild("selectShapeDialog", { static: true }) selectShapeDialog;
  @ViewChild("selectColorDialog", { static: true }) selectColorDialog;

  canvas: fabric.Canvas;
  layers: Layer[];
  colorForm: FormGroup;
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

  constructor(private dialog: MatDialog) {}

  clearSelection() {}

  ngOnInit() {
    this.layers = [];
    this.$onDestroyed.next();
    if (!this.config) {
      return;
    }
    this.canvas = new fabric.Canvas("canvas");
    this.initForms();
  }

  initForms() {
    this.colorForm = new FormGroup({
      color: new FormControl("")
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    this.$onDestroyed.next();
  }

  deleteLayer(layer: Layer) {
    this.canvas.remove(layer.object);
    const index = this.layers.findIndex(obj => obj.name === obj.name);
    this.layers.splice(index, 1);
  }

  addImage(inputValue) {
    // Read image valud and add object to fabric canvas.
    const file: File = inputValue[0];
    const reader: FileReader = new FileReader();
    reader.onload = event => {
      const imgObj = new Image();
      imgObj.src = event.target["result"] as string;
      imgObj.onload = () => {
        const image = new fabric.Image(imgObj);
        this.canvas.centerObject(image);
        this.canvas.add(image);
        this.canvas.renderAll();
        this.canvas.bringToFront(image);
        this.canvas.setActiveObject(image);
        const imageObject = this.canvas.getActiveObject();
        this.layers.push({
          object: imageObject,
          name: file.name,
          icon: "image"
        });
        console.log(this.layers);
      };
    };
    reader.readAsDataURL(file);
  }

  activateObject(layer) {
    console.log(layer);
  }

  changeColour() {}

  setBackground() {}

  delete() {}

  addShape() {}

  bringForward() {}

  sendBackward() {}

  addText() {}
}
