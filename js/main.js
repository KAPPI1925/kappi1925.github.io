(function () {
  "use strict";

  var isMobile = {
    any: function () {
      return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
    },
  };

  var fullHeight = function () {
    if (!isMobile.any()) {
      $(".js-fullheight").css("height", $(window).height());
      $(window).resize(function () {
        $(".js-fullheight").css("height", $(window).height());
      });
    }
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
            scrollTop: $('[data-section="' + section + '"]').offset().top - 55,
          },
          500
        );
      }

      if (navbar.is(":visible")) {
        navbar.removeClass("in");
        navbar.attr("aria-expanded", "false");
        $(".js-colorlib-nav-toggle").removeClass("active");
      }

      event.preventDefault();
      return false;
    });
  };

  var navActive = function (section) {
    var $el = $("#navbar > ul");
    $el.find("li").removeClass("active");
    $el.each(function () {
      $(this)
        .find('a[data-nav-section="' + section + '"]')
        .closest("li")
        .addClass("active");
    });
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
        offset: "150px",
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
          return -$(this.element).height() + 155;
        },
      }
    );
  };

  function renderPublications(publications) {
    const reposContainer = document.getElementById("repos");
    const sortedPublications = publications.sort((a, b) => b.stats.citations - a.stats.citations);
    const reposHTML = sortedPublications
      .map(
        (repo) => `
      <div class="repo-card" style="flex: 1 0 48%; display: flex; flex-direction: column; justify-content: space-between; border-radius: 12px; padding: 16px; font-size: 14px; background: linear-gradient(135deg, #4CCEFF, #00AEEF); box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px; transition: transform 0.2s ease-in-out; cursor: pointer;">
        <a href="${repo.url}" target="_blank" style="text-decoration: none; color: black; display: block; height: 100%;">
          <h4 class="repo-heading" style="margin: 0px; font-size: 18px; font-weight: bold;">${repo.title}</h4>
          <p class="repo-description" style="margin-top: 8px; font-size: 12px; color: rgb(85, 85, 85);">${repo.description}</p>
          <div style="display: flex; align-items: center; gap: 16px; margin-top: 12px; font-size: 12px; color: rgb(102, 102, 102);">
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="https://img.icons8.com/ios-filled/20/financial-growth-analysis.png" alt="research score">
              ${repo.stats.researchInterest}
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="https://img.icons8.com/ios-glyphs/16/quote-right.png" alt="citation">
              ${repo.stats.citations}
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <img src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/24/external-eye-graphic-design-tanah-basah-glyph-tanah-basah.png" alt="views">
              ${repo.stats.reads}
            </div>
          </div>
        </a>
      </div>
    `
      )
      .join("");
    reposContainer.innerHTML = `<div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between;">${reposHTML}</div>`;
  }

  function calculateResearchInterest(publications) {
    const totalResearchInterest = publications.reduce((total, repo) => total + repo.stats.researchInterest, 0);
    researchGateProfile.stats.researchInterest = totalResearchInterest.toFixed(1);
  }

  $(function () {
    fullHeight();
    counterWayPoint();
    contentWayPoint();
    burgerMenu();
    clickMenu();
    navigationSection();
    mobileMenuOutsideClick();
    detectDayNightMode();
    calculateResearchInterest(publications);
    renderPublications(publications);
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
