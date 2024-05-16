import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GameDto } from './game.dto';

@Injectable()
export class GameService {

  private games: GameDto[] = [];

  getAllGames() {
    return this.games;
  }

  getGameById(id: string): GameDto {
    return this.games.find(game => game.id === id); 
  }

  createGame(gameData: GameDto) {
    this.games.push(gameData);
    return gameData; 
  }

  updateGame(id: string, gameData: GameDto) {
    const index = this.games.findIndex(game => game.id === id); 
    if (index === -1) {
      return null;
    }
    if(index >= 0) {
      this.games[index] = { ...this.games[index], ...gameData };
      return this.games[index];
    }
    throw new HttpException(`Game with id ${gameData.id} not found`, HttpStatus.BAD_REQUEST);
  }

  deleteGame(id: string) {
    const index = this.games.findIndex(game => game.id === id); 
    if (index === -1) {
      return null;
    }
    if(index >= 0){
      const deletedGame = this.games[index];
      this.games.splice(index, 1); 
      return deletedGame; 
    }
    throw new HttpException(`Game with id ${id} not found`, HttpStatus.BAD_REQUEST);
  }
}
