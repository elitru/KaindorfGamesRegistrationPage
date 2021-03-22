import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  public isNavOpen: boolean = false;

  constructor(private router: Router,
              public authService: AuthenticationService) { }

  public ngOnInit(): void {
  
  }

  public onClick(): void {
    if(!this.authService.isReadonly) {
      if(this.authService.isLoggedIn) {
        this.router.navigateByUrl('/tournaments');
      }else{
       this.router.navigateByUrl('/register');
      }
    }else{
      this.router.navigateByUrl('/tournaments');
    }
  }

  public onSignOut(): void {
    this.authService.logout();
  }
}
