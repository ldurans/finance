Template.home.events({
  "click .project": function(e) {
    var current = $(e.target).closest(".project");
    var parentHeight = $(current).parent().height();
    $(current).siblings(".project").fadeOut("fast");
    $(".back").show();
    $(current).css("height",parentHeight).animate({
      "top":0
    }, function() {
      $(current).children(".content").fadeIn("fast");
    });
  }
});
