'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Buildings = new Module('buildings');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Buildings.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Buildings.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Buildings.menus.add({
    'roles': ['authenticated'],
    'title': 'Buildings',
    'link': 'all buildings'
  });
  Buildings.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Building',
    'link': 'create building'
  });

  //Buildings.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Buildings.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Buildings.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Buildings.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Buildings.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Buildings.aggregateAsset('css', 'buildings.css');

  return Buildings;
});
