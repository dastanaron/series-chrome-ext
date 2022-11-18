export interface SeriesInfo {
  id: string;
  url: string;
  name: string;
  season: number;
  episode: number;
}

export interface StorageEntities {
  [key: string]: SeriesInfo[];
}
