import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/games';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.styl']
})
export class TournamentsComponent implements OnInit {
  public games: Game[] = [
    {
      emojiName: '',
      name: 'MC Varo',
      teamSize: 2
    },
    {
      emojiName: '',
      name: 'MC 1vs1',
      teamSize: 2
    },
    {
      emojiName: '',
      name: 'MC BedWars',
      teamSize: 2
    },
    {
      emojiName: '',
      name: 'CS:GO',
      teamSize: 2
    },
    {
      emojiName: '',
      name: 'Rocket League',
      teamSize: 2
    }
  ];
  public activeGame: Game = this.games[0];
  public highlighterTop: number = 0;

  public teams = [
    {
      id: new Date(),
      requiredTeamSize: 2,
      teamName: '#Schwitzer',
      passwordProtected: true,
      users: [
        {
          discordName: "user1",
          ingameName: "user1"
        }
      ]
    },
    {
      id: new Date(),
      requiredTeamSize: 2,
      teamName: '#Schwitzer',
      passwordProtected: false,
      users: [
        {
          discordName: "user1",
          ingameName: "user1"
        }
      ]
    }
  ];

  public isFormOpen: boolean = false;
  public teamName: string = '';
  public password: string = '';
  public isFormLoading: boolean = false;

  constructor() { }

  public ngOnInit(): void {
  
  }

  public getTeamMembers(team: any): string {
    return team.users.map(u => u.ingameName).join(', ');
  }

  public onToggleGame(game: Game, index: number): void {
    if(this.activeGame === game) return;

    this.activeGame = game;
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
