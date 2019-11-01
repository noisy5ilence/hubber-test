import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Article } from '../../news.models';

@Component({
  selector: 'hubber-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent {
  @Input()
  article: Article;
  imagePlaceholder = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081';
}
