$(document).ready(function(){

  var $animation_elements = $('.animation-element');
  var $window = $(window);
  $('.modal').modal('show');

  //initialize map
  function initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaW5kaWN1YmUiLCJhIjoiY2lqc2JjN21oMGhiNHZhbHh5MjRkNGh3ayJ9.mziNQDmuq5Y2jyFZDhVudg';
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/indicube/ciq80ty8u009obem5szhpb45t', //stylesheet location
      center: [114.112, 22.365], // starting position
      zoom: 16 // starting zoom
    });
    map.scrollZoom.disable();
    if (window.innerWidth < 720) {
      map.dragPan.disable();
      map.doubleClickZoom.disable();
    }

    new mapboxgl.Marker($('#marker')[0], {
      offset: [-75, -60]
    })
    .setLngLat([114.112723, 22.365542])
    .addTo(map)
  };
  initMap();


  /* * * * * * * * * * * * * * *
   * Toggle nav menu content
   * * * * * * * * * * * * * * */


  $('#nav-menu-image').on("click", function() {
    console.log("nav image clicked");
    $('#nav-menu-content').addClass('activate');
    $('#nav-menu-content').css('visibility', 'visible');
  });

  $('#nav-cross').on("click", function(){
    $('#nav-menu-content').removeClass('activate');
    $('#nav-menu-content').css('visibility', 'hidden');
  });

  $('#nav-menu-content li a').on('click', function(){
    if ($(this).parent().children('ul').css('display') === 'block') {
      $(this).parent().children('ul').css('display', 'none');
    }
    else {
      $(this).parent().children('ul').css('display', 'block');
    }
  });


  /* * * * * * * * * * * * * * *
  * Video
  * * * * * * * * * * * * * * */

  var video = $('video');

  if ($(window).innerWidth() <= 720) {
    $('video')[0].src = $('video .hero-vid-mobile').attr('src');
  } else {
    $('video')[0].src = $('video .hero-vid-desktop').attr('src');
  }

  var displayVideo = function (e, isNext) {
    if (!video.get(0).paused) {
        video.get(0).pause();
        video.get(0).currentTime = 0;
        $('video').css('display', 'none');
      if (isNext) {
        $('#cover-image').css('display', 'block');
        $('#hero-body-text').css('visibility', 'visible');
        return;
      } else {
        $('#cover-image').css('display', 'block');
        $('#hero-section .title-container').css('display', 'block');
        $('#nav-menu').css('visibility', 'visible');
        return;
      }
    } else {
        if (isNext) {
          video.css('display', 'block');
          video.get(0).play();
          $('#cover-image').css('display', 'none');
          $('#hero-section .title-container').css('display', 'none');
        } else {
          video.get(0).pause();
          video.get(0).currentTime = 0;
          $('video').css('display', 'none');
          $('#cover-image').css('display', 'block');
          $('#hero-section .title-container').css('display', 'block');
          $('#hero-body-text').css('visibility', 'hidden');
          $('#nav-menu').css('visibility', 'visible');
        }
    }
  };

  video.on('ended', function(){
    $('video').css('display', 'none');
    $('#cover-image').css('display', 'block');
    $('#hero-body-text').css('visibility', 'visible');
  });


// hero section animations on site landing
  setTimeout(function(){
    $('#cover-image').addClass('active');
  }, 500);

  $('#cover-image').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {
      $('.title-eng-text').addClass('active');
      $('.title-chi-text').addClass('active');
      $('.title-white-box-text').addClass('active');
      $('.transparent-button').addClass('active');
      $('.hero-footer').addClass('active');
      $('#hero-wheel').addClass('active');
      $('.register-link-text').addClass('active');
      $('.hero-logo').css('visibility', 'visible');
      $('#nav-menu').css('visibility', 'visible');
    }
  );
//
//   // TODO: Mute / unmute audio
//   $('#sound').on('click', function(){
//     if ($(this).hasClass('sound-off')){
//       $(this).addClass('sound-on').removeClass('sound-off');
//       console.log("Change to sound-on");
//     } else {
//       $(this).addClass('sound-off').removeClass('sound-on');
//       console.log("Change to sound-off");
//     }
//   });
//
  // portfolio
  var arrow_left = $('#portfolio-section .arrow-left');
  var arrow_right = $('#portfolio-section .arrow-right');
  var container = $('.portfolio-image-container');
  var step = 1 / 3 * $(window).width();

  arrow_left.click($.throttle(600, function(){
    portfolioSlider.goToPrevSlide();
  }));

  arrow_right.click($.throttle(600, function(){
    portfolioSlider.goToNextSlide();
  }));

  $(window).scroll($.throttle(250, function() {
    var winTop = $(window).scrollTop();
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    var scrollTrigger = 0.95;

    var scrolled = winTop / (docHeight - winHeight);
    $('#left-scroll .bar').css('top', (winHeight * 0.8) * scrolled);

    //register
    var registerTop = $('#register-section').offset().top;
    var registerBottom = $('#register-section').offset().top + $('#register-section').innerHeight();

    if (winTop + winHeight > registerBottom) {
      $('#register-section').addClass('active');
      $('#companyinfo-section').addClass('active');
    } else {
      $('#register-section').removeClass('active');
      $('#companyinfo-section').removeClass('active');
    }

    animateClubHouseSection(winTop, winTop + winHeight);
    animateDesignerSection(winTop, winTop + winHeight);
    animatePortfolioSection(winTop, winTop + winHeight);
    animateMapSection(winTop, winTop + winHeight);
    animatePanoramaSection(winTop, winTop + winHeight);
  }));

  $(window).on('resize', function() {
    portfolioSlider.reloadSlider();
  });

  function animateClubHouseSection(scrollTop, scrollBottom) {
    var section = $('#clubhouse-section');
    var sectionTop = section.offset().top;
    var sectionHeight = section.innerHeight();
    var sectionBottom = sectionTop + sectionHeight;

    if (scrollBottom > sectionTop + (sectionHeight * .6)) {
      section.addClass('in-view-half');
    } else {
      section.removeClass('in-view-half');
    }

    if (scrollBottom > sectionTop + (sectionHeight * .8)) {
      section.addClass('in-view-full');
    } else {
      section.removeClass('in-view-full');
    }
  }
  function animateDesignerSection(scrollTop, scrollBottom) {
    var section = $('#designerprofile-section');
    var sectionTop = section.offset().top;
    var sectionHeight = section.innerHeight();
    var sectionBottom = sectionTop + sectionHeight;
    var windWidth = window.innerWidth;
    var firstBreak = windWidth > 720 ? 0.4 : 0.2;
    var secondBreak = windWidth > 720 ? 0.8 : 0.4;
    var thirdBreak = windWidth > 720 ? 1 : 0.6;

    if (scrollBottom > sectionTop + (sectionHeight * firstBreak)) {
      section.addClass('in-view-one');
    } else {
      section.removeClass('in-view-one');
    }

    if (scrollBottom > sectionTop + (sectionHeight * secondBreak)) {
      section.addClass('in-view-two');
    } else {
      section.removeClass('in-view-two');
    }

    if (scrollBottom > sectionTop + (sectionHeight * thirdBreak)) {
      section.addClass('in-view-full');
    } else {
      section.removeClass('in-view-full');
    }
  }
  function animatePortfolioSection(scrollTop, scrollBottom) {
    var section = $('#portfolio-section');
    var sectionTop = section.offset().top;
    var sectionHeight = section.innerHeight();
    var sectionBottom = sectionTop + sectionHeight;

    if (scrollBottom > sectionTop + (sectionHeight * .6)) {
      section.addClass('in-view-half');
    } else {
      section.removeClass('in-view-half');
    }

    if (scrollBottom > sectionTop + (sectionHeight * .8)) {
      section.addClass('in-view-full');
    } else {
      section.removeClass('in-view-full');
    }
  }
  function animateMapSection(scrollTop, scrollBottom) {
    var section = $('#map-section');
    var sectionTop = section.offset().top;
    var sectionHeight = section.innerHeight();
    var sectionBottom = sectionTop + sectionHeight;

    if (scrollBottom > sectionTop + (sectionHeight * .6)) {
      section.addClass('in-view-half');
    } else {
      section.removeClass('in-view-half');
    }

    if (scrollBottom > sectionTop + (sectionHeight * .8)) {
      section.addClass('in-view-full');
    } else {
      section.removeClass('in-view-full');
    }
  }
  function animatePanoramaSection(scrollTop, scrollBottom) {
    var section = $('#panorama-section');
    var sectionTop = section.offset().top;
    var sectionHeight = section.innerHeight();
    if (scrollBottom > sectionTop + (sectionHeight * .3)) {
      section.addClass('in-view');
    } else {
      section.removeClass('in-view');
    }
  }

  var CLUBHOUSE_DATA = $('#clubhouse-section').data('categories');

  var slideCloubHouseSection = $.throttle(1100, (function() {
    var section = '#clubhouse-section';
    var categoryIndex = 0;
    var nextCategoryIndex = 1;
    var imageIndex = 0;

    var updateIndex = function(isNext, nextSection) {
      console.log(nextSection);
      if (!nextSection) {
        if (isNext) {
          imageIndex++;
          if (imageIndex >= CLUBHOUSE_DATA[categoryIndex].images.length) {
            categoryIndex++;

            imageIndex = 0;
            if (categoryIndex >= CLUBHOUSE_DATA.length) {
              categoryIndex = 0;
            }
          }
        } else {
          imageIndex--;
          if (imageIndex < 0) {
            categoryIndex--;
            if (categoryIndex < 0) {
              categoryIndex = CLUBHOUSE_DATA.length - 1;
            }
            imageIndex = CLUBHOUSE_DATA[categoryIndex].images.length - 1;
          }
        }
      } else {
        categoryIndex++;
        imageIndex = 0;
        if (categoryIndex >= CLUBHOUSE_DATA.length) {
          categoryIndex = 0;
        }
      }

      nextCategoryIndex = categoryIndex + 1;
      if (nextCategoryIndex >= CLUBHOUSE_DATA.length) {
        nextCategoryIndex = 0;
      }
    }

    return function(e, isNext, nextSection) {
      updateIndex(isNext, nextSection);
      var imageUrl = CLUBHOUSE_DATA[categoryIndex].images[imageIndex];
      var title = CLUBHOUSE_DATA[categoryIndex].title;
      var desc = CLUBHOUSE_DATA[categoryIndex].desc;

      $('.link-text, .link-text-overlay').text('The '+ CLUBHOUSE_DATA[nextCategoryIndex].title + ' >');

      if (imageIndex === 0) {
        $(section).removeClass('full-screen');
        $('.clubhouse-blue-box .club-description-text').html(desc);
        $('.clubhouse-blue-box .club-title-text').html(title);
        $('.clubhouse-image-container').css('background-image', 'url(' + imageUrl + ')');

        return;
      }

      $(section).addClass('full-screen');
      $('.full-section-view').css(
        'background-image',
        'url(' + imageUrl + ')'
      );
    };
  })());

  // On click, change section title, text, image and link
  $('.link-text, .link-text-overlay').on('click', function(e) {
    slideCloubHouseSection.apply(this, [e, false, true]);
  });

  // DESIGNER SECTION

  $('#designerprofile-section').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {
      if ($('#designerprofile-section').hasClass('in-view')) {
        setTimeout(function(){
          $('.description-grey-box').addClass('active');
        },600);
        setTimeout(function(){
          $('.profile-blue-box').addClass('active');
        },1200);
        setTimeout(function(){
          $('.white-line').addClass('active');
        },1800);
        setTimeout(function(){
          $('.animation-text').addClass('active');
        },2400);
      } else {
          $('#designerprofile-section .description-grey-box').removeClass('active');
          $('#designerprofile-section .profile-blue-box').removeClass('active');
          $('#designerprofile-section .white-line').removeClass('active');
          $('#designerprofile-section .animation-text').removeClass('active');
      }
    }
  );

  var DESIGNER_DATA = $('#designerprofile-section').data('categories');

  var slideDesignerSection = $.throttle(1100, (function() {
    var section = '#designerprofile-section';
    var categoryIndex = 0;
    var nextCategoryIndex = 1;

    var updateIndex = function(isNext) {
      if (isNext) {
        categoryIndex++;

        if (categoryIndex >= DESIGNER_DATA.length) {
          categoryIndex = 0;
        }
      } else {
        categoryIndex--;
        if (categoryIndex < 0) {
          categoryIndex = DESIGNER_DATA.length - 1;
        }
      }


      nextCategoryIndex = categoryIndex + 1;
      if (nextCategoryIndex >= DESIGNER_DATA.length) {
        nextCategoryIndex = 0;
      }
    }

    return function(e, isNext) {
      updateIndex(isNext);
      var title = DESIGNER_DATA[categoryIndex].title;
      var desc = DESIGNER_DATA[categoryIndex].desc;
      var id = DESIGNER_DATA[categoryIndex].id;


        $('.designer-description-text').animate({'opacity': 0}, 1000, function () {
          $('.quote').html('<strong>'  + title + '</strong>');
          $('.description').text(desc);
        }).delay(1000).animate({'opacity': 1}, 1500);
        $('.designer-description-text').data('id', id);
    };
  })());

  $('.next-prev-wheelbutton').click(function(e) {
    // e.preventDefault();
    var target = $(this).data('target');
    if (target === 'scrollTop') {
      console.log('hello');
      $('body').animate({ scrollTop: 0 }, 500);
      return;
    }

    var isNext = $(e.target).hasClass('next');

    if (target === '#clubhouse-section') {
      return slideCloubHouseSection.apply(this, [e, isNext]);
    }
    if (target === '#hero-section') {
      return displayVideo.apply(this, [e, isNext]);
    }

    if (target === '#designerprofile-section') {
      return slideDesignerSection.apply(this, [e, isNext])
    }
  });

  $('.back-top-wheelbutton').click(function(e) {
    // e.preventDefault();
    var target = $(this).data('target');
    if (target === 'scrollTop') {
      console.log('hello');
      $('body').animate({ scrollTop: 0 }, 500);
      return;
    }
  });

  // $('.description-grey-box').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
  //   function(e) {
  //     $('.profile-blue-box').addClass('active');
  //   }
  // );
  // $('.profile-blue-box').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
  //   function(e) {
  //     $('.white-line').addClass('active');
  //   }
  // );
  // $('.white-line').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
  //   function(e) {
  //     $('.animation-text').addClass('active');
  //   }
  // );

  // PORTFOLIO SECTION
  // $('#portfolio-section').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
  //   function(e) {
  //     $('.animation-text').addClass('fade');
  //   }
  // );
  $('#portfolio-section').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {
      if ($('#portfolio-section').hasClass('in-view')) {
        setTimeout(function(){
          $('#portfolio-section .hero-fade').addClass('active');
          $('.arrow-left').addClass('active');
          $('.arrow-right').addClass('active');
        }, 600);
      } else {
          $('#portfolio-section .hero-fade').removeClass('active');
          $('.arrow-left').removeClass('active');
          $('.arrow-right').removeClass('active');
      }
    }
  );

  var nOfSlides = window.innerWidth > 720 ? 3 : 2;
  var portfolioSlider = $('#portfolio-section .portfolio-image-container').bxSlider({
    slideWidth: window.innerWidth / nOfSlides,
    pager: false,
    minSlides: nOfSlides,
    maxSlides: nOfSlides,
    moveSlides: 1,
    controls: false,
  });

  // PANORAMA SECTION
  $('#panorama-section').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {
      if ($('#panorama-section').hasClass('in-view')) {
        setTimeout(function(){
          $('.first-animation').addClass('active');
        }, 400);
        setTimeout(function(){
          $('.second-animation').addClass('active');
        }, 1000);
      } else {
        $('.first-animation').removeClass('active');
        $('.second-animation').removeClass('active');
      }
    }
  );

  var panorama;
  $('.panorama-content .button-group .button').click(function(e) {
    var target = $(this).data('target');
    $('#panorama-section').removeClass('active day magic night');
    $('#panorama-section').addClass('active ' + target);
    panorama ? panorama.trigger('destroy') : null;
    panorama = $('.panorama-image-container')
    .html(renderPanoramaImageContainer(target))
    .paver({ gracefulFailure: false });
  });

  var source = '<img src="{{photoPath}}" alt="" title="" />';
  var template = Handlebars.compile(source);
  function renderPanoramaImageContainer(path) {
    var data = { photoPath: 'images/panorama-section/pano_' + path + '.jpg' };
    return template(data);
  }

  $window.trigger('scroll');

  $('.video-link-text').click(function(e){
    $('.profile-blue-box').css('display', 'none');
    $('.designer-description-text').css('display', 'none');
    $('#designerprofile-section .video-container video').css('display', 'block');
  });

});
