import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Boxes } from 'object-detection-from-yolo-to-tensorflow'
import * as tf from '@tensorflow/tfjs'


@Component({
  selector: 'app-obscene-gesture-detector',
  templateUrl: './obscene-gesture-detector.component.html',
  styleUrls: ['./obscene-gesture-detector.component.css']
})
export class ObsceneGestureDetectorComponent implements OnInit, OnDestroy {

  /**
   *
   */
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | null = null;

  /*
   * Model
   */
  private _model: tf.GraphModel<string | tf.io.IOHandler> | null = null;

  /*
  * Model getter
  */
  public get model(): tf.GraphModel<string | tf.io.IOHandler> | null {
    return this._model;
  }

  /*
   * Model setter
   */
  public set model(value: tf.GraphModel<string | tf.io.IOHandler> | null) {
    if (this._model !== value) {
      this._model = value;
    }
  }

  /**
   * width
   */
  private _width: number = 100;
  public get width(): number {
    return this._width;
  }
  public set width(v: number) {
    this._width = v;
  }

  /**
   * height
   */
  private _height: number = 100;
  public get height(): number {
    return this._height;
  }
  public set height(v: number) {
    this._height = v;
  }

  /**
   * type Selection
   */
  private _typeSelection: string = 'camera';
  public get typeSelection(): string {
    return this._typeSelection;
  }
  public set typeSelection(v: string) {
    this._typeSelection = v;
  }

  /**
   * Constructor
   */
  constructor() {
    tf.loadGraphModel('assets/obscene_model/model.json',).then(async (model: any) => {
      this.model = model;
    });
  }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {

  }

  // Função para aplicar um efeito de pixelização na imagem
  applyPixelation(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, pixelSize: number) {

    const centerX = width;
    const centerY = height;

    // Obtenha a região de pixels dentro do quadrado no centro da imagem
    // const imageData = context.getImageData(centerX - squareSize / 2, centerY - squareSize / 2, squareSize, squareSize);
    const imageData = context.getImageData(
      x,
      y,
      centerX, centerY
    );
    const data = imageData.data;

    // Aplicar o efeito de pixelização percorrendo os pixels em blocos
    for (let y = 0; y < centerY; y += pixelSize) {
      for (let x = 0; x < centerX; x += pixelSize) {
        const pixelIndex = (y * centerX + x) * 4;
        const r = data[pixelIndex];
        const g = data[pixelIndex + 1];
        const b = data[pixelIndex + 2];

        // Preencher um bloco de pixels com a cor média do bloco
        for (let blockY = y; blockY < y + pixelSize; blockY++) {
          for (let blockX = x; blockX < x + pixelSize; blockX++) {
            const blockIndex = (blockY * centerX + blockX) * 4;
            data[blockIndex] = r;
            data[blockIndex + 1] = g;
            data[blockIndex + 2] = b;
          }
        }
      }
    }
    // Colocar os pixels pixelizados de volta no centro da imagem
    context.putImageData(imageData, x, y);
  }

  /**
   *
   * @param predition
   */
  predictionReturn(predition: { canvas: HTMLCanvasElement, boxes: Boxes[] | null, videoTime?: number }) {

    if (predition.boxes && predition.canvas) {
      const ctx = predition.canvas.getContext('2d', { willReadFrequently: true });

      if (predition.boxes && ctx) {
        predition.boxes.forEach(propbs => {
          const classes = ['Obscene', 'No Obscene', 'Undefined'];
          if (propbs.classeId === 0) {
            const x = Math.round(propbs.box.x);
            const y = Math.round(propbs.box.y);
            const width = Math.round(propbs.box.width - propbs.box.x);
            const height = Math.round(propbs.box.height - propbs.box.y);
            console.log(predition.videoTime)
            this.applyPixelation(ctx, x, y, width, height, 40)
          }
        });
      }
    }
  }
}
