$(document).ready(function(){

  var $animation_elements = $('.animation-element');
  var $window = $(window);

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

    new mapboxgl.Marker($('#marker')[0], {
      offset: [-75, -60]
    })
    .setLngLat([114.112723, 22.365542])
    .addTo(map)
  };
  initMap();

  // check if element is in view and then apply animation
  function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
          (element_top_position + 300 <= window_bottom_position)) {
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view');
        // $element.find('.animation-text').removeClass('fade');
        // $element.find('.text-order-1').removeClass('fade');
        // $element.find('.text-order-2').removeClass('fade');
        // $element.find('.text-order-3').removeClass('fade');
        // $element.find('.text-order-4').removeClass('fade');
      }
    });
  }

  $window.on('scroll resize', check_if_in_view);
  $window.trigger('scroll');

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

  $('#hero-section .wheelbutton-container').on("click", function() {
    console.log("hero-wheelbutton clicked");
    video.css('display', 'block');
    video.get(0).play();
    $('#cover-image').css('display', 'none');
    $('#hero-section .title-container').css('display', 'none');
  });

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
    // container.animate({
    //   scrollLeft: '-=' + step
    // }, 'slow');
  }));

  arrow_right.click($.throttle(600, function(){
    portfolioSlider.goToNextSlide();
    // container.animate({
    //   scrollLeft: '+=' + step
    // }, 'slow');
  }));

  $(window).scroll(function(){
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

  });
  $(window).on('resize', function() {
    portfolioSlider.reloadSlider();
  });
  // CLUBHOUSE SECTION
  // TODO delete the comment after confirming section animation
  // $('.white-line').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
  //   function(e) {
  //     $('.animation-text').addClass('fade');
  //     // $('.clubhouse-image-container').addClass('fade');
  //     $('#clubWheel').addClass('fade');
  //     $('.link-menu').addClass('activate');
  //   }
  // );
  // $('#clubhouse-section').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
  //   function(e) {
  //     if ($('#clubhouse-section').hasClass('in-view')) {
  //       setTimeout(function(){
  //         $('.clubhouse-image-container').addClass('active');
  //       },600);
  //       setTimeout(function(){
  //         $('.clubhouse-blue-box').addClass('active');
  //       },1200);
  //       setTimeout(function(){
  //         $('#clubhouse-section .white-line').addClass('active');
  //       },1800);
  //       setTimeout(function(){
  //         $('.animation-text').addClass('active');
  //       },2400);
  //     } else {
  //         $('#clubhouse-section .clubhouse-image-container').removeClass('active');
  //         $('#clubhouse-section .clubhouse-blue-box').removeClass('active');
  //         $('#clubhouse-section .white-line').removeClass('active');
  //         $('#clubhouse-section .animation-text').removeClass('active');
  //     }
  //   }
  // );
  function animateClubHouseSection(scrollTop, scrollBottom) {
    var section = $('#clubhouse-section');
    var sectionTop = section.offset().top;
    var sectionHeight = section.innerHeight();
    var sectionBottom = sectionTop + sectionHeight;

    if (scrollBottom > sectionTop + (sectionHeight * .4)) {
      section.addClass('in-view-half');
    } else {
      section.removeClass('in-view-half');
    }

    if (scrollBottom > sectionTop + (sectionHeight * .7)) {
      section.addClass('in-view-full');
    } else {
      section.removeClass('in-view-full');
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

    if (isNext) {
      if (target === '#designerprofile-section') {
        var currentText = $('.designer-description-text').data('id');
        if (currentText === 'default') {
          $('.designer-description-text').animate({'opacity': 0}, 1000, function () {
            $('.description').text(passionText)
            $('.quote').html('<strong>His Passion</strong>');
          }).delay(1000).animate({'opacity': 1}, 1500);
          $('.designer-description-text').data('id','passion');
        } else if (currentText === 'passion') {
          $('.designer-description-text').animate({'opacity': 0}, 1000, function () {
            $('.quote').html('<strong>His Design</strong>');
            $('.description').text(designText);
          }).delay(1000).animate({'opacity': 1}, 1500);
          $('.designer-description-text').data('id','design');
        } else {
          $('.designer-description-text').animate({'opacity': 0}, 1000, function () {
            $('.quote').html('<em>"A yacht is to always please the eye and be the pride of her owner."</em>');
            $('.description').text(defaultText);
          }).delay(1000).animate({'opacity': 1}, 1500);
          $('.designer-description-text').data('id','default');
        }
      };
      return;
    } // if is previous

    // if (target === '#clubhouse-section') {
    //   if ($('.full-section-view').hasClass('fade-in-view')) {
    //     if (currentImage === 0) {
    //       $('.full-section-view').removeClass('fade-in-view');
    //       return;
    //     }
    //     currentImage = currentImage - 1;
    //     $('.full-section-view').css('background-image','url('+imageArray[currentImage]+')');
    //   }
    // };
    if (target === '#designerprofile-section') {
      var currentText = $('.designer-description-text').data('id');
      if (currentText === 'default') {
        $('.designer-description-text').animate({'opacity': 0}, 1000, function () {
          $('.quote').html('<strong>His Design</strong>');
          $('.description').text(designText);
        }).delay(1000).animate({'opacity': 1}, 1500);
        $('.designer-description-text').data('id','design');
      } else if (currentText === 'passion') {
        $('.designer-description-text').animate({'opacity': 0}, 1000, function () {
          $('.quote').html('<em>"A yacht is to always please the eye and be the pride of her owner."</em>');
          $('.description').text(defaultText);
        }).delay(1000).animate({'opacity': 1}, 1500);
        $('.designer-description-text').data('id','default');
      } else {
        $('.designer-description-text').animate({'opacity': 0}, 1000, function () {
          $('.quote').html('<strong>His Passion</strong>');
          $('.description').text(passionText);
        }).delay(1000).animate({'opacity': 1}, 1500);
        $('.designer-description-text').data('id','passion');
      }
    };
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

  // DESIGNER SECTION
  var defaultText = ['Led by the globally acclaimed French super yacht designer Philippe Briand, London based Vitruvius Yachts Limited is a strong team of award-winning designers and naval architects. The beauty of each Vitruvius Yacht is derived from her optimal proportions, balance and efficiency. Philippe believes the superyacht flourished from the exclusive combination of science, through naval architecture, and art.'];
  var passionText = ['Philippe  was  raised  in  a  family  where  racing  is  a  long-established  tradition. Inspired by his father, an Olympian sailor, he began his career in France as a dinghy sailor at the tender age of 9. Philippe’s first sailing yacht was designed when  he  was  only 16 years  old.  By  the  age  of  22,  his  first  series  of  yacht  was developed.  During  the  1980s,  he  engaged  in  yacht  racing  and  claimed the title of world championships twice. His enthusiasm in racing has equipped him to become a qualified naval architect and one of the world’s leading yacht designers.'];
  var designText = ['Philippe  specializes  in  designing  super  yachts  ranging  from  30  meters  to  105 meters,  both  Sailing  and  Motor  yachts.  His  yacht  is  characterized by  quality design and attention to details with features such as teak flooring, tinted glass, carbon  fiber  and  underwater  lights.  With  over  12,000  boats  built  to  date, Philippe’s  experience  in  naval  architecture  and  his  reputation  in  the  field make him the ideal candidate to design and engineer the perfect yacht.'];

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
//
//   // $('.description-grey-box').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
//   //   function(e) {
//   //     $('.profile-blue-box').addClass('active');
//   //   }
//   // );
//   // $('.profile-blue-box').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
//   //   function(e) {
//   //     $('.white-line').addClass('active');
//   //   }
//   // );
//   // $('.white-line').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
//   //   function(e) {
//   //     $('.animation-text').addClass('active');
//   //   }
//   // );
//
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
        }, 600);
        setTimeout(function(){
          $('.second-animation').addClass('active');
        }, 1200);
        setTimeout(function(){
          $('.third-animation').addClass('active');
        }, 1800);
        setTimeout(function(){
          $('.fourth-animation').addClass('active');
        }, 2400);
      } else {
        $('.first-animation').removeClass('active');
        $('.second-animation').removeClass('active');
        $('.third-animation').removeClass('active');
        $('.fourth-animation').removeClass('active');
      }
    }
  );

  // MAP SECTION
  // $('.map-info').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
  //   function(e) {
  //     $('.animation-text').addClass('fade');
  //   }
  // );
  $('#map-section').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {
      if ($('#map-section').hasClass('in-view')) {
        setTimeout(function(){
          $('#map').addClass('active');
          $('.map-info').addClass('active');
        },600);
        setTimeout(function(){
          $('.white-line').addClass('active');
        },1200);
        setTimeout(function(){
          $('.animation-text').addClass('active');
        },1800);
      } else {
          $('#map').removeClass('active');
          $('#map-section .map-info').removeClass('active');
          $('#map-section .white-line').removeClass('active');
          $('#map-section .animation-text').removeClass('active');
      }
    }
  );

  // var panorama = $('.panorama-image-container')
  // .html(renderPanoramaImageContainer(''))
  // .paver({ gracefulFailure: false });
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
});
