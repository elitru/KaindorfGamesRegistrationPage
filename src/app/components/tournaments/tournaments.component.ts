import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/application/games';
import { CreateTeamRequest } from 'src/app/models/client/requests/CreateTeamRequest';
import { ApiService } from 'src/app/services/api.service';
import { APIRoutes } from 'src/app/services/APIRoutes';
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
  public teamName: string = '';
  public ingameName: string = '';
  public password: string = '';
  public isFormLoading: boolean = false;
  public error: string = '';

  constructor(
    private gameModesService: GameModesService,
    private participationService: ParticipationService,
    private apiService: ApiService
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
      gameName: this.gameModesService.activeGame.name
    };
  }

  /**
   * This method is called when the active game is changed.
   * @param game The clicked game
   * @param index The index of the clicked game
   * @returns
   */
  public onToggleGame(game: Game, index: number): void {
    if (this.activeGame === game) return;

    this.gameModesService.activeGame = game;
    this.highlighterTop = 80 * index;
  }

  public toggleTeamCreator(): void {
    if (this.isFormOpen) {
      this.isFormOpen = false;
      return;
    }

    this.teamName = '';
    this.password = '';
    this.isFormLoading = false;
    this.isFormOpen = true;
  }

  private clear(): void {
    this.ingameName = "";
    this.teamName = "";
    this.password = "";
  }

  public async onCreateTeam(): Promise<void> {
    try {
      // try to get data
      const data = this.getTeamCreateData();
      // show loader
      this.isFormLoading = true;
      // submit request
      const response = await this.apiService.post(APIRoutes.Participation.Create, data);
      // fetch new participations
      await this.participationService.reload();
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
      this.error = 'The data entered was invalid.';
    }
  }
}
