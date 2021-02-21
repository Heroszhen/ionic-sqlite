import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZhomePage } from './zhome.page';

const routes: Routes = [
  {
    path: '',
    component: ZhomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZhomePageRoutingModule {}
