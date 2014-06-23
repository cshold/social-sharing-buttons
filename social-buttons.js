/*============================================================================
  Social Icon Buttons v1.0
  Author:
    Carson Shold | @cshold
    http://www.carsonshold.com
  MIT License
==============================================================================*/
window.CSbuttons = window.CSbuttons || {};

CSbuttons.cache = {
  shareButtons: $('.social-sharing')
}

CSbuttons.init = function () {
  CSbuttons.socialSharing();
}

CSbuttons.socialSharing = function () {
  var buttons = CSbuttons.cache.shareButtons,
      permalink = buttons.attr('data-permalink'),
      shareLinks = buttons.find('a').addClass('tester'),
      socialCounts = buttons.find('span.share-count');

  // Get share stats from respective APIs
  var fbLink = $('.share-facebook'),
      twitLink = $('.share-twitter'),
      pinLink = $('.share-pinterest'),
      googleLink = $('.share-google'),
      fbShares, twitShares, pinShares, googleShares;

  if ( fbLink.length ) {
    $.getJSON('https://graph.facebook.com/?id=' + permalink + '&callback=?', function(data) {
      fbShares = data.shares;
      if (!fbShares) {
        fbShares = 0;
      }
      fbLink.find('.share-count').text(fbShares).addClass('is-loaded');
    });
  };

  if ( twitLink.length ) {
    $.getJSON('https://cdn.api.twitter.com/1/urls/count.json?url=' + permalink + '&callback=?', function(data) {
      twitShares = data.count;
      twitLink.find('.share-count').text(twitShares).addClass('is-loaded');
    });
  };

  if ( pinLink.length ) {
    $.getJSON('https://api.pinterest.com/v1/urls/count.json?url=' + permalink + '&callback=?', function(data) {
      pinShares = data.count;
      pinLink.find('.share-count').text(pinShares).addClass('is-loaded');
    });
  };

  if ( googleLink.length ) {
    // Can't currently get Google+ count with JS, so just pretend it loaded
    googleLink.find('.share-count').addClass('is-loaded');
  }

  // Share popups
  shareLinks.on('click', function(e) {
    console.log('test');
    e.preventDefault();
    var el = $(this),
        popup = el.attr('class'),
        link = el.attr('href'),
        w = 700,
        h = 400;

    // Set popup sizes
    switch (popup) {
      case 'share-twitter':
        h = 300;
        break;
      case 'share-fancy':
        w = 480;
        h = 720;
        break;
      case 'share-google':
        w = 500;
        break;
    }

    window.open(link, popup, 'width=' + w + ', height=' + h);
  });
}

$(function() {
  window.CSbuttons.init();
});
