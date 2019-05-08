import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import * as fromSharedFuse from '@SellTime/shared/fuse';
import * as fromRootState from '@AppState/index';
import * as fromCmsState from '../../+state';

import { templates } from './templates';

@Component({
  selector: 'selltime-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.scss'],
  animations: fromSharedFuse.fuseAnimations
})
export class ContentCreateComponent implements OnInit, OnDestroy {
  pageId: number;
  onRouterStateChange: Subscription;
  contentTypes$: Observable<fromSharedFuse.LookUpModel[]>;
  templates: any;
  selectedConTypeId: string;
  constructor(
    private rootStore: Store<fromRootState.AppState>,
    private cmsStore: Store<fromCmsState.CmsState>
  ) {}

  ngOnInit() {
    this.onRouterStateChange = this.rootStore
      .select(fromRootState.getRouterState)
      .subscribe(router => {
        this.pageId = router.state.params.pageId;
      });

    this.contentTypes$ = this.cmsStore.select(fromCmsState.getContentTypes);
  }

  ngOnDestroy(): void {
    this.onRouterStateChange.unsubscribe();
  }

  chooseTemplate(type: fromSharedFuse.LookUpModel): void {
    this.selectedConTypeId = type.value;
    this.templates = templates.filter(tem => tem.type === type.text);
  }

  newContent(templateId: number): void {
    if (!templateId) {
      templateId = templates[0].id;
    }

    // this.cmsStore.dispatch(new fromCmsState.SelectContent(0));

    this.rootStore.dispatch(
      new fromRootState.Go({
        path: [
          `/cms/editor/${templateId}/${this.pageId}/${this.selectedConTypeId}`
        ]
      })
    );
  }
}
