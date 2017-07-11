'use strict';

var admin_app = admin_app||{};
var app = app||{};

(function(module) {

  const modMember = {};

  modMember.delete = function() {
    let $button = $('#admin_members button').filter((ind, ele) =>
    $(ele).text() === 'Delete');


    $button.each((ind, ele) => {
      $(ele).on('click', function() {
        let target = ele.name.split('-')[1];
        confirm('Are you sure you want to delete this member?') ?
        modMember.databaseDelete(target) : null;
      });
    });
  };

  modMember.databaseDelete = function(memberId) {
    $.ajax({
      url: `/member/${memberId}`,
      method: 'DELETE'
    })
    .then(console.log)
    .then(() => location.reload());
  };

  modMember.edit = function() {
    let $button = $('#admin_members button').filter((ind, ele) =>
    $(ele).text() === 'Edit');

    $button.each((ind, ele) => {
      $(ele).on('click', function() {

      });
    });
  };

  module.modMember = modMember;
})(admin_app);
