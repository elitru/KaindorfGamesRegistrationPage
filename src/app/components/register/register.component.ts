import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/models/client/requests/RegisterRequest';
import { ApiService } from 'src/app/services/api.service';
import { APIRoutes } from 'src/app/services/APIRoutes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {
  public username: string = '';
  public dcName: string = '';
  public password: string = '';
  public passwordRepeat: string = '';

  public error: string = '';
  public isLoading: boolean = false;

  constructor(protected apiService: ApiService, private router: Router) { }

  public ngOnInit(): void {
  
  }

  private getData():RegisterRequest {
    // make sure that the passwords are the same
    if (this.password !== this.passwordRepeat) {
      throw new Error("Passwords don't match");
    }
    // check if empty
    if (this.dcName === "" || this.username === "" || this.password === "") {
      throw new Error("A required field was empty");
    }

    return {
      discordName: this.dcName,
      password: this.password,
      userName: this.username
    }
  }

  public async onSubmit(): Promise<void> {
    // validate input

    this.isLoading = true;

    try {
      const payload = this.getData();
      await this.apiService.post(APIRoutes.User.Register, payload);
      this.isLoading = false;
      this.router.navigateByUrl("/login");
    }catch(err) {
      // load error into error variable in order to show it
      this.isLoading = false;
      this.error = `Error: ${err.message}!`;
    }
  }
}
