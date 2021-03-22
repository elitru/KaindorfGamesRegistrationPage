import { Injectable } from '@angular/core';
import { Participation } from '../models/application/participation';
import { CreateTeamRequest } from '../models/client/requests/CreateTeamRequest';
import { RequestJoinTeam } from '../models/client/requests/JoinTeamRequest';
import { RequestLeaveTeam } from '../models/client/requests/RequestLeaveTeam';
import { ApiService } from './api.service';
import { APIRoutes } from './APIRoutes';
import { GameModesService } from './game-modes.service';

@Injectable({
  providedIn: 'root',
})
export class ParticipationService {
  private __participations: Participation[] = [];

  constructor(
    private apiService: ApiService,
    private gameModesService: GameModesService
  ) {
    this.fetch().then(
      (result) => {
        this.__participations = result;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * This getter only returns the games of the currently selected mode!
   */
  public get participations() {
    if (this.gameModesService.activeGame == null) {
      return [];
    }
    return this.__participations.filter(
      (p) => p.gameName == this.gameModesService.activeGame.name
    );
  }
  

  public async createTeam(req: CreateTeamRequest): Promise<void> {
    // submit request for creating team
    await this.apiService.post(APIRoutes.Participation.Create, req);
    // reload participations
    this.__participations = await this.fetch();
  }

  public async joinTeam(req: RequestJoinTeam): Promise<void> {
    await this.apiService.put(APIRoutes.Participation.Join, req);
    // reload participations
    this.__participations = await this.fetch();
  }

  public async leaveTeam(req: RequestLeaveTeam): Promise<void> {
    await this.apiService.delete(APIRoutes.Participation.Leave, req);
     // reload participations
     this.__participations = await this.fetch();
  }

  private async fetch(): Promise<Participation[]> {
    return this.apiService.get<Participation[]>(APIRoutes.Participation.All);
  }
}
