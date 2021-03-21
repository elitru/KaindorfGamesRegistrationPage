import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationRoute } from '../models/application/ApplicationRoute';
import { AuthenticationService } from './authentication.service';
import { APIHeaders } from './APIRoutes';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    protected http: HttpClient,
    protected authenticationService: AuthenticationService
  ) {}

  public post<Result>(route: ApplicationRoute, payload: any): Promise<Result> {
    // requires token --> attach header
    if (route.requiresToken) {
      return this.http
        .post<Result>(route.path, payload, {
          headers: APIHeaders.get(this.authenticationService.token),
        })
        .toPromise();
    } else {
      return this.http.post<Result>(route.path, payload).toPromise();
    }
  }

  public get<Result>(route: ApplicationRoute): Promise<Result> {
    // requires token --> attach header
    if (route.requiresToken) {
      return this.http
        .get<Result>(route.path, {
          headers: APIHeaders.get(this.authenticationService.token),
        })
        .toPromise();
    } else {
      return this.http.get<Result>(route.path).toPromise();
    }
  }
}
