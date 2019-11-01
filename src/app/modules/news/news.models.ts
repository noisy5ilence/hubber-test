export interface Response {
  totalResults?: number;
}

export interface ResponseWithSources extends Response {
  sources: Source[];
}

export interface ResponseWithArticles extends Response {
  articles: Array<Article>;
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface Option<V> {
  value: V;
  label: string;
}

export interface Article {
  author: string;
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
}
