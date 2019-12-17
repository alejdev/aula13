
import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'

import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { LoaderService } from './services/loader.service'

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  activeRequests: number = 0

  constructor(
    public loaderService: LoaderService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (this.activeRequests === 0) {
      this.loaderService.start()
    }

    this.activeRequests++

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--
        if (this.activeRequests === 0) {
          this.loaderService.stop()
        }
      })
    )
  }
}
