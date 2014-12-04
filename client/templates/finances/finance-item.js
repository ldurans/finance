Template.financeItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  amount: function() {
    var amount = this.amount;
    var type = this.financeType;
    if (type == "Income") {
      return "+£"+amount;
    } else if (type == "Expense") {
      return "-£"+amount;
    }
  }
});
