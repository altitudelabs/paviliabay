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
     console.log('scroll bottom');
    }
  });


  $('.next-prev-wheelbutton').click(function(e) {
    var isNext = $(e.target).hasClass('next');
    var target = $(this).data('target');
    if (isNext) {
      console.log('clicked next of ' + target);
      return;
    }
    console.log('clicked prev of ' + target);
  });


  var topofDiv = $("#register-section").offset().top;
  var height = $("#register-section").outerHeight();
  $(window).scroll(function(e) {
    if ($(window).scrollTop() > (topofDiv + height)) {
      return $("#register-section").addClass('drop');
    }
    $("#register-section").removeClass('drop');
  });
});
