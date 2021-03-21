import { Injectable } from '@angular/core';
import { Game } from '../models/application/games';
import { ApiService } from './api.service';
import { APIRoutes } from './APIRoutes';

@Injectable({
  providedIn: 'root',
})
export class GameModesService {
  private __games: Game[] = [];

  private __activeGame: Game | null = null;

  constructor(private apiService: ApiService) {
    this.apiService.get<Game[]>(APIRoutes.GameMode.All).then(
      (result) => {
        this.__games = result;
        this.__activeGame = this.__games[0];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public get games() {
    return this.__games;
  }

  public get activeGame() {
    return this.__activeGame;
  }

  public set activeGame(game: Game) {
    this.__activeGame = game;
  }
}
