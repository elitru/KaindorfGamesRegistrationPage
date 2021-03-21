import { Injectable } from '@angular/core';
import { Participation } from '../models/application/participation';
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
    this.apiService.get<Participation[]>(APIRoutes.Participation.All).then(
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
}
