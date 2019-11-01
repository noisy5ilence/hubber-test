import { ModuleWithProviders, NgModule } from '@angular/core';

import { ConfigService } from './config.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptorService } from './api-key.interceptor.service';


@NgModule({
  providers: [
    ConfigService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptorService, multi: true },
  ]
})
export class CoreModule {
  static forRoot(configPath: string): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ConfigService,
        { provide: 'configPath', useValue: configPath }
      ]
    };
  }
}
