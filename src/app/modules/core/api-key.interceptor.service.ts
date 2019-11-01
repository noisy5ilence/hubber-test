import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfigService } from './config.service';


@Injectable()
export class ApiKeyInterceptorService implements HttpInterceptor {
  constructor(private config: ConfigService, @Inject('configPath') private configPath) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return request.url === this.configPath ? next.handle(request) : this.config.options.pipe(
      mergeMap(
        ({ apiKey, base }) => {
          request = request.clone({ headers: request.headers.set('X-Api-Key', apiKey) });
          request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
          request = request.clone({ url: `${base}${request.url}` });

          return next.handle(request);
        }
      )
    );
  }
}
