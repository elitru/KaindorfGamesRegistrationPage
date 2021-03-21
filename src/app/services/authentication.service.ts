import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/client/responses/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _token: string | null = null;
  private _tokenExpiration: Date | null = null;

  static AUTH_KEY: string = 'AUTH_TOKEN';

  constructor() {
    this.loadUserDataFromStorage();
  }

  /**
   * @description saves an item with a given key into the local storage
   * @param key value with which the saved item can be retrieved
   * @param item the value to be saved
   */
  public save(key: string, item: any): void {
    if (key === null || key === undefined || !item)
      throw new Error('Key and item must be provided!');

    localStorage.setItem(key, JSON.stringify(item));
  }

  /**
   * @description retrieves an entry from the local storage and parses into the given generic type
   * @param key value with which the item was saved with
   */
  public get<TResult>(key: string): TResult {
    if (!key) throw new Error('Key must be provided!');

    const value = localStorage.getItem(key);
    if (!value) throw new Error(`No item found for the key ${key}`);

    return JSON.parse(value);
  }

  private loadUserDataFromStorage(): void {
    try {
      const { token, expiration } = this.get<LoginResponse>(AuthenticationService.AUTH_KEY);
      const tokenExpiration = new Date(parseInt(expiration));

      // check if token hasn't expired yet
      if (tokenExpiration > new Date()) {
        this._token = token;
        this._tokenExpiration = tokenExpiration;
      }
    } catch (err) {
      // no user found
      return;
    }
  }

  public get isLoggedIn(): boolean {
    return this._token !== null && this._tokenExpiration !== null && this._tokenExpiration > new Date();
  }

  public get token(): string {
    if(!this._token) throw new Error('No token found! Is the user logged in?');
    return this._token;
  }

  public updateValues(values: LoginResponse): void {
    this._token = values.token;
    this._tokenExpiration = new Date(parseInt(values.expiration));
    this.save(AuthenticationService.AUTH_KEY, values);
  }
}
