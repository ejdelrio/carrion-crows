'use strict';

$('nav img').on('click', function() {
  $('nav ul').slideToggle('fast');
});

$('nav a').on('click', function() {
  if(window.innerWidth < 640) {
    console.lo
    $('nav ul').slideToggle('fast');
  }
});
