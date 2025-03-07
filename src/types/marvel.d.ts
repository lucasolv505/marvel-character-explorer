// src/types/marvel.d.ts
interface Thumbnail {
  path: string;
  extension: string;
}

interface ComicList {
  available: number;
  items: Array<{
    resourceURI: string;
    name: string;
  }>;
}

interface SeriesList {
  available: number;
  items: Array<{
    resourceURI: string;
    name: string;
  }>;
}

interface StoryList {
  available: number;
  items: Array<{
    resourceURI: string;
    name: string;
  }>;
}

interface EventList {
  available: number;
  items: Array<{
    resourceURI: string;
    name: string;
  }>;
}

export interface Character {
  id: number;
  name: string;
  description: string | null;
  thumbnail: Thumbnail;
  comics: ComicList;
  series: SeriesList;
  stories: StoryList;
  events: EventList;
  modified: string;
  comics: ComicList;
  series: SeriesList;
  stories: StoryList;
  events: EventList;
  urls?: Array<{
    type: string;
    url: string;
  }>;
}

export interface MarvelApiResponse {
  code: number;
  status: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Character[];
  };
}