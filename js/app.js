$(function () {
  $(window).scrollTop(0);

  // Start of back to top button
  var btn = $("#back-to-top");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass("show");
    } else {
      btn.removeClass("show");
    }
  });

  btn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });
  // End of back to top button

  // page animation
  $.fn.isOnScreen = function () {
    var elementTop = $(this).offset().top,
      elementBottom = elementTop + $(this).outerHeight(),
      viewportTop = $(window).scrollTop(),
      viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  function detection() {
    for (var i = 0; i < items.length; i++) {
      var el = $(items[i]);

      if (el.isOnScreen()) {
        el.addClass("in-view");
      } else {
        el.removeClass("in-view");
      }
    }
  }

  var items = document.querySelectorAll(
      "*[data-animate-in], *[data-detect-viewport]"
    ),
    waiting = false,
    w = $(window);

  w.on("resize scroll", function () {
    if (waiting) {
      return;
    }
    waiting = true;
    detection();

    setTimeout(function () {
      waiting = false;
    }, 100);
  });

  $(document).ready(function () {
    setTimeout(function () {
      detection();
    }, 500);

    for (var i = 0; i < items.length; i++) {
      var d = 0,
        el = $(items[i]);
      if (items[i].getAttribute("data-animate-in-delay")) {
        d = items[i].getAttribute("data-animate-in-delay") / 1000 + "s";
      } else {
        d = 0;
      }
      el.css("transition-delay", d);
    }
  });
  // end of page animation

  // start of tooltip
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  // end of tooltip

  $("#modeToggle ~ label").click(function () {
    $(this).attr(
      "aria-checked",
      $(this).attr("aria-checked") === "true" ? "false" : "true"
    );
  });

  $("#modeToggle ~ label").keydown(function (event) {
    if (event.key === " ") {
      event.preventDefault();
      $("#modeToggle").prop("checked", !$("#modeToggle").prop("checked"));
      $("#modeToggle").trigger("change");

      $(this).attr(
        "aria-checked",
        $(this).attr("aria-checked") === "true" ? "false" : "true"
      );
    }
  });

  $("#modeToggle").change(function () {
    $("#section4").toggleClass("dark-mode", this.checked);
    $(".dark-wavy-arrow").toggleClass("d-none", this.checked);
    $(".white-wavy-arrow").toggleClass("d-none", !this.checked);
  });
});
