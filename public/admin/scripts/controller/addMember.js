'use strict';

var admin_app = admin_app||{};
var app = app||{};

(function(module) {

  const addMember = {};

  addMember.showForm = function () {
    let $addMember = $('#band-members>button');
    $addMember.on('click', function(){
      $('#add-member').show();
    });
  };

  addMember.hideForm = function () {
    let $addMember = $('#cancel-add');
    $addMember.on('click', function(){
      let values = $('#add-member>form').find('input');
      values.each((ind, ele) => {
        $(ele).val('');
      });
      $('#add-member').hide();
    });
  };

  addMember.submitAdd = function() {
    let values = $('#add-member>form').find('input');
    let valArray = [];
    values.each((ind, ele) => valArray.push($(ele).val()));
    if(valArray.includes('')) {
      return alert('Please fill out all forms!');
    }
    $.post('/add-member', {first: valArray[0],
      last: valArray[1],
      instrument: valArray[2],
      bio: valArray[3],
      imgPath: valArray[4]})
      .then(data => alert(data))
      .then(addMember.hideForm)
      .then(() => {
        location.reload();
      });
  };


  module.addMember = addMember;
})(admin_app);

admin_app.addMember.showForm();
admin_app.addMember.hideForm();
$('#submit-add').on('click', admin_app.addMember.submitAdd);
