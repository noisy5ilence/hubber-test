import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './modules/core/core.module';
import { RoutingModule } from './modules/routing/routing.module';

import { HubberComponent } from './hubber.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    HubberComponent
  ],
  imports: [
    CoreModule.forRoot('assets/config.json'),
    HttpClientModule,
    BrowserModule,
    RoutingModule
  ],
  bootstrap: [HubberComponent]
})
export class HubberModule { }
