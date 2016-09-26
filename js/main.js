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
      offset: [-120 , -60]
    })
    .setLngLat([114.113393, 22.365400])
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
          (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view');
        $element.find('.animation-text').removeClass('fade');
        $element.find('.text-order-1').removeClass('fade');
        $element.find('.text-order-2').removeClass('fade');
        $element.find('.text-order-3').removeClass('fade');
        $element.find('.text-order-4').removeClass('fade');
      }
    });
  }

  $window.on('scroll resize', check_if_in_view);
  $window.trigger('scroll');

  $('#nav-menu-content').hide();
  /* * * * * * * * * * * * * * *
   * Toggle nav menu content
   * * * * * * * * * * * * * * */
  $('#nav-menu-image').on("click", function() {
    $('#nav-menu-content').toggle();
  });

  $('#nav-cross').on("click", function(){
    $('#nav-menu-content').toggle();
    $('#nav-menu-content li').children('ul').css('display', 'none');
  });

  /* * * * * * * * * * * * * * *
   * Bind hover so that it's touch friendly
   *  on mobile device
   * * * * * * * * * * * * * * */
  // $('.hover').bind('touchstart touchend', function(e) {
  //   e.preventDefault;
  //   $(this).toggleClass('hover_effect');
  // });

  $('#nav-menu-content li a').on('click', function(){
    if ($(this).parent().children('ul').css('display') == 'block') {
      $(this).parent().children('ul').css('display', 'none');
    }
    else {
      $(this).parent().children('ul').css('display', 'block');
    }
  });


  /* * * * * * * * * * * * * * *
  * Video
  * * * * * * * * * * * * * * */
  // 
  // var video = $('video');
  //
  // $('#hero-section .wheelbutton-container').on("click", function() {
  //   console.log("hero-wheelbutton clicked");
  //   video.css('display', 'block');
  //   video.get(0).play();
  //   $('#cover-image').css('display', 'none');
  //   $('#hero-section .title-container').addClass('one-fifth-opacity');
  //   $(this).css('visibility', 'hidden');
  //
  //   $('.hero-logo').css('visibility', 'hidden');
  //   $('#nav-menu').css('visibility', 'hidden');
  // });
  //
  // video.on('ended', function(){
  //   $('video').css('display', 'none');
  //   $('#cover-image').css('display', 'block');
  //   $('#hero-body-text').css('visibility', 'visible');
  //   $('#hero-section .title-container').css('visibility', 'hidden');
  //   $('.hero-logo').css('visibility', 'visible');
  //   $('#nav-menu').css('visibility', 'visible');
  //   $('#hero-section .wheelbutton-container').css('visibility', 'visible');
  // });

  $('#hero-section .wheelbutton-container').on("click", function() {
    $('#hero-body-text').css('visibility', 'visible');
    $('#hero-section .title-container').css('visibility', 'hidden');
    $('.hero-logo').css('visibility', 'visible');
    $('#nav-menu').css('visibility', 'visible');
    $('#hero-section .wheelbutton-container').css('visibility', 'visible');
  });

  // TODO: Mute / unmute audio
  $('#sound').on('click', function(){
    if ($(this).hasClass('sound-off')){
      $(this).addClass('sound-on').removeClass('sound-off');
      console.log("Change to sound-on");
    } else {
      $(this).addClass('sound-off').removeClass('sound-on');
      console.log("Change to sound-off");
    }
  });

  // portfolio
  var arrow_left = $('#portfolio-section .arrow-left');
  var arrow_right = $('#portfolio-section .arrow-right');
  var container = $('.portfolio-image-container');
  var step = 1 / 3 * $(window).width();

  arrow_left.click(function(){
    container.animate({
      scrollLeft: '-=' + step
    }, 'slow');
  });

  arrow_right.click(function(){
    console.log(step);
    container.animate({
      scrollLeft: '+=' + step
    }, 'slow');
  });

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
  });

  // CLUBHOUSE SECTION
  var clubhouseText = ['Blue Pavilion - Hong Kong\'s first residential clubhouse ',
    'embodied with distinctive superyacht features. The pioneering Blue Pavilia is designed ',
    'by the international renowned superyacht designer Philippe Briand. ',
    'It features a swimming pool, a kids pool, three jacuzzis, three saunas, ',
    'a Multi- Intelligence Playscape, a gym, a Billiard room and two function rooms.'].join('');
  var facadeText = ['Inspired by the optimal proportion of hull and superstructure of superyacht ',
    'the two buildings are embodied with curtain walls and constructed with sleek and clean outlines. ',
    'The distinctive design idea of the buidling\'s roof comes from the mainsail of a sailing yacht ',
    'during its wind propulsion, creating a prominent figure among the others.'].join('');
  var interiorText = ['THE PAVILIA BAY comprises 983 units of residences and features a range ',
    'of layouts to suit residents\' needs, varying from studio to 4-bedroom units. Exquisite residences ',
    'range in saleable area from 306 sq. ft. to 1,366 sq. ft.. The bathrooms and kitchens are well-equipped ',
    'with a selection of international renowned appliances to provide the bespoke settings with ',
    'contempporary design '].join('');
  var clubhouseImages = ['./images/clubhouse-section/2_club2.jpg',
    './images/clubhouse-section/3_club3.jpg','./images/clubhouse-section/4_club4.jpg','./images/clubhouse-section/5_club5.jpg'];
  var facadeImages = ['./images/clubhouse-section/7_facade2.jpg'];
  var interiorImages = ['./images/clubhouse-section/9_interior2.jpg',
    './images/clubhouse-section/10_interior3.jpg','./images/clubhouse-section/11_interior4.jpg','./images/clubhouse-section/12_interior5.jpg'];
  var currentImage = 0;

  $('.clubhouse-blue-box').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {
      $('.animation-text').addClass('fade');
      $('.clubhouse-image-container').addClass('fade');
    }
  );

  var changeClubhouseContent = function (currentSection) {

    if (currentSection == 'clubhouse') {
      $('.club-title-text').html('the <br> facade');
      $('.club-description-text').text(facadeText);
      $('.clubhouse-image-container').css('background-image', 'url(images/clubhouse-section/6_facade1.jpg)');
      $('.link-text').text('The Interior >');
      $('#clubhouse-section').data('id', 'facade')
    } else if (currentSection == 'facade') {
      $('.club-title-text').html('the <br> interior');
      $('.club-description-text').text(interiorText);
      $('.clubhouse-image-container').css('background-image', 'url(images/clubhouse-section/8_interior1.jpg)');
      $('.link-text').text('The Clubhouse >');
      $('#clubhouse-section').data('id', 'interior')
    } else {
      $('.club-title-text').html('the <br> clubhouse');
      $('.club-description-text').text(clubhouseText);
      $('.clubhouse-image-container').css('background-image', 'url(images/clubhouse-section/club1.jpg)');
      $('.link-text').text('The Facade >');
      $('#clubhouse-section').data('id', 'clubhouse')
    }
  }

  // On click, change section title, text, image and link
  $('.link-text, .link-text-overlay').on('click', function() {
    currentImage = 0;
    $animation_elements.removeClass('in-view');
    $('#clubhouse-section').find('.animation-element').removeClass('fade');
    $('.full-section-view').removeClass('fade-in-view');
    setTimeout(function() {
      changeClubhouseContent($('#clubhouse-section').data('id'));
        $window.trigger('scroll');
    }, 700);
  });

  $('.next-prev-wheelbutton').click(function(e) {
    var target = $(this).data('target');
    if (target === 'scrollTop') {
      console.log('hello');
      $('body').animate({ scrollTop: 0 }, 500);
      return;
    }
    
    var isNext = $(e.target).hasClass('next');
    if (isNext) {
      if (target == '#clubhouse-section') {
        $('#clubWheel').animate({right: 80, bottom: 120}, 1000).css('left', 'auto');
        var currentCategory = $('#clubhouse-section').data('id');

        if (currentCategory == 'clubhouse') {
          imageArray = clubhouseImages;
        } else if (currentCategory == 'facade') {
          imageArray = facadeImages;
        } else {
          imageArray = interiorImages;
        }
        if (currentImage == imageArray.length) {
          $('.full-section-view').removeClass('fade-in-view');
          $('.link-text-overlay').click();
          currentImage = 0;
          return;
        }
        if (!$('.full-section-view').hasClass('fade-in-view')) {
          $('.full-section-view').css('background-image','url('+imageArray[currentImage]+')');
          $('.full-section-view').addClass('fade-in-view');
          currentImage = currentImage + 1;
        } else {
          $('.full-section-view').css('background-image','url('+imageArray[currentImage]+')');
          currentImage = currentImage +1;
        }
      }
      if (target == '#designerprofile-section') {
        var currentText = $('.designer-description-text').data('id');
        if (currentText == 'default') {
          $('.designer-description-text').animate({'opacity': 0}, 1000, function () {
            $('.description').text(passionText)
            $('.quote').html('<strong>His Passion</strong>');
          }).delay(1000).animate({'opacity': 1}, 1500);
          $('.designer-description-text').data('id','passion');
        } else if (currentText == 'passion') {
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
    // if (target == '#clubhouse-section') {
    //   if ($('.full-section-view').hasClass('fade-in-view')) {
    //     if (currentImage == 0) {
    //       $('.full-section-view').removeClass('fade-in-view');
    //       return;
    //     }
    //     currentImage = currentImage - 1;
    //     $('.full-section-view').css('background-image','url('+imageArray[currentImage]+')');
    //   } 
    // };
    if (target == '#designerprofile-section') {
      var currentText = $('.designer-description-text').data('id');
      if (currentText == 'default') {
        $('.designer-description-text').animate({'opacity': 0}, 1000, function () {
          $('.quote').html('<strong>His Design</strong>');
          $('.description').text(designText);
        }).delay(1000).animate({'opacity': 1}, 1500);
        $('.designer-description-text').data('id','design');
      } else if (currentText == 'passion') {
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

  // DESIGNER SECTION
  var defaultText = ['Led by the globally acclaimed French super yacht designer Philippe Briand, London based Vitruvius Yachts Limited is a strong team of award-winning designers and naval architects. The beauty of each Vitruvius Yacht is derived from her optimal proportions, balance and efficiency. Philippe believes the superyacht flourished from the exclusive combination of science, through naval architecture, and art.'];
  var passionText = ['Philippe  was  raised  in  a  family  where  racing  is  a  long-established  tradition. Inspired by his father, an Olympian sailor, he began his career in France as a dinghy sailor at the tender age of 9. Philippe’s first sailing yacht was designed when  he  was  only 16 years  old.  By  the  age  of  22,  his  first  series  of  yacht  was developed.  During  the  1980s,  he  engaged  in  yacht  racing  and  claimed the title of world championships twice. His enthusiasm in racing has equipped him to become a qualified naval architect and one of the world’s leading yacht designers.'];
  var designText = ['Philippe  specializes  in  designing  super  yachts  ranging  from  30  meters  to  105 meters,  both  Sailing  and  Motor  yachts.  His  yacht  is  characterized by  quality design and attention to details with features such as teak flooring, tinted glass, carbon  fiber  and  underwater  lights.  With  over  12,000  boats  built  to  date, Philippe’s  experience  in  naval  architecture  and  his  reputation  in  the  field make him the ideal candidate to design and engineer the perfect yacht.'];
  
  $('.profile-blue-box').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {
      $('.animation-text').addClass('fade');
    }
  );

  // PORTFOLIO SECTION
  $('#portfolio-section').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {
      $('.animation-text').addClass('fade');
    }
  );

  // PANORAMA SECTION
  $('#panorama-section').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {
      $('.first-animation').addClass('fade-button');
    }
  );
  $('.first-animation').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {
      $('.second-animation').addClass('fade-button');
    }
  );
  $('.second-animation').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {
      $('.third-animation').addClass('fade-button');
    }
  );
  $('.third-animation').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {
      $('.fourth-animation').addClass('fade-button');
    }
  );

  // PORTFOLIO SECTION
  $('.map-info').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {
      $('.animation-text').addClass('fade');
    }
  );

  // var panorama = $('.panorama-image-container')
  // .html(renderPanoramaImageContainer(''))
  // .paver({ gracefulFailure: false });
  var panorama;
  $('.panorama-content .button-group .button').click(function(e) {
    var target = $(this).data('target');
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

