'use strict';

var app = app||{};

(function(module) {

  const Member = function(tableRow) {
    this.first = tableRow.first_name;
    this.last = tableRow.last_name;
    this.instruments = tableRow.instrument;
    this.bio = tableRow.bio;
    this.imgPath = tableRow.img_path;
    Member.all.push(this);
  };

  Member.all = [];

  Member.fetchRows = function(callback) {
    $.get('/members').then(result => {
      result.forEach(row => new Member(row));
    }).then(() => {
      callback();
    });
  };

  module.members = Member;
})(app);
