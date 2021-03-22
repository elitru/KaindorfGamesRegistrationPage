import { Component, HostListener, OnInit } from '@angular/core';
import { Game } from 'src/app/models/application/games';
import { Participation } from 'src/app/models/application/participation';
import { CreateTeamRequest } from 'src/app/models/client/requests/CreateTeamRequest';
import { RequestJoinTeam } from 'src/app/models/client/requests/JoinTeamRequest';
import { ApiService } from 'src/app/services/api.service';
import { APIRoutes } from 'src/app/services/APIRoutes';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GameModesService } from 'src/app/services/game-modes.service';
import { ParticipationService } from 'src/app/services/participation.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.styl'],
})
export class TournamentsComponent implements OnInit {
  public highlighterTop: number = 0;

  public isFormOpen: boolean = false;
  public isDialogueOpen: boolean = false;
  public teamName: string = '';
  public ingameName: string = '';
  public password: string = '';
  public isFormLoading: boolean = false;
  public error: string = '';
  public isCurrentUserInGame: boolean = true;
  public currentParticipation: Participation | null = null;

  constructor(
    private participationService: ParticipationService,
    public authentiationService: AuthenticationService,
    public gameModesService: GameModesService
  ) {}

  public ngOnInit(): void {}

  public get games() {
    return this.gameModesService.games;
  }

  public get activeGame() {
    return this.gameModesService.activeGame;
  }

  public get teams() {
    return this.participationService.participations;
  }

  public isInTeam(team: Participation): boolean {
    return (this.authentiationService.currentUser) && team.users.find(u => u.id === this.authentiationService.currentUser.id) !== undefined;
  }

  public getTeamMembers(team: any): string {
    return team.users.map((u) => u.ingameName).join(', ');
  }

  public getTeamCreateData(): CreateTeamRequest {
    if (this.ingameName === '' || this.teamName === '')
      throw new Error('No IGN/Team-Name was provided.');

    return {
      ingameName: this.ingameName,
      teamName: this.teamName,
      password: this.password,
      gameName: this.gameModesService.activeGame.name,
    };
  }

  public getJoinTeamData(): RequestJoinTeam {
    if (this.currentParticipation.passwordProtected && this.password === "" || this.ingameName === "") {
      throw new Error("The given data is invalid");
    } 
    return {
      teamId: this.currentParticipation.id,
      ingameName: this.ingameName,
      password: this.password
    }
  }

  /**
   * This method is called when the active game is changed.
   * @param game The clicked game
   * @param index The index of the clicked game
   * @returns
   */
  public onToggleGame(game: Game, index: number): void {
    if (this.activeGame === game) return;

    // check if user is already IN THIS GAME
    this.isCurrentUserInGame = this.currentUserInAnyTeam();

    this.gameModesService.activeGame = game;
    this.highlighterTop = 80 * index;
  }

  public toggleTeamCreator(): void {
    if (this.isFormOpen) {
      this.isFormOpen = false;
      return;
    }

    this.clear();

    this.isFormLoading = false;
    this.isFormOpen = true;
  }

  private clear(): void {
    this.ingameName = '';
    this.teamName = '';
    this.password = '';
  }

  public toggleDialogue(team: Participation) {
    this.clear();
    this.currentParticipation = team;
    this.isDialogueOpen = !this.isDialogueOpen;
  }

  /**
   * To allow the user to close the dialogue using "Escape"
   * @param event
   */
  @HostListener(`document:keydown.escape`, [`$event`])
  public onEscapePressed(event: KeyboardEvent) {
    this.isDialogueOpen = false;
  }

  public onCancelClick(event: any): void {
    if (event.target.id === 'overlay') {
      this.isDialogueOpen = false;
    }
  }

  /**
   * Checks whether the specified team contains the currently authenticated user
   * @param team The team to check
   */
  public currentUserInAnyTeam(): boolean {
    // loop through all the current participations
    if(!this.authentiationService.currentUser) return false;
    
    for (let team of this.teams) {
      if (
        team.users.filter(
          (t) => t.id == this.authentiationService.currentUser.id
        ).length > 0
      ) {
        // user is in ANY team --> disable all teams!
        return true;
      }
    }
    return false;
  }

  public async onLeaveTeam({ id }: Participation): Promise<void> {
    try {
      await this.participationService.leaveTeam({
        teamId: id
      })
    } catch (err) {
      console.log(err);
    }
  }

  public async onCreateTeam(): Promise<void> {
    try {
      // try to get data
      const data = this.getTeamCreateData();
      // show loader
      this.isFormLoading = true;
      // create new team
      await this.participationService.createTeam(data);
      // switch off loader
      this.isFormLoading = false;
      // close form
      this.isFormOpen = false;
      // clear values from form
      this.clear();
    } catch (err) {
      // hide loader
      this.isFormLoading = false;
      // TODO display error in GUI
      //this.error = 'The data entered was invalid.';
      console.log(err);
    }
  }

  public async onJoinTeam(): Promise<void> {
    try {
      // try to get data
      const data = this.getJoinTeamData();
      // create new team
      await this.participationService.joinTeam(data);
      // close form
      this.isDialogueOpen = false;
      // clear values from form
      this.clear();
    } catch (err) {
      // hide loader
      this.isFormLoading = false;
      // TODO display error in GUI
      //this.error = 'The data entered was invalid.';
      console.log(err);
    }
  }
}
