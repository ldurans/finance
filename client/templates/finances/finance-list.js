Template.financeList.helpers({
  financesIncome: function() {
    return Finances.find({financeType: 'Income'}, {sort: {title: 1}});
  },
  financesExpense: function() {
    return Finances.find({financeType: 'Expense'}, {sort: {title: 1}});
  }
});
