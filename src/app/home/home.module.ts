import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CanvasVideoComponent } from '../componets/canvas-video/canvas-video.component';
import { ObsceneGestureDetectorComponent } from '../obscene-gesture-detector/obscene-gesture-detector.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, CanvasVideoComponent, ObsceneGestureDetectorComponent]
})
export class HomePageModule { }
