$(document).ready(function(){

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

var clubhouseImages = ['./images/clubhouse-section/2_club2.jpg',
  './images/clubhouse-section/3_club3.jpg','./images/clubhouse-section/4_club4.jpg','./images/clubhouse-section/5_club5.jpg'];
var facadeImages = ['./images/clubhouse-section/6_facade1.jpg','./images/clubhouse-section/7_facade2.jpg'];
var interiorImages = ['./images/clubhouse-section/8_interior1.jpg', './images/clubhouse-section/9_interior2.jpg',
  './images/clubhouse-section/10_interior3.jpg','./images/clubhouse-section/11_interior4.jpg','./images/clubhouse-section/12_interior5.jpg'];
var currentImage = 0;


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
        $('#clubWheel').animate({right: 75, bottom: 140}, 1000);
        var currentCategory = $('#clubhouse-section').data('id');

        if (currentCategory == 'clubhouse') {
          imageArray = clubhouseImages;
        } else if (currentCategory == 'facade') {
          imageArray = facadeImages;
        } else {
          imageArray = interiorImages;
        }
        if (currentImage == imageArray.length) {
          $('#clubWheel').animate({left: 75, bottom: 140}, 1000);
          $('.full-section-view').removeClass('fade-in-view');
          $('.link-text').click();
          currentImage = 0;
          return;
        }
        if (!$('#clubhouse-section').hasClass('fade-in-view')) {
          $('.full-section-view').css('background-image','url('+imageArray[currentImage]+')');
          $('.full-section-view').addClass('fade-in-view');
          currentImage = currentImage + 1;
        } else {
          $('.full-section-view').css('background-image','url('+imageArray[currentImage]+')');
          currentImage = currentImage +1;
        }
      }



      return;
    }
    console.log('clicked prev of ' + target);
  });

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
});

var source = '<img src="{{photoPath}}" alt="" title="" />';
var template = Handlebars.compile(source);
function renderPanoramaImageContainer(path) {
  var data = { photoPath: 'images/panorama-section/pano_' + path + '.jpg' };
  return template(data);
}
