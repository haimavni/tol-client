import { Aurelia } from 'aurelia-framework';
import * as environment from '../config/environment.json';
import { PLATFORM } from 'aurelia-pal';
//import "froala-editor/js/froala_editor.pkgd.min";
//import "froala-editor/js/languages/he";
//import * as Backend from 'i18next-xhr-backend';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { I18N, TCustomAttribute } from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';
//import "froala-editor/js/froala_editor.pkgd.min";

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature(PLATFORM.moduleName('resources/index'))
        .feature(PLATFORM.moduleName('polyfills/index'))
        .globalResources(PLATFORM.moduleName('services/user'))
        .globalResources(PLATFORM.moduleName('services/cache'))
        .globalResources(PLATFORM.moduleName('services/member_list'))
        .globalResources(PLATFORM.moduleName('services/theme'))
        .globalResources(PLATFORM.moduleName('user/user-mode'));

    aurelia.use
        .plugin(PLATFORM.moduleName('aurelia-google-maps'), config => {
            config.options({
                apiKey: 'AIzaSyA5NfkmdFEz8VEbPhzErqoXpSxiV_zg8WQ', // use `false` to disable the key
                apiLibraries: 'drawing,geometry', //get optional libraries like drawing, geometry, ... - comma seperated list
                options: { panControl: true, panControlOptions: { position: 9 } }, //add google.maps.MapOptions on construct (https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions)
                language: 'he', // default: uses browser configuration (recommended). Set this parameter to set another language (https://developers.google.com/maps/documentation/javascript/localization)
                region: 'IL' || 'US', // default: it applies a default bias for application behavior towards the United States. (https://developers.google.com/maps/documentation/javascript/localization)
                markerCluster: {
                    enable: false,
                    src: 'https://cdn.rawgit.com/googlemaps/v3-utility-library/99a385c1/markerclusterer/src/markerclusterer.js', // self-hosting this file is highly recommended. (https://developers.google.com/maps/documentation/javascript/marker-clustering)
                    imagePath: 'https://cdn.rawgit.com/googlemaps/v3-utility-library/tree/master/markerclusterer/images/m', // the base URL where the images representing the clusters will be found. The full URL will be: `{imagePath}{[1-5]}`.`{imageExtension}` e.g. `foo/1.png`. Self-hosting these images is highly recommended. (https://developers.google.com/maps/documentation/javascript/marker-clustering)
                    imageExtension: 'png',
                }
            });
        })
        .plugin(PLATFORM.moduleName('aurelia-i18n'), instance => {
            let aliases = ['t', 'i18n'];
            // add aliases for 't' attribute
            TCustomAttribute.configureAliases(aliases);

            // register backend plugin
            instance.i18next.use(Backend);

            // adapt options to your needs (see http://i18next.com/docs/options/)
            // make sure to return the promise of the setup method, in order to guarantee proper loading
            return instance.setup({
                backend: {                                  // <-- configure backend settings
                    loadPath: './locales/{{lng}}/{{ns}}' + environment.i18n_ver + '.json', // <-- XHR settings for where to get the files from
                },
                attributes: aliases,
                lng: 'he',
                fallbackLng: 'he',
                debug: false
            }).then(() => {
                const router = aurelia.container.get(Router);
                const events = aurelia.container.get(EventAggregator);

                router.transformTitle = title => instance.tr(title);
                events.subscribe('i18n:locale:changed', () => { router.updateTitle(); });
            });
        }).plugin(PLATFORM.moduleName('aurelia-dialog'), config => {
          config.useDefaults();
          config.settings.lock = true;
          config.settings.centerHorizontalOnly = true;
          config.settings.startingZIndex = 5;
      })
      .plugin(PLATFORM.moduleName('au-table'))
      //.plugin(PLATFORM.moduleName('aurelia-interactjs'))
      .plugin(PLATFORM.moduleName('aurelia-bootstrap'), config => {
          config.options.accordionCloseOthers = true;
          config.options.accordionGroupPanelClass = 'panel-default';
          config.options.btnLoadingText = 'Loading...';
          config.options.dropdownAutoClose = 'always';
          config.options.paginationBoundaryLinks = false;
          config.options.paginationDirectionLinks = true;
          config.options.paginationFirstText = 'First';
          config.options.paginationHideSinglePage = true;
          config.options.paginationLastText = 'Last';
          config.options.paginationNextText = '>';
          config.options.paginationPreviousText = '<';
          config.options.popoverPosition = 'right';
          config.options.popoverTrigger = 'mouseover';
          config.options.tabsetType = 'tabs';
          config.options.tabsetVertical = false;
          config.options.tooltipClass = 'tooltip';
          config.options.tooltipPosition = 'top';
          config.options.tooltipTrigger = 'mouseover';
          config.options.videoDefaultDisplay = 'inline';
          config.options.videoDefaultWidth = 160;
          config.options.imageDefaultAlign = 'right';
          config.options.imageDefaultDisplay = 'inline';
          config.options.imageDefaultWidth = 100;
          config.options.linkAlwaysBlank = true;
      })

    aurelia.use.plugin(PLATFORM.moduleName('aurelia-froala-editor'));

    aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

    if (environment.testing) {
        aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    }

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
