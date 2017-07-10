'use strict';

$('nav img').on('click', function() {
  $('nav ul').slideToggle('fast');
});

$(window).resize(function() {
  window.outerWidth >= 640 ? $('nav ul').show() : null;
});
