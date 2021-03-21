import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/application/games';
import { GameModesService } from 'src/app/services/game-modes.service';
import { ParticipationService } from 'src/app/services/participation.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.styl']
})
export class TournamentsComponent implements OnInit {
  
  public highlighterTop: number = 0;

  public isFormOpen: boolean = false;
  public teamName: string = '';
  public password: string = '';
  public isFormLoading: boolean = false;

  constructor(private gameModesService: GameModesService, private participationService: ParticipationService) { }

  public ngOnInit(): void {
  
  }

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
    return team.users.map(u => u.ingameName).join(', ');
  }

  /**
   * This method is called when the active game is changed.
  * @param game The clicked game
   * @param index The index of the clicked game
   * @returns 
   */
  public onToggleGame(game: Game, index: number): void {
    if(this.activeGame === game) return;

    this.gameModesService.activeGame = game;
    this.highlighterTop = 80 * index;
  }

  public toggleTeamCreator(): void {
    if(this.isFormOpen) {
      this.isFormOpen = false;
      return;
    }

    this.teamName = '';
    this.password = '';
    this.isFormLoading = false;
    this.isFormOpen = true;
  }

  public async onCreateTeam(): Promise<void> {
    this.isFormLoading = true;
  }
}
