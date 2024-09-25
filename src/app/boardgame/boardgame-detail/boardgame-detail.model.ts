export interface BoardgameDetails {
  gameId: number;
  name: string;
  description: string;
  image: string;
  thumbnail: string;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
  mechanics: string[];
  isExpansion: boolean;
  yearPublished: number;
  bggRating: number;
  averageRating: number;
  rank: number;
  designers: string[];
  publishers: string[];
  artists: string[];
  playerPollResults: PlayerPollResult[];
}

export interface PlayerPollResult {
  numPlayers: number;
  best: number;
  recommended: number;
  notRecommended: number;
  numPlayersIsAndHigher: boolean;
}
