'use strict';

function navHandler() {
  $('nav a').each((_, ele) => {
    let target = $(ele).text().toLowerCase();

    page(`/${target}`, () => {
      $(`#${target}`).show().siblings().hide();
    });
  });
}

navHandler();
page();
