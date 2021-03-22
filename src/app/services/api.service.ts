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

  public put<Result>(route: ApplicationRoute, payload: any): Promise<Result> {
    // requires token --> attach header
    if (route.requiresToken) {
      return this.http
        .put<Result>(route.path, payload, {
          headers: APIHeaders.get(this.authenticationService.token),
        })
        .toPromise();
    } else {
      return this.http.put<Result>(route.path, payload).toPromise();
    }
  }

  public delete<Result>(route: ApplicationRoute, payload: any): Promise<Result> {
    // requires token --> attach header
    try {
      if (route.requiresToken) {
        return this.http
          .request('DELETE', route.path, {
            headers: APIHeaders.get(this.authenticationService.token),
            body: payload
          })
          .toPromise() as any;
      } else {
        return this.http.request<Result>('DELETE',route.path, { body: payload }).toPromise();
      }
    }catch(e) { }
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
