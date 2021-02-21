import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZhomePageRoutingModule } from './zhome-routing.module';

import { ZhomePage } from './zhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZhomePageRoutingModule
  ],
  declarations: [ZhomePage]
})
export class ZhomePageModule {}
