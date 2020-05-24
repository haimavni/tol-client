import { PLATFORM } from 'aurelia-pal';

export function configure(config) {
  config.globalResources([
    PLATFORM.moduleName('./attributes/tapandhold'),
    PLATFORM.moduleName('./value-converters/filter'),
    PLATFORM.moduleName('./value-converters/filter-by-set'),
    PLATFORM.moduleName('./value-converters/take'),
    PLATFORM.moduleName('./value-converters/spy'),
    PLATFORM.moduleName('./value-converters/filter-visibility'),
    PLATFORM.moduleName('./value-converters/filter-gender'),
    PLATFORM.moduleName('./value-converters/sort'),
    PLATFORM.moduleName('./value-converters/keeplen'),
    PLATFORM.moduleName('./value-converters/format-date'),
    PLATFORM.moduleName('./elements/multi-select/multi-select'),
    PLATFORM.moduleName('./elements/selector'),
    PLATFORM.moduleName('./elements/photo-strip'),
    PLATFORM.moduleName('./elements/editable'),
    PLATFORM.moduleName('./elements/roller'),
    PLATFORM.moduleName('./elements/partial-date'),
    PLATFORM.moduleName('./elements/date-range'),
    PLATFORM.moduleName('./elements/help'),
    PLATFORM.moduleName('./elements/info'),
    PLATFORM.moduleName('./elements/letter'),
    PLATFORM.moduleName('./elements/timeline'),
    PLATFORM.moduleName('./elements/search-input'),
    PLATFORM.moduleName('./elements/dlg-string'),
    PLATFORM.moduleName('./elements/locale-picker'),
    PLATFORM.moduleName('./elements/chats/chatroom-group'),
    PLATFORM.moduleName('./elements/chats/chatroom'),
    PLATFORM.moduleName('./elements/chats/chat-button'),
    PLATFORM.moduleName('./elements/quiz/quiz'),
    PLATFORM.moduleName('./elements/quick-login'),
    PLATFORM.moduleName('./elements/edit-side-by-side'),
    PLATFORM.moduleName('froala-editor')
  ]);
}
