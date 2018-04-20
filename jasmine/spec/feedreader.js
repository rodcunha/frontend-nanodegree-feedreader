/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  'use strict'
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined(); //expects the array allFeeds to be defined
            expect(allFeeds.length).not.toBe(0); // expects it to have feeds
        });


        /* This test checks if the url is defined and it isn't empty */
         it('should have a url defined and not be empty', function() {
           allFeeds.forEach(function(item) {
             expect(item.url).toBeDefined();  //expects the url field to be defined
             expect(item.url).not.toBe('');  //expects the url field not to be empty
           })
         });


        /* This test checks if a name is defined and it isn't empty */
        it('should have a name defined and not be empty', function() {
          allFeeds.forEach(function(item) {
            expect(item.name).toBeDefined(); // expects a name to be defined
            expect(item.name).not.toBe(''); // expects the name not to be empty
          });
        });
    });


    /* new test suite for the menu functionality */
    describe('The menu', function() {
        //var $body = $('body');
        var menu = $('.menu-icon-link');
        /* this will test that the menu is hidden by default
         */
         it('Menu item should be hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true); // check that the menu is hidden by default
         });

         /* This will test that the menu will toggle on and off  when clicked
          */
          it('Menu should be visible when clicked', function() {
            menu.click();
              expect($('body').hasClass('menu-hidden')).toBe(false); // on click the menu should be displayed
            menu.click();
              expect($('body').hasClass('menu-hidden')).toBe(true); // on second click the menu should return to its hidden status
            });
     });
    /* This test suite will check that the feeds are loaded async */
    describe('Initial Entries', function() {
        beforeEach(function(done) {  //async check Jasmine done function
          loadFeed(0, function() {
            done();
          });
        });
        /* This test will check that the .feed element has children with the .entry class (feeds) */
         it('Should complete loading the feeds', function(done) {
           //expects the article children of our anchor tags to have the .entry class
           expect($('.feed > a > article').hasClass('entry')).toBe(true);
           done();
         });
    });
    /* This test suite will check that the feeds are different from each other */
    describe('New Feed Selection', function() {
      var feedOne, feedTwo; // creates 2 variables to store the different feeds
        beforeEach(function(done) { // async check Jasmine done function
            loadFeed(0, function() {
              feedOne = $('.feed').html(); //assings the value of the returned html to the variable 1
              loadFeed(1, function() {
                feedTwo = $('.feed').html(); // assigns the value of the retuned html to variable 2
              });
              done();
            });
        });

        /* This test will check that all 2 different sources of the feeds are in fact different */
         it('Should display different content when a new feed is loaded', function(done) {
           expect(feedOne).not.toEqual(feedTwo); // compares the variables and expects them to be different
           done();
         });
      });
}());
