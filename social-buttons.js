/*============================================================================
  Social Icon Buttons v1.0
  Author:
    Carson Shold | @cshold
    http://www.carsonshold.com
  MIT License
==============================================================================*/
window.CSbuttons = window.CSbuttons || {};

CSbuttons.init = function () {
  var $shareLinks = $('.social-sharing').find('a');

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
