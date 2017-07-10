'use strict';

var app = app||{};

(function(module) {

  const memberView = {};

  memberView.render = function(rawData) {
    let template = Handlebars.compile($('#member-template').text());
    return template(rawData);
  };

  memberView.addMembers = function() {
    app.members.all.forEach(ind => {
      $('#members').append(memberView.render(ind));
    });
  };

  app.members.fetchRows(memberView.addMembers);

  module.memberView = memberView;
})(app);
