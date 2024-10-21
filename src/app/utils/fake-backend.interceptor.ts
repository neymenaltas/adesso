import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as units from './age-of-empires-units';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  private units = units.units;

  // It is just a dummy file so I will use any for these request and response.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('/api/units') && request.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.units.units })).pipe(delay(500));
    }

    const urlParts = request.url.split('/');
    const id = urlParts[urlParts.length - 1];

    if (request.url.match(/\/api\/units\/\d+$/) && request.method === 'GET') {
      const unit = this.units.units.find(u => u.id === +id);
      if (unit) {
        return of(new HttpResponse({ status: 200, body: unit })).pipe(delay(500));
      } else {
        return of(new HttpResponse({ status: 404, body: { message: 'Unit not found' } })).pipe(delay(500));
      }
    }

    return next.handle(request);
  }
}
