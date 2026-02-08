(function () {
  "use strict";

  var isMobile = {
    any: function () {
      return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
    },
  };

  var fullHeight = function () {
    // Full height not needed for top header layout
    // Header is horizontal, not fixed height
  };

  var headerAnimation = function () {
    // Animate header on page load
    setTimeout(function () {
      $("#colorlib-aside").addClass("fadeInDown animated");
    }, 100);
  };

  var counterWayPoint = function () {
    if ($("#colorlib-counter").length > 0) {
      $("#colorlib-counter").waypoint(
        function (direction) {
          if (direction === "down" && !$(this.element).hasClass("animated")) {
            setTimeout(counter, 400);
            $(this.element).addClass("animated");
          }
        },
        { offset: "90%" }
      );
    }
  };

  var contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
      function (direction) {
        if (direction === "down" && !$(this.element).hasClass("animated")) {
          i++;
          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  el.addClass(effect ? `${effect} animated` : "fadeInUp animated");
                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "85%" }
    );
  };

  var burgerMenu = function () {
    $(".js-colorlib-nav-toggle").on("click", function (event) {
      event.preventDefault();
      var $this = $(this);
      $("body").toggleClass("offcanvas");
      $this.toggleClass("active");
    });
  };

  var touchSwipeMenu = function () {
    var touchStartX = 0;
    var touchEndX = 0;
    var touchStartY = 0;
    var touchEndY = 0;

    document.addEventListener(
      "touchstart",
      function (event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
      },
      false
    );

    document.addEventListener(
      "touchend",
      function (event) {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;

        var diffX = touchStartX - touchEndX;
        var diffY = Math.abs(touchStartY - touchEndY);

        // Swipe left (right to left) with minimal vertical movement
        if (diffX > 50 && diffY < 50) {
          // Open menu when swiping from right to left
          if (!$("body").hasClass("offcanvas")) {
            $("body").addClass("offcanvas");
            $(".js-colorlib-nav-toggle").addClass("active");
          }
        }
        // Swipe right (left to right) to close menu
        else if (diffX < -50 && diffY < 50) {
          if ($("body").hasClass("offcanvas")) {
            $("body").removeClass("offcanvas");
            $(".js-colorlib-nav-toggle").removeClass("active");
          }
        }
      },
      false
    );
  };

  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $("body").removeClass("offcanvas");
        $(".js-colorlib-nav-toggle").removeClass("active");
      }
    });

    $(window).scroll(function () {
      if ($("body").hasClass("offcanvas")) {
        $("body").removeClass("offcanvas");
        $(".js-colorlib-nav-toggle").removeClass("active");
      }
    });
  };

  var clickMenu = function () {
    $('#navbar a:not([class="external"])').click(function (event) {
      var section = $(this).data("nav-section"),
        navbar = $("#navbar");

      if ($('[data-section="' + section + '"]').length) {
        $("html, body").animate(
          {
            scrollTop: $('[data-section="' + section + '"]').offset().top - 80,
          },
          500
        );
      }

      if (navbar.is(":visible")) {
        navbar.removeClass("in");
        navbar.attr("aria-expanded", "false");
        $(".js-colorlib-nav-toggle").removeClass("active");
        $("body").removeClass("offcanvas");
      }

      event.preventDefault();
      return false;
    });
  };

  var navActive = function (section) {
    var $el = $("#nav-menu");
    $el.find("li").removeClass("active");
    $el.find('a[data-nav-section="' + section + '"]')
      .closest("li")
      .addClass("active");
  };

  var navigationSection = function () {
    var $section = $("section[data-section]");

    $section.waypoint(
      function (direction) {
        if (direction === "down") {
          navActive($(this.element).data("section"));
        }
      },
      {
        offset: "100px",
      }
    );

    $section.waypoint(
      function (direction) {
        if (direction === "up") {
          navActive($(this.element).data("section"));
        }
      },
      {
        offset: function () {
          return -$(this.element).height() + 105;
        },
      }
    );
  };

  $(function () {
    headerAnimation();
    fullHeight();
    counterWayPoint();
    contentWayPoint();
    burgerMenu();
    touchSwipeMenu();
    clickMenu();
    navigationSection();
    mobileMenuOutsideClick();
    detectDayNightMode();
  });
})();

var Accordion = function (el, multiple) {
  this.el = el || {};
  this.multiple = multiple || false;
  var links = this.el.find(".link");
  links.on("click", { el: this.el, multiple: this.multiple }, this.dropdown);
};

Accordion.prototype.dropdown = function (e) {
  var $el = e.data.el;
  var $this = $(this), $next = $this.next();

  $next.slideToggle();
  $this.parent().toggleClass("open");

  if (!e.data.multiple) {
    $el.find(".submenu").not($next).slideUp().parent().removeClass("open");
  }
};

var accordion = new Accordion($("#accordion"), false);

function enableDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function detectDayNightMode() {
  const hours = new Date().getHours();
  if (hours <= 6 || hours >= 22) {
    enableDarkMode();
  }
}

// Navigation scroll function for horizontal scrolling
function scrollNav(direction) {
  const navWrapper = document.querySelector('.nav-scroll-wrapper');
  const scrollAmount = 200; // pixels to scroll

  if (direction === 'left') {
    navWrapper.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  } else if (direction === 'right') {
    navWrapper.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
}

// Auto-scroll navigation when item is clicked
document.addEventListener('DOMContentLoaded', function () {
  const navWrapper = document.querySelector('.nav-scroll-wrapper');
  const navItems = document.querySelectorAll('#nav-menu li a');

  navItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const listItem = this.parentElement;
      const itemLeft = listItem.offsetLeft;
      const itemWidth = listItem.offsetWidth;
      const wrapperWidth = navWrapper.offsetWidth;

      // Scroll to position the clicked item towards the left (about 20% from left edge)
      // This leaves room to see more items to the right
      const targetScroll = itemLeft - (wrapperWidth * 0.2);

      navWrapper.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    });
  });

  // Scroll to top button functionality
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });
  
  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
