Finances = new Mongo.Collection('finances');

Finances.allow({
  update: function(userId, finance) { return ownsDocument(userId, finance); },
  remove: function(userId, finance) { return ownsDocument(userId, finance); },
})

Finances.deny({
  update: function(userId, finance, fieldNames) {
    return (_.without(fieldNames, 'title', 'financeType', 'amount', 'timing').length > 0);
  }
});

Meteor.methods({
  financeInsert: function(financeAttributes) {
    check(Meteor.userId(), String);
    check(financeAttributes, {
      title: String,
      financeType: String,
      amount: String,
      timing: String
    });

    var user = Meteor.user();
    var finance = _.extend(financeAttributes, {
      userId: user._id,
      submitted: new Date()
    });
    var financeId= Finances.insert(finance);
    return {
      _id: financeId
    };
  }
});
