import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination';

import { NewsItemComponent } from './components/news-item/news-item.component';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { NewsService } from './news.service';


const ROUTES: Routes = [
  { path: '', component: NewsComponent }
];

@NgModule({
  declarations: [NewsItemComponent, NewsComponent],
  providers: [
    NewsService
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot()
  ]
})
export class NewsModule {
}
