export * from './draggable';
export * from './dropzone';
export * from './interact-draggable';
export * from './interact-dropzone';
export * from './interact-gesturable';
export * from './interact-resizable';
export * from './resizable';
import * as Interact from 'interact';
import { PLATFORM } from 'aurelia-pal';


export function configure(aurelia, options) {
  aurelia.container.registerInstance(Interact, Interact);
  let attributes = [
    PLATFORM.moduleName('./interact-draggable'),
    PLATFORM.moduleName('./interact-dropzone'),
    PLATFORM.moduleName('./interact-gesturable'),
    PLATFORM.moduleName('./interact-resizable'),
    PLATFORM.moduleName('./resizable'),
  ];

  if (options && options.enableDragDropAttributes === true) {
    attributes.push(PLATFORM.moduleName('./draggable'));
    attributes.push(PLATFORM.moduleName('./dropzone'));
  }

  aurelia.globalResources(attributes);
}
