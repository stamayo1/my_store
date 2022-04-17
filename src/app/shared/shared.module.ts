import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [
    TimeAgoPipe,
  ],
  imports: [
    CommonModule, 
    RouterModule
  ], 
  exports: [
    TimeAgoPipe,
  ]
})
export class SharedModule { }
