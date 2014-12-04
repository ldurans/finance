Template.financeEdit.helpers({
  selectedTypeIncome: function() {
    isSelected(Finances.findOne({_id: id}, {fields: {financeType: 1}}).financeType, "Income");
  },
  selectedTypeExpense: function() {
    isSelected(Finances.findOne({_id: id}, {fields: {financeType: 1}}).financeType, "Expense");
  },
  selectedTiming1: function() {
    isSelected(Finances.findOne({_id: id}, {fields: {timing: 1}}).timing, "One-Off");
  },
  selectedTiming2: function() {
    isSelected(Finances.findOne({_id: id}, {fields: {timing: 1}}).timing, "Weekly");
  },
  selectedTiming3: function() {
    isSelected(Finances.findOne({_id: id}, {fields: {timing: 1}}).timing, "Monthly");
  },
  selectedTiming4: function() {
    isSelected(Finances.findOne({_id: id}, {fields: {timing: 1}}).timing, "Annually");
  },
  ownPost: function() {
    return this.userId === Meteor.userId();
  }
});

function isSelected(current, checkName) {
  if (current == checkName) {
    return "selected";
  }
}
Template.financeEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentFinanceId = this._id;

    var financeProperties = {
      title: $(e.target).find('[name=title]').val(),
      financeType: $(e.target).find('[name=financeType]').val(),
      amount: $(e.target).find('[name=amount]').val(),
      timing: $(e.target).find('[name=timing]').val()
    }

    Finances.update(currentFinanceId, {$set: financeProperties}, function(error) {
      if (error) {
        alert(error.reason);
      } else {
        Router.go('financeItemPage', {_id: currentFinanceId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm('Are you sure that you want to delete this post?')) {
      var currentFinanceId = this._id;
      Finances.remove(currentFinanceId);
      Router.go('financeList');
    }
  }
});
