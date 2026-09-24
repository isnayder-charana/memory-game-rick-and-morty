export interface Character {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
}

export interface CharacterResponse {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
