Template.financeItemPage.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  }
});
