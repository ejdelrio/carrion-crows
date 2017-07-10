'use strict';

const navHandler = () => {
  //Function will iterate through all nav tabs and assign them to an element with an ID of the same name.
  //When a url request with the same name as the element id is made, that element is displayed while it's immediate siblings are hidden.
  let $nav = $('nav');
  $nav.find('a').each((ind, ele) => {
    ele = $(ele);
    page(`/${ele.html()}`, () => {
      console.log($(`#${ele.html().toLowerCase()}`));
      $(`#${ele.html().toLowerCase()}`).show().siblings().hide();
    });
  });
};

navHandler();
page();
