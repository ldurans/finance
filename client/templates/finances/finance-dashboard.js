Template.financeDashboard.helpers({
  weeklyIncome: function() {
    var finishedLoop = setIncome("Weekly");
    return finishedLoop;
  },
  weeklyExpense: function() {
    var finishedLoop = setExpense("Weekly");
    return finishedLoop;
  },
  weeklyTotal: function() {
    var totalAmount;
    var finishedLoopIncome = setIncome("Weekly");
    var finishedLoopExpense = setExpense("Weekly");

    totalAmount = finishedLoopIncome - finishedLoopExpense;
    if (totalAmount > -1) {
      totalAmount = "<span class='Income'>£"+totalAmount+"</span>";
    } else {
      totalAmount = "<span class='Expense'>£"+totalAmount+"</span>";
    }
    return totalAmount;
  },
  monthlyIncome: function() {
    var finishedLoop = setIncome("Monthly");
    return finishedLoop;
  },
  monthlyExpense: function() {
    var finishedLoop = setExpense("Monthly");
    return finishedLoop;
  },
  monthlyTotal: function() {
    var totalAmount;
    var finishedLoopIncome = setIncome("Monthly");
    var finishedLoopExpense = setExpense("Monthly");

    totalAmount = finishedLoopIncome - finishedLoopExpense;
    if (totalAmount > -1) {
      totalAmount = "<span class='Income'>£"+totalAmount+"</span>";
    } else {
      totalAmount = "<span class='Expense'>£"+totalAmount+"</span>";
    }
    return totalAmount;
  },
  annualIncome: function() {
    var finishedLoop = setIncome("Annually");
    return finishedLoop;
  },
  annualExpense: function() {
    var finishedLoop = setExpense("Annually");
    return finishedLoop;
  },
  annualTotal: function() {
    var totalAmount;
    var finishedLoopIncome = setIncome("Annually");
    var finishedLoopExpense = setExpense("Annually");

    totalAmount = finishedLoopIncome - finishedLoopExpense;
    if (totalAmount > -1) {
      totalAmount = "<span class='Income'>£"+totalAmount+"</span>";
    } else {
      totalAmount = "<span class='Expense'>£"+totalAmount+"</span>";
    }
    return totalAmount;
  }
});
Template.financeDashboard.rendered=function() {
  var timingIncome = setIncome("Monthly");
  var timingExpense = setExpense('Monthly');
  var ctxw = document.getElementById("financeGraphMonthly").getContext("2d");
  var data = {
    labels : ["Monthly Income","Monthly Expense"],
    datasets : [
      {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : [timingIncome,timingExpense]
      }
    ]
  }
  var myNewChart = new Chart(ctxw).Bar(data,null);
}

var setIncome = function(timing) {
  var finishedLoop = financesLoop(
    Finances.find({userId: Meteor.userId(), financeType: "Income"}).fetch(),
    0,
    timing
  );
  return finishedLoop;
}

var setExpense = function(timing) {
  var finishedLoop = financesLoop(
    Finances.find({userId: Meteor.userId(), financeType: "Expense"}).fetch(),
    0,
    timing
  );
  return finishedLoop;
}



var financesLoop = function(userFinances, totalIncome, timingLoop) {
  $(userFinances).each(function() {
    var current = this, newAmount;
    if (timingLoop == "Weekly") {
      newAmount = financesCheckWeekly(current);
    } else if (timingLoop == "Monthly") {
      newAmount = financesCheckMonthly(current);
    } else if (timingLoop == "Annually") {
      newAmount = financesCheckAnnually(current);
    }

    totalIncome = parseInt(totalIncome + newAmount);
  });
  return totalIncome;
}

var financesCheckWeekly = function(current) {
  var newAmount = 0;
  if (current.timing == "One-Off") {
    newAmount = 0;
  } else if (current.timing == "Weekly") {
    newAmount = (parseInt(current.amount));
  } else if (current.timing == "Monthly") {
    newAmount = Math.round((parseInt(current.amount) * 12) / 52);
  } else if (current.timing == "Annualy") {
    newAmount = Math.round(parseInt(current.amount) / 52);
  }

  return newAmount;
}

var financesCheckMonthly = function(current) {
  var newAmount = 0;
  if (current.timing == "One-Off") {
    newAmount = 0;
  } else if (current.timing == "Weekly") {
    newAmount = Math.round((parseInt(current.amount) * 52)/12);
  } else if (current.timing == "Monthly") {
    newAmount = parseInt(current.amount);
  } else if (current.timing == "Annualy") {
    newAmount = Math.round(parseInt(current.amount) / 12);
  }

  return newAmount;
}

var financesCheckAnnually = function(current) {
  var newAmount = 0;
  if (current.timing == "One-Off") {
    newAmount = 0;
  } else if (current.timing == "Weekly") {
    newAmount = parseInt(current.amount) * 52;
  } else if (current.timing == "Monthly") {
    newAmount = parseInt(current.amount) * 12;
  } else if (current.timing == "Annualy") {
    newAmount = parseInt(current.amount);
  }

  return newAmount;
}
