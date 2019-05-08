import { environment } from '@env/environment';

export const grapes_plugins: string[] = [
  'grapesjs-plugin-selltime',
  'grapesjs-custom-code',
  'gjs-blocks-basic'
];
export const grapes_plugins_options: any = {
  'grapesjs-plugin-selltime': {
    addBasicStyle: true
  },
  'grapesjs-custom-code': {},
  'gjs-blocks-basic': {
    blocks: 'video',
    category: 'Multimedia'
  }
};

export const grapes_canvas_options = {
  styles: environment.editorStylesUrl,
  scripts: environment.editorScriptsUrl
};
