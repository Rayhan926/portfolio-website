$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);
  let tl = gsap.timeline();
  tl.pause();
  tl.to(".mobile_full_view_nav_wrap", {
    width: "100%",
    //opacity: "1",
    //pointerEvents: "all",
    duration: 0.5,
    ease: Expo.easeInOut,
  })
    .to(".off_wrap", {
      height: "0%",
      duration: 0.2,
      //stagger: 0.2,
      ease: Power0.easeInOut,
    })
    .to(
      ".mobile_full_view_nav_wrap .fill_color",
      {
        height: "100%",
        duration: 1.2,
        ease: Expo.easeInOut,
      },
      "-=0.2"
    );

  /**
   * Page Loading After Animation
   */
  let tl2 = gsap.timeline({ defaults: { ease: Power0.easeInOut } });
  tl2
    .to(".loading_wrap .loading_part", {
      scaleY: 0,
      transformOrigin: "bottom left",
      duration: 0.4,
      ease: Power0.easeInOut,
      stagger: 0.1,
      //opacity: "0",
    })
    .from(
      ".hero_content_wrap",
      {
        y: 70,
        duration: 1,
        opacity: "0",
        ease: Expo.easeInOut,
      },
      "-=0.5"
    )

    .from(
      ".social_icons_wrap ul li",
      {
        marginLeft: "-100px",
        duration: 0.4,
        stagger: 0.2,
        ease: Expo.easeInOut,
      },
      "-=0.6"
    )
    .to(
      ".header_area",
      {
        y: 0,
        duration: 1,
        opacity: "1",
      },
      "-=1.2"
    );

  gsap.to(".ex_img_wrap", {
    scrollTrigger: {
      trigger: ".ex_img_wrap",
      start: "top 45%",
      end: "bottom 20%",
      //markers: true,
      //scrub: true,
    },
    height: "100%",
    duration: 0.3,
    ease: Power0.easeInOut,
  });
  gsap.to(".ex_img_wrap img", {
    scrollTrigger: {
      trigger: ".ex_img_wrap img",
      start: "top 45%",
    },
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    duration: 0.3,
    delay: 0.5,
  });
  gsap.from(".about_me_content_wrap", {
    scrollTrigger: {
      trigger: ".about_me_content_wrap",
      start: "top 55%",
    },
    y: 100,
    opacity: "0",
    duration: 0.6,
  });
  gsap.from(".single_skill_wrap", {
    scrollTrigger: {
      trigger: ".single_skill_wrap",
      start: "top 50%",
    },
    x: -100,
    opacity: "0",
    duration: 0.2,
    stagger: 0.2,
  });
  gsap.from(".single_service_wrap", {
    scrollTrigger: {
      trigger: ".single_service_wrap",
      start: "top 50%",
    },
    y: 100,
    opacity: "0",
    duration: 0.2,
    stagger: 0.2,
  });

  /**
   *
   *
   *
   */
  var open = false;
  $(".menu__btn").click(function () {
    if (open) {
      tl.reverse(0.5);
      open = false;
    } else {
      tl.play();
      open = true;
    }
    $(".menu__btn").toggleClass("open_nav");
  });

  $("svg.radial-progress").each(function (index, value) {
    $(this).find($("circle.complete")).removeAttr("style");
  });
  $(window)
    .scroll(function () {
      $("svg.radial-progress").each(function (index, value) {
        // If svg.radial-progress is approximately 25% vertically into the window when scrolling from the top or the bottom
        if (
          $(window).scrollTop() >
            $(this).offset().top - $(window).height() * 0.75 &&
          $(window).scrollTop() <
            $(this).offset().top + $(this).height() - $(window).height() * 0.25
        ) {
          // Get percentage of progress
          percent = $(value).data("percentage");
          // Get radius of the svg's circle.complete
          radius = $(this).find($("circle.complete")).attr("r");
          // Get circumference (2πr)
          circumference = 2 * Math.PI * radius;
          // Get stroke-dashoffset value based on the percentage of the circumference
          strokeDashOffset = circumference - (percent * circumference) / 100;
          // Transition progress for 1.25 seconds
          $(this)
            .find($("circle.complete"))
            .animate({ "stroke-dashoffset": strokeDashOffset }, 1250);
        }
      });
    })
    .trigger("scroll");

  let $btns = $(".work_filter_buttons_wrap button");

  $btns.click(function (e) {
    $(".work_filter_buttons_wrap button").removeClass("active");
    $(this).addClass("active");

    let selector = $(e.target).attr("data-filter");

    $(".work_grid_wrap").isotope({
      filter: selector,
    });

    return false;
  });

  $(".work_filter_buttons_wrap button.active").trigger("click");

  $(".testimonials_carousel_wrap").owlCarousel({
    loop: true,
    autoplay: false,
    dots: false,
    nav: true,
    navText: [
      $(".owl_navigation_wrap .navigation_prev"),
      $(".owl_navigation_wrap .navigation_next"),
    ],
    responsive: {
      0: {
        items: 1,
      },
    },
  });

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll < 200) {
      $(".header_area").removeClass("fixed_header");
      $(".go_top").removeClass("show_go_top");
    } else {
      $(".header_area").addClass("fixed_header");
      $(".go_top").addClass("show_go_top");
    }
  });
  $(".go_top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      300
    );
  });
});
