'use strict';

var admin_app = admin_app||{};
var app = app||{};

(function(module) {

  const memberView = {};

  memberView.render = function(rawData) {
    rawData.imgPath = rawData.imgPath;
    let template = Handlebars.compile($('#admin-member-template').text());
    return template(rawData);
  };

  memberView.addMembers = function() {
    app.members.all.forEach(ind => {
      $('#admin_members').append(memberView.render(ind));
    });
  };

  app.members.fetchRows(memberView.addMembers);

  module.memberView = memberView;
})(admin_app);
