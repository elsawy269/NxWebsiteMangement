import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  NgxSpinnerModule,
  SPINNER_PLACEMENT,
  SPINNER_ANIMATIONS
} from '@hardpool/ngx-spinner';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromSharedFuse from '@SellTime/shared/fuse';
import * as fromSharedLayout from '@SellTime/shared/layout';
import * as fromCmsState from './+state';

import { CmsService } from './cms.service';

import { ContentCreateComponent } from './components/content-create/content-create.component';
import { SaveContentModalComponent } from './components/editor/save-content-modal/save-content-modal.component';
import { WebsiteListComponent } from './components/website-list/website-list.component';
import { WebsitesCardComponent } from './components/website-list/websites-card/websites-card.component';
import { WebsiteViewComponent } from './components/website-view/website-view.component';
import { GrapesEditorDirective } from './directives/grapes-editor.directive';
import { EditorComponent } from './components/editor/editor.component';

import { CmsContentTypeGuard } from './guards/cms-content-types.guard';
import { WebsiteViewGuard } from './guards/website-view.guard';
import { CmsGalleriesGuard } from './guards/cms-galleries.guard';
import { WebsiteCreateModalComponent } from './components/website-list/website-create-modal/website-create-modal.component';
import { PageCreateModalComponent } from './components/website-list/page-create-modal/page-create-modal.component';
import { CmsWebsitesGuard } from './guards/cms-websites.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'website-list',
    pathMatch: 'full'
  },
  {
    path: 'website-list',
    component: WebsiteListComponent,
    canActivate: [CmsWebsitesGuard]
  },
  {
    path: 'website-view/:websiteId',
    component: WebsiteViewComponent,
    canActivate: [WebsiteViewGuard]
  },
  {
    path: 'editor/:templateId/:pageId/:contentTypeId',
    component: EditorComponent,
    canActivate: [CmsGalleriesGuard, CmsWebsitesGuard]
  },
  {
    path: 'content-create/:pageId',
    component: ContentCreateComponent,
    canActivate: [CmsContentTypeGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    fromSharedFuse.SharedFuseModule,
    fromSharedFuse.FuseSidebarModule,
    fromSharedLayout.SharedLayoutModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('cms', fromCmsState.cmsReducers),
    EffectsModule.forFeature(fromCmsState.cmsEffects)
  ],
  declarations: [
    GrapesEditorDirective,
    EditorComponent,
    ContentCreateComponent,
    SaveContentModalComponent,
    WebsitesCardComponent,
    WebsiteViewComponent,
    WebsiteListComponent,
    WebsiteCreateModalComponent,
    PageCreateModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [GrapesEditorDirective, EditorComponent],
  providers: [
    CmsService,
    CmsGalleriesGuard,
    CmsContentTypeGuard,
    CmsWebsitesGuard,
    WebsiteViewGuard
  ],
  entryComponents: [
    SaveContentModalComponent,
    WebsiteCreateModalComponent,
    PageCreateModalComponent
  ]
})
export class CmsEditorModule {}
