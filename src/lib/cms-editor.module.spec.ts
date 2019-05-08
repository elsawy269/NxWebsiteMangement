import { async, TestBed } from '@angular/core/testing';
import { CmsEditorModule } from './cms-editor.module';

describe('CmsEditorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CmsEditorModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CmsEditorModule).toBeDefined();
  });
});
