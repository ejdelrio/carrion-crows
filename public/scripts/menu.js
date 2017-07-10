'use strict';

$('nav img').on('click', function() {
  $('nav ul').slideToggle('fast');
});

$('nav li').on('click', function() {
  $('nav ul').slideToggle('fast');
});

$(window).resize(function() {
  console.log(window.innerWidth);
  window.innerWidth > 640 ? $('nav ul').show() : null;
});
