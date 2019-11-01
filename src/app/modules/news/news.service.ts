import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { getName as getCountryName } from 'country-list';
import { Option, ResponseWithArticles, ResponseWithSources } from './news.models';


@Injectable()
export class NewsService {
  private _sources$;
  private _articles$ = new Subject<ResponseWithArticles>();
  private _articleOptions = {
    category: '',
    country: '',
    page: '0',
    pageSize: '20',
    q: ''
  };
  articles$ = this._articles$.asObservable();

  constructor(private client: HttpClient) { }

  getSources$(): Observable<{ categories: Array<string>, countries: Array<Option<string>> }> {
    if (!this._sources$) {
      this._sources$ = this.client.get<ResponseWithSources>('/sources').pipe(
        map(
          ({ sources }) => sources.reduce(
            (_, { country, category }) => ({
              ..._,
              categories: _.categories.concat(_.categories.indexOf(category) > -1 ? [] : category),
              countries: _.countries.concat(
                _.countries.some(({ value }) => value === country) ? [] : { value: country, label: getCountryName(country) }
              )
            }), { categories: [], countries: [] }
          )
        ),
        publishReplay(1),
        refCount()
      );
    }

    return this._sources$;
  }

  getArticles$(
    options: { category?: string, country?: string, page?: string, pageSize?: string, q?: string }
  ): Subscription {
    const params = this._articleOptions = { ...this._articleOptions, ...options };

    return this.client.get<ResponseWithArticles>(
      '/top-headlines', { params }
    ).subscribe(next => this._articles$.next(next));
  }
}
