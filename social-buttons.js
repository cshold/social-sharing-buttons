/*============================================================================
  Social Icon Buttons v1.0
  Author:
    Carson Shold | @cshold
    http://www.carsonshold.com
  MIT License
==============================================================================*/
window.CSbuttons = window.CSbuttons || {};

$(function() {
  CSbuttons.cache = {
    $shareButtons: $('.social-sharing')
  }
});

CSbuttons.init = function () {
  CSbuttons.socialSharing();
}

CSbuttons.socialSharing = function () {
  var $buttons = CSbuttons.cache.$shareButtons,
      $shareLinks = $buttons.find('a'),
      permalink = $buttons.attr('data-permalink');

  // Get share stats from respective APIs
  var $fbLink = $('.share-facebook'),
      $twitLink = $('.share-twitter'),
      $pinLink = $('.share-pinterest'),
      $googleLink = $('.share-google'),
      $redditLink = $('.share-reddit'),
      $linkedinLink = $('.share-linkedin'),
      $skypeLink = $('.share-skype');

  if ( $fbLink.length ) {
    $.getJSON('https://graph.facebook.com/?id=' + permalink + '&callback=?')
      .done(function(data) {
        if (data.shares) {
          $fbLink.find('.share-count').text(data.shares).addClass('is-loaded');
        } else {
          $fbLink.find('.share-count').remove();
        }
      })
      .fail(function(data) {
        $fbLink.find('.share-count').remove();
      });
  };

  if ( $twitLink.length ) {
    $.getJSON('https://cdn.api.twitter.com/1/urls/count.json?url=' + permalink + '&callback=?')
      .done(function(data) {
        if (data.count > 0) {
          $twitLink.find('.share-count').text(data.count).addClass('is-loaded');
        } else {
          $twitLink.find('.share-count').remove();
        }
      })
      .fail(function(data) {
        $twitLink.find('.share-count').remove();
      });
  };

  if ( $pinLink.length ) {
    $.getJSON('https://api.pinterest.com/v1/urls/count.json?url=' + permalink + '&callback=?')
      .done(function(data) {
        if (data.count > 0) {
          $pinLink.find('.share-count').text(data.count).addClass('is-loaded');
        } else {
          $pinLink.find('.share-count').remove();
        }
      })
      .fail(function(data) {
        $pinLink.find('.share-count').remove();
      });
  };

  if ( $googleLink.length ) {
    // Can't currently get Google+ count with JS, so just pretend it loaded
    $googleLink.find('.share-count').addClass('is-loaded');
  }

  if ( $redditLink.length ) {
    // Can't currently get reddit count with JS, so just pretend it loaded
    $redditLink.find('.share-count').addClass('is-loaded');
  }

  if ( $linkedinLink.length ) {
    $.getJSON('http://www.linkedin.com/countserv/count/share?url=' + permalink + '&callback=?')
      .done(function(data) {
        if (data.count > 0) {
          $linkedinLink.find('.share-count').text(data.count).addClass('is-loaded');
        } else {
          $linkedinLink.find('.share-count').remove();
        }
      })
      .fail(function(data) {
        $linkedinLink.find('.share-count').remove();
      });
  };

  if ( $skypeLink.length ) {
    // Can't currently get skype count with JS, so just pretend it loaded
    $skypeLink.find('.share-count').addClass('is-loaded');
  }

  // Share popups
  $shareLinks.on('click', function(e) {
    var el = $(this),
        popup = el.attr('class').replace('-','_'),
        link = el.attr('href'),
        w = 700,
        h = 400;

    // Set popup sizes
    switch (popup) {
      case 'share_twitter':
        h = 300;
        break;
      case 'share_fancy':
        w = 480;
        h = 720;
        break;
      case 'share_google':
        w = 500;
        break;
      case 'share_reddit':
        popup = false;
        break;
      case 'share_skype':
        w = 300;
        h = 720;
        break;
    }

    if (popup) {
        e.preventDefault();
        window.open(link, popup, 'width=' + w + ', height=' + h);
    }
  });
}

$(function() {
  window.CSbuttons.init();
});
