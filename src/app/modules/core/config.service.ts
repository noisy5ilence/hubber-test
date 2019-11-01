import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';


export interface APIOptions {
  apiKey: string;
  base: string;
}

@Injectable()
export class ConfigService {
  private _options;
  constructor(private _client: HttpClient, @Inject('configPath') private _configPath) { }

  get options(): Observable<APIOptions> {
    if (!this._options) {
      this._options = this._client.get<APIOptions>(this._configPath).pipe(
        publishReplay(1),
        refCount()
      );
    }
    return this._options;
  }
}
