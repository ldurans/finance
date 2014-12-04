Template.financeSubmit.events({
  'submit form': function (e) {
    e.preventDefault();

    var finance = {
      title: $(e.target).find('[name=title]').val(),
      financeType: $(e.target).find('[name=financeType]').val(),
      amount: $(e.target).find('[name=amount]').val(),
      timing: $(e.target).find('[name=timing]').val()
    }

    Meteor.call('financeInsert', finance, function(error, result) {
      if (error) {
        return alert(error.reason);
      }

      Router.go('financeItemPage', {_id: result._id});
    });
  }
});
Template.financeSubmit.rendered = function() {
   $('#startDate').datepicker({
     format: 'dd/mm/yyyy'
   });
}
