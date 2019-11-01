import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { NewsService } from '../../news.service';
import { Observable } from 'rxjs';
import { Option, ResponseWithArticles } from '../../news.models';
import { take, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hubber-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit, AfterViewInit {
  query = new FormControl();

  sources$: Observable<{ categories: Array<string>, countries: Array<Option<string>> }>;
  articles$: Observable<ResponseWithArticles>;

  defaultCategory;
  currentPage;

  constructor(private data: NewsService) { }

  ngOnInit(): void {
    this.sources$ = this.data.getSources$().pipe(
      take(1),
      tap(({ categories }) => {
        this.defaultCategory = categories[0];
        this.changeCategory(this.defaultCategory);
      })
    );
    this.articles$ = this.data.articles$;
  }

  ngAfterViewInit(): void {
    this.query.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      q => {
        if (q.length > 2) {
          this.currentPage = 0;
          this.data.getArticles$({ q, page: this.currentPage });
        }
      }
    );
  }

  changeCategory(category) {
    this.currentPage = 0;
    this.data.getArticles$({ category, page: this.currentPage });
  }

  changeCountry({ value: country }: Option<string>) {
    this.currentPage = 0;
    this.data.getArticles$({ country, page: this.currentPage });
  }

  changePage({ page }) {
    this.data.getArticles$({ page });
  }
}
