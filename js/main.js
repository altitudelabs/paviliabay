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

  // TODO: Mute / unmute video
  $('#sound').on('click', function(){
    if ($(this).hasClass('sound-off')){
      $(this).addClass('sound-on').removeClass('sound-off');
      console.log("Change to sound-on");
    } else {
      $(this).addClass('sound-off').removeClass('sound-on');
      console.log("Change to sound-off");
    }
  });

  $('.panorama-image-container').paver({
    gracefulFailure: false,
  });

  $(window).scroll(function(){
    var winTop = $(window).scrollTop();
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    var scrollTrigger = 0.95;

    var scrolled = winTop / (docHeight - winHeight);
    $('#left-scroll .bar').css('top', (winHeight * 0.8) * scrolled);

    if  ((winTop/(docHeight-winHeight)) > scrollTrigger) {
      $('#register-section .section-container').addClass('active');
    }
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
      console.log('clicked next of ' + target);
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
