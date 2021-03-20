import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/client/requests/LoginRequest';
import { LoginResponse } from 'src/app/models/client/responses/LoginResponse';
import { ApiService } from 'src/app/services/api.service';
import { APIRoutes } from 'src/app/services/APIRoutes';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl'],
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';

  public error: string = '';
  public isLoading: boolean = false;

  constructor(
    protected apiService: ApiService,
    protected authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public ngOnInit(): void {}

  private validateInputs(): boolean {
    //return this.username !== "" && this.password !== "";
    return true;
  }

  private getLoginValues(): LoginRequest {
    // TODO read values from input
    return {
      userName: 'Suffix',
      password: 'thisisverysafe',
    };
  }

  public async onSubmit(): Promise<void> {
    // validate input

    this.isLoading = true;

    // only submit if valid
    if (this.validateInputs()) {
      try {
        //make api call via service
        const result: LoginResponse = await this.apiService.post<LoginResponse>(
          APIRoutes.User.Authenticate,
          this.getLoginValues()
        );
        // set values in local storage
        this.authenticationService.updateValues(result);
        // cancel loading;
        this.isLoading = false;
        //navigate to new url
        this.router.navigateByUrl('/tournaments');
        // redirect
      } catch (err) {
        // load error into error variable in order to show it
        console.log(err);
        this.isLoading = false;
      }
    } else {
      console.log('not valid');
      this.isLoading = false;
    }
  }
}
