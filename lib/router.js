Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('finances'); }
});

Router.route('/', {name: 'home'});
Router.route('/projects', {name: 'projects'});

Router.route('/finances', {name: 'financeDashboard'});
Router.route('/finances/list', {name: 'financeList'});
Router.route('/finances/list/:_id', {
  name: 'financeItemPage',
  data: function() { return Finances.findOne(this.params._id); }
});
Router.route('/finances/list/:_id/edit', {
  name: 'financeEdit',
  data: function () { return Finances.findOne(this.params._id); }
});
Router.route('/finances/new', {name: 'financeSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'financeItemPage'});
Router.onBeforeAction(requireLogin, {only: 'financeSubmit'});
