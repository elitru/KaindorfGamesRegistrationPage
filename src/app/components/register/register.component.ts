import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  public ngOnInit(): void {
  
  }

  public async onSubmit(): Promise<void> {
    // validate input

    this.isLoading = true;

    try {
      // make api call via service
      // redirect
    }catch(err) {
      // load error into error variable in order to show it
      this.isLoading = false;
    }
  }
}
