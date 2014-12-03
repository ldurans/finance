Meteor.publish('finances', function() {
  return Finances.find();
});
