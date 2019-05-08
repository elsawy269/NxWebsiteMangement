import {
  Directive,
  OnInit,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import * as fromGs from './grapes-editor-configs';

declare var grapesjs: any;

@Directive({
  selector: '[selltimeGrapesEditor]'
})
export class GrapesEditorDirective implements OnInit {
  private element: HTMLInputElement;
  @Input() assets: string[];
  @Input() content: any;

  @Output() saveContent: EventEmitter<any> = new EventEmitter();
  @Output() assetAdded: EventEmitter<any> = new EventEmitter();
  constructor(private elRef: ElementRef) {
    this.element = elRef.nativeElement;
  }

  ngOnInit(): void {
    const editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: this.element,
      plugins: fromGs.grapes_plugins,
      pluginsOpts: fromGs.grapes_plugins_options,
      canvas: fromGs.grapes_canvas_options,
      assetManager: {
        assets: this.assets,
        upload: 1,
        uploadName: 'files',
        uploadFile: e => {
          debugger;
          const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        },
        dropzone: 0,
        dropzoneContent:
          '<div class="dropzone-inner">Drop here your assets</div>'
      },
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: false,
      components: this.content.body,
      style: this.content.styleName,
      height: '100%',
      showOffsets: 1,
      noticeOnUnload: 1,
      storageManager: {
        id: 'gjs-',
        type: 'local',
        autosave: true,
        autoload: false,
        stepsBeforeSave: 1
      },
      width: '100%'
    });

    const pnm = editor.Panels;
    pnm.addButton('options', [
      {
        id: 'clear-editor',
        className: 'fa fa-trash',
        command: 'clear-editor',
        attributes: { title: 'Clear Editor ' }
      }
    ]);
    pnm.addButton('options', [
      {
        id: 'undo-editor',
        className: 'fa fa-rotate-left',
        command: 'undo-editor',
        attributes: { title: 'Undo Change ' }
      }
    ]);
    pnm.addButton('options', [
      {
        id: 'redo-editor',
        className: 'fa fa-rotate-right',
        command: 'redo-editor',
        attributes: { title: 'Redo Change ' }
      }
    ]);
    pnm.addButton('options', [
      {
        id: 'save',
        className: 'fa fa-floppy-o',
        command: 'save',
        attributes: { title: 'Save ' }
      }
    ]);

    const cmdm = editor.Commands;
    cmdm.add('undo-editor', {
      run: (em, sender) => {
        const um = em.UndoManager;
        um.undo();
      }
    });
    cmdm.add('redo-editor', {
      run: (em, sender) => {
        const um = em.UndoManager;
        um.redo();
      }
    });
    cmdm.add('save', {
      run: (em, sender) => {
        sender.set('active', true);
        this.saveContent.emit();
      }
    });

    cmdm.add('clear-editor', {
      run: (em, sender) => {
        sender.set('active', true);
        editor.DomComponents.clear();
      }
    });

    // editor.on('asset:add', () => {
    //   debugger;

    //   console.log(urls);
    //   this.assetAdded.emit();
    // });
  }
}
