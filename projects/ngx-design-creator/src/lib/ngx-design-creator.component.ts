import { Component, OnInit, Input, OnDestroy, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { DesignCreatorConfig } from "../public_api";
import { fabric } from "fabric";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { take } from "rxjs/operators";

export interface Layer {
  object: fabric.Object;
  icon: string;
  name: string;
  id: string;
  index?: number;
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
  selectedLayer: string;
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

  deleteLayer(object?: fabric.Object) {
    if(!object) {
      const object = this.canvas.getActiveObject();
      this.canvas.remove(object);
    } else {
      this.canvas.remove(object);
    }
    const index = this.layers.findIndex(obj => obj.object === object);
    this.layers.splice(index, 1);
    this.selectedLayer = null;
  }

  addImage(inputValue) {
    // Read image value and add object to fabric canvas.
    const file: File = inputValue[0];
    const reader: FileReader = new FileReader();
    reader.onload = event => {
      const imgObj = new Image();
      imgObj.src = event.target["result"] as string;
      imgObj.onload = () => {
        // Created new fabric image object and scale image down;
        const image = new fabric.Image(imgObj).scale(0.5);
        this.canvas.centerObject(image);
        this.canvas.add(image);
        this.canvas.renderAll();
        this.canvas.bringToFront(image);
        this.canvas.setActiveObject(image);
        // Add image to layers array
        const id = Math.random().toString(12).substring(2, 15)
        this.layers.push({
          object: image,
          name: `Layer ${this.layers.length + 1}`,
          icon: "image",
          id: id
        });
        console.log(this.layers);
        this.selectedLayer = id;
      };
    };
    reader.readAsDataURL(file);
  }

  activateLayer(layer: Layer) {
    console.log(layer);
    this.selectedLayer = layer.id;
    console.log(this.selectedLayer);
    this.canvas.setActiveObject(layer.object);
    this.canvas.renderAll();
  }


  changeColour() {
    const selectColor = this.dialog.open(this.selectColorDialog);
    selectColor
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        const object = this.canvas.getActiveObject();
        object.set({ fill: `${this.colorForm.get('color').value}` });
      });

  }

  setBackground() {}

  delete() {}

  addShape() {
    const selectShape = this.dialog.open(this.selectShapeDialog);
    selectShape
      .afterClosed()
      .pipe(take(1))
      .subscribe(value => {
        switch (value) {
          case 'rectangle':
            const rectangle = new fabric.Rect({
              width: 100,
              height: 100,
              fill: 'black',
              opacity: 1,
              left: 0,
              top: 0
            });
            this.canvas.add(rectangle);
            this.canvas.bringToFront(rectangle);
            this.canvas.setActiveObject(rectangle);
            const id = Math.random().toString(12).substring(2, 15)
            this.layers.push({
              object: rectangle,
              name: `Layer ${this.layers.length + 1}`,
              icon: "extension",
              id: id
            });
            this.selectedLayer = id;
            break;
          case 'line':
            const line = new fabric.Line([50, 100, 200, 200], {
              left: 170,
              top: 150,
              stroke: 'black'
            });
            this.canvas.add(line);
            this.canvas.bringToFront(line);
            this.canvas.setActiveObject(line);
            const id1 = Math.random().toString(12).substring(2, 15)
            this.layers.push({
              object: line,
              name: `Layer ${this.layers.length + 1}`,
              icon: "extension",
              id: id1
            });
            this.selectedLayer = id1;
            break;
          case 'ellipse':
            const ellipse = new fabric.Circle({
              radius: 50,
              fill: 'black'
            });
            this.canvas.add(ellipse);
            this.canvas.bringToFront(ellipse);
            this.canvas.setActiveObject(ellipse);
            const id2 = Math.random().toString(12).substring(2, 15)
            this.layers.push({
              object: ellipse,
              name: `Layer ${this.layers.length + 1}`,
              icon: "extension",
              id: id2
            });
            this.selectedLayer = id2;
            break;
          default:
        }
      });
  }

  bringForward() {
    const object = this.canvas.getActiveObject();
    this.canvas.bringForward(object);
  }

  sendBackward() {
    const object = this.canvas.getActiveObject();
    this.canvas.sendBackwards(object);
  }

  addText() {
    const text = new fabric.IText('Tap and Type', {
      fontFamily: 'arial black',
      left: 100,
      top: 100
    });
    this.canvas.add(text);
    this.canvas.bringToFront(text);
    this.canvas.setActiveObject(text);
    const id = Math.random().toString(12).substring(2, 15)
    this.layers.push({
      object: text,
      name: `Layer ${this.layers.length + 1}`,
      icon: "text_format",
      id: id
    });
    this.selectedLayer = id;

  }
}
