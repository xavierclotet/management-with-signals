export interface BoardGameCollection {
  gameId: number;
  name: string;
  image: string;
  thumbnail: string;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
  isExpansion: boolean;
  yearPublished: number;
  bggRating: number;
  averageRating: number;
  rank: number;
  numPlays: number;
  rating: number;
  owned: boolean;
  preOrdered: boolean;
  forTrade: boolean;
  previousOwned: boolean;
  want: boolean;
  wantToPlay: boolean;
  wantToBuy: boolean;
  wishList: boolean;
  userComment: string;
}
