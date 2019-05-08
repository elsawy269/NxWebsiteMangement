import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { WebsiteModel } from '../../../models/website.model';
import { fuseAnimations } from '@SellTime/shared/fuse';
import { MatSnackBar } from '@angular/material';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Paging } from '../../../models/paging.model';
import {
  SPINNER_PLACEMENT,
  SPINNER_ANIMATIONS,
  ISpinnerConfig
} from '@hardpool/ngx-spinner';

@Component({
  selector: 'selltime-websites-card',
  templateUrl: './websites-card.component.html',
  styleUrls: ['./websites-card.component.scss'],
  animations: [
    fuseAnimations,
    trigger('rotatedState', [
      state('rotated', style({ transform: 'rotate(360)' })),
      state('rotated', style({ transform: 'rotate(-360deg)' })),
      transition('rotated => default', animate('800ms ease-out')),
      transition('default => rotated', animate('800ms ease-in'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebsitesCardComponent implements OnInit {
  @Input() websites: WebsiteModel[];
  @Input() loading: boolean;
  @Input() loadMoreShow: boolean;
  @Output() selectWebsite: EventEmitter<number> = new EventEmitter();
  @Output() editWebsite: EventEmitter<WebsiteModel> = new EventEmitter();
  @Output() addPage: EventEmitter<WebsiteModel> = new EventEmitter();
  @Output() loadMore: EventEmitter<number> = new EventEmitter();

  config: ISpinnerConfig;
  state = 'default';

  constructor(private snackBar: MatSnackBar) {
    this.config = {
      size: '3.5rem',
      color: '#1976d2',
      placement: SPINNER_PLACEMENT.inplace,
      animation: SPINNER_ANIMATIONS.rotating_dots
    };
  }

  onSelectWebsite(website: WebsiteModel): void {
    if (website.pageCount > 0) {
      this.selectWebsite.emit(website.id);
    } else {
      this.snackBar.open(`Website ${website.name} has no pages yet`, 'OK', {
        verticalPosition: 'top',
        duration: 1000,
        panelClass: 'mat-warn-bg'
      });
    }
  }

  onEditWebsite(website: WebsiteModel): void {
    this.editWebsite.emit(website);
  }
  onAddPage(website: WebsiteModel): void {
    this.addPage.emit(website);
  }

  onLoadMore(): void {
    // debugger;
    this.state = this.state === 'default' ? 'rotated' : 'default';
    this.loadMore.emit(this.websites.length);
  }

  ngOnInit() {}
}
